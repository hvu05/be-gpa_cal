const Semester = require('../models/semesterModel')
const Grade = require('../models/gradeModel')

const createSemesterService = async (semesterName, user_id) => {
    try {
        const sem = await Semester.create({semesterName, userId: user_id})
        return sem
    } catch (e) {
        console.log('error at create semester', e)
        return null
    }
}

const deleteSemesterService = async (semesterId) => {
    try {
        await Grade.deleteMany({ semesterId: semesterId })
        const sem = await Semester.findByIdAndDelete({_id: semesterId})
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

const getSemestersByUserIdService = async (userId) => {
    try {
        const semesters = await Semester.find({ userId: userId })
        return semesters
    } catch (e) {
        console.log('error at get semesters by user id', e)
        return null
    }
}

module.exports = {
    createSemesterService,
    deleteSemesterService,
    updateSemesterService,
    getSemestersByUserIdService
}