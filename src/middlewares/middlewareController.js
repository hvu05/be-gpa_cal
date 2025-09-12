const jwt = require("jsonwebtoken");
const User = require('../models/User')

const middlewareController = {
  //verifyToken
  verifyToken: async (req, res, next) => {
    const token = req.cookies.accessToken
    // console.log('token', token)
    if (!token) {
      return res.status(401).json("You're not authenticated")
    }
    try {
      const jwtSecret = process.env.JWT_ACCESS_KEY || "your-secret-key-here"

      // verify chữ ký + decode
      const decoded = jwt.verify(token, jwtSecret)
      // console.log('decoded', decoded)
      // lấy user trong DB theo id từ token
      const user = await User.findById(decoded.id)
      if (!user) {
        console.log("User not found")
        return res.status(404).json("User not found")
      }

      // so sánh tokenVersion
      if (decoded.tokenVersion !== user.tokenVersion) {
        console.log('Token compare', decoded.tokenVersion, user.tokenVersion)
        return res.status(401).json("Token is no longer valid")
      }

      // nếu hợp lệ => gắn user vào request
      req.user = decoded
      next();
    } catch (err) {
      console.log("Token is not valid")
      return res.status(403).json("Token is not valid")
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

