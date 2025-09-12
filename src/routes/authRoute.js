const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')
const router = express.Router()

// Passport config
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GG_CLIENT_ID,
            clientSecret: process.env.GG_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/auth/google/callback` // <—
        },
        async (accessToken, refreshToken, profile, done) => {
            // Tại đây bạn có thể lưu user vào DB
            try {
                // Kiểm tra user đã tồn tại chưa
                let user = await User.findOne({ googleId: profile.id });
                console.log(1.1)

                if (!user) {
                    // Tạo user mới nếu chưa tồn tại
                    user = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                        loginMethod: 'google' // Đánh dấu đăng nhập bằng Google
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    async(req, res) => {
        try {
            // Tạo JWT token
            // console.log('req', req)
            const user = await User.findOne({ email: req.user.email })
            const jwtSecret = process.env.JWT_ACCESS_KEY || 'your-secret-key-here'
            const accessToken = jwt.sign({
                id: req.user.id,
                admin: req.user.admin,
                tokenVersion: user.tokenVersion
            },
                jwtSecret,
                {
                    expiresIn: '30m'
                }
            )
            // Trả về user và token
            const { password, ...userWithoutPassword } = req.user._doc
            
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,      // bật nếu dùng HTTPS
                sameSite: "strict" // chống CSRF
            })
            const redirectUrl = `${process.env.FE_URL}/dashboard`
            // Redirect về FE cùng với token
            res.redirect(redirectUrl)
        } catch (error) {
            res.redirect(`${process.env.FE_URL}/error`)
        }
    }
);

module.exports = router
