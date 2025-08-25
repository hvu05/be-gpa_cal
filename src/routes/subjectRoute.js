const express = require('express')
const middlewareController = require('../middlewares/middlewareController')
const subjectController = require('../controllers/subjectController')
const routeSubject = express.Router()

const check_token = middlewareController.verifyToken
const check_expired = middlewareController.checkAccountExpiration

routeSubject.post('/', check_token, check_expired, subjectController.createSubjectController)
routeSubject.delete('/', check_token, check_expired, subjectController.deleteSubjectController)
routeSubject.get('/', check_token, subjectController.getAllSubject)
routeSubject.put('/', check_token, check_expired, subjectController.editSubjectController)

module.exports = routeSubject