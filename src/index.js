const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const routeAPI = require("./routes/auth")
const routeSubject = require("./routes/subjectRoute")
const routeGrade = require("./routes/gradeRoute")
const routeSemester = require("./routes/semesterRoute")

// FOR GG LOGIN
const passport = require('passport')
const session = require('express-session')
const authRoute = require('./routes/authRoute')
const routerOtp = require("./routes/optRoute")
// END GG LOGIN

// Load environment variables
dotenv.config()

const app = express()

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

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/', routeAPI)
app.use('/subject', routeSubject)
app.use('/grade', routeGrade)
app.use('/semester', routeSemester)
app.use('/auth', authRoute)
app.use('/otp', routerOtp)


// //!-----------------------------------------------------------------------------------------------
// app.post('/payment', async(req, res) => {
  
// })
// //!-----------------------------------------------------------------------------------------------


app.listen(8000, () => {
  console.log("Server is running")
})
