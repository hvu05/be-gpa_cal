// services/otpService.js
const nodemailer = require('nodemailer')
const crypto = require('crypto')

// Dùng biến này để lưu OTP tạm thời (chỉ demo, thực tế nên dùng Redis/DB)
const otpStore = {}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendOTP(email) {
  const otp = generateOTP()
  const expireAt = Date.now() + 5 * 60 * 1000 // 5 phút

  otpStore[email] = { otp, expireAt }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Gmail của bạn
      pass: process.env.EMAIL_PASS  // App password của Gmail
    }
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'GPA APP: MÃ OTP CHO USER',
    html: `
    <p>Kính gửi Quý khách,</p>
    <p>Mã OTP của Quý khách là: <p><b style="color:#d9534f;">${otp}</b></p>
    <p>Mã có hiệu lực trong vòng <b>5 phút</b>. 
    Vui lòng không chia sẻ mã này cho bất kỳ ai để đảm bảo an toàn.</p>
    <p>Trân trọng,<br/>Đội ngũ hỗ trợ GPA app.</p>
  `
  })
}

function verifyOTP(email, otp) {
  const record = otpStore[email]
  if (!record) return false
  if (Date.now() > record.expireAt) return false
  return record.otp === otp
}

module.exports = { sendOTP, verifyOTP }
