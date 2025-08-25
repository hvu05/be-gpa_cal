const express = require('express')
const middlewareController = require('../middlewares/middlewareController')
const semesterController = require('../controllers/semesterController')
const routeSemester = express.Router()

const check_token = middlewareController.verifyToken
const check_expired = middlewareController.checkAccountExpiration

routeSemester.post('/',check_token, check_expired, semesterController.createSemesterController)
routeSemester.put('/:id', check_token, check_expired, semesterController.updateSemesterController)
routeSemester.delete('/:id', check_token, check_expired, semesterController.deleteSemesterController)
// routeSemester.get('/', check_token, gradeController.getAllGradeController)

module.exports = routeSemester