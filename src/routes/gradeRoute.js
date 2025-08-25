const express = require('express')
const middlewareController = require('../middlewares/middlewareController')
const gradeController = require('../controllers/gradeController')
const routeGrade = express.Router()

const check_token = middlewareController.verifyToken
const check_expired = middlewareController.checkAccountExpiration

routeGrade.post('/',check_token, check_expired, gradeController.crateGradeController)
routeGrade.put('/',check_token, check_expired, gradeController.updateGradeController)
routeGrade.get('/', check_token, gradeController.getAllGradeController)


module.exports = routeGrade