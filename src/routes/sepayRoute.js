const express = require('express')
const routePayment = express.Router()
const User = require('./../models/User')
const middlewareController = require('../middlewares/middlewareController')
const { paymentCallback } = require('../controllers/sePayController')

routePayment.post('/callback', paymentCallback)

module.exports = routePayment