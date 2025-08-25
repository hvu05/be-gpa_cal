const express = require('express')
const jwt = require('jsonwebtoken')
const { sendOTP, verifyOTP } = require('../services/otpService')

const routerOtp = express.Router()

// Request OTP
routerOtp.post('/request-otp', async (req, res) => {
  const { email } = req.body
  try {
    await sendOTP(email)
    res.json({ EC: 0, msg: 'OTP đã gửi về email' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ EC: 1, msg: 'Lỗi gửi email', error: err.message })
  }
})

// Verify OTP
routerOtp.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body
  console.log('>>> check email, otp:', email, otp)
  if (verifyOTP(email, otp)) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ EC: 0, msg: 'success', token })
  } else {
    res.status(400).json({ EC: 1, msg: 'OTP sai hoặc đã hết hạn' })
  }
})

module.exports = routerOtp
