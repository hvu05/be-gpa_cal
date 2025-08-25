const Semester = require('../models/semesterModel')

const createSemesterService = async (semesterName) => {
    try {
        const sem = await Semester.create({semesterName})
        return sem
    } catch (e) {
        console.log('error at create semester', e)
        return null
    }
}

const deleteSemesterService = async (semesterId) => {
    try {
        const sem = await Semester.findByIdAndDelete(semesterId)
        return sem
    } catch (e) {
        console.log('error at delete semester', e)
        return null
    }
}

const updateSemesterService = async (semesterId, semesterName) => {
    try {
        const sem = await Semester.findByIdAndUpdate(semesterId, {semesterName}, {new: true})
        return sem
    } catch (e) {
        console.log('error at update semester', e)
        return null
    }
}

module.exports = {
    createSemesterService,
    deleteSemesterService,
    updateSemesterService
}