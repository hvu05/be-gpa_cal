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
    (req, res) => { res.json({ EC: 0, msg: 'OK', user: req.user }); }
);

module.exports = router
