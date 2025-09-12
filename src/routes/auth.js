const authController = require('../controllers/authController')
const express = require('express')
const userController = require('../controllers/userController')
const middlewareController = require('../middlewares/middlewareController')
const routeAPI = express.Router()

// Authentication
routeAPI.post('/auth', authController.registerUser)
routeAPI.post('/auth/login', authController.loginUser)
routeAPI.post('/auth/logout', authController.logoutUser)

//get INFO of User
routeAPI.get('/user', middlewareController.verifyToken, userController.getInfoUser)
routeAPI.put('/user', middlewareController.verifyToken, userController.putInfoUser)

// reset password
routeAPI.put('/reset-password', middlewareController.verifyToken, userController.putResetPasswordUser)

// PUT subscribe
routeAPI.put('/user/subscribe', middlewareController.verifyToken, userController.postSubscribe)

// Get all user for admin
routeAPI.get('/users', middlewareController.verifyToken, userController.getAllUser)

module.exports = routeAPI