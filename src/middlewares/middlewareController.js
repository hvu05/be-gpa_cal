const jwt = require("jsonwebtoken");
const User = require('../models/User')

const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
  checkAccountExpiration: async (req, res, next) => {
    try {
      // Kiểm tra xem có user.id không
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          EC: -1,
          message: 'User not authenticated'
        })
      }

      // Lấy thông tin user từ database
      const user = await User.findById(req.user.id)
      if (!user) {
        return res.status(404).json({
          EC: -1,
          message: 'User not found'
        })
      }

      // Kiểm tra hạn sử dụng
      if (user.expiredAt && user.expiredAt < new Date()) {
        return res.status(403).json({
          EC: -1,
          message: 'Account expired! Please renew your subscription.',
          expiredAt: user.expiredAt
        })
      }

      // Kiểm tra xem có phải tài khoản trả phí không
      if (user.isPurchased && !user.expiredAt) {
        return res.status(403).json({
          EC: -1,
          message: 'Free trial expired! Please purchase a subscription.'
        })
      }

      // Nếu tất cả đều OK, cho phép tiếp tục
      next()

    } catch (error) {
      console.log('Error checking account expiration:', error)
      return res.status(500).json({
        EC: -1,
        message: 'Internal server error'
      })

    }
  }
};

module.exports = middlewareController

