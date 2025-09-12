const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const routeAPI = require("./routes/auth")
const routeSubject = require("./routes/subjectRoute")
const routeGrade = require("./routes/gradeRoute")
const routeSemester = require("./routes/semesterRoute")
const { Server } = require('socket.io')
const http = require("http")

// FOR GG LOGIN
const passport = require('passport')
const session = require('express-session')
const authRoute = require('./routes/authRoute')
const routerOtp = require("./routes/optRoute")
const routePayment = require("./routes/sepayRoute")
const { initSocket } = require("./socket")
// END GG LOGIN

// Load environment variables
dotenv.config()

const app = express()
const server = http.createServer(app)

initSocket(server)

// FOR GG LOGIN
app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
// END
mongoose.connect('mongodb://localhost:27017/')
  .then(() => {
    console.log('CONNECTED TO DB')
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err)
  })

app.use(cors({
  origin: process.env.FE_URL,  // ví dụ: "http://localhost:3000"
  credentials: true            // <— rất quan trọng
}))
app.use(cookieParser())
app.use(express.json())


// ------------------------------------------------------------------------------
// Route callback nhận webhook từ SePay
app.use("/api/payment", routePayment);
// -------------------------------------------------------------------------------


app.use('/', routeAPI)
app.use('/subject', routeSubject)
app.use('/grade', routeGrade)
app.use('/semester', routeSemester)
app.use('/auth', authRoute)
app.use('/otp', routerOtp)


server.listen(8000, () => {
  console.log("Server is running")
})
