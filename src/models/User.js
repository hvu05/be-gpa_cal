const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: function () {
            // Chỉ yêu cầu username nếu không phải Google login
            return this.loginMethod !== 'google';
        },
        minlength: 6,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            // Chỉ yêu cầu password nếu không phải Google login
            return this.loginMethod !== 'google';
        },
        minlength: 6,
    },
    // Thêm các field cho Google login
    googleId: {
        type: String,
        unique: true,
        sparse: true // Cho phép null
    },
    loginMethod: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    admin: {
        type: Boolean,
        default: false,
    },
    expiredAt: {
        type: Date,
        default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 ngày sau
    },
    isPurchased: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

// Export model
const User = mongoose.model("User", userSchema)
module.exports = User