const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require('jsonwebtoken');
const authController = {
    registerUser: async (req, res) => {
        try {
            // Tạo salt và hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            // Tạo user mới
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                loginMethod: "username"
            });

            // Lưu vào DB
            const user = await newUser.save();

            res.status(201).json({ message: "User registered successfully!", user });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Wrong username!");
            }

            // Check expiredAt
            if (user.expiredAt && user.expiredAt < new Date()) {
                return res.status(403).json("Account expired!");
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.status(404).json("Wrong password");
            }

            if (user && validPassword) {
                const jwtSecret = process.env.JWT_ACCESS_KEY || 'your-secret-key-here'
                const accessToken = jwt.sign({
                    id: user.id,
                    admin: user.admin
                },
                    jwtSecret,
                    {
                        expiresIn: '30h'
                    }
                )
                const {password, ...others} = user._doc

                return res.status(200).json({...others, accessToken})
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }

}
module.exports = authController