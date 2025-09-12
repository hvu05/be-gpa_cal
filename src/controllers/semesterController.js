const { createSemesterService, 
        deleteSemesterService, 
        updateSemesterService,
        getSemestersByUserIdService
    } = require("../services/semesterSevice")

const semesterController = {
    createSemesterController: async (req, res) => {
        const user_id = req.user.id
        // console.log('id user', user_id)
        const sem = await createSemesterService(req.body.semesterName, user_id)
        if (sem) {
            return res.status(200).json({
                EC: 0,
                data: sem
            })
        }
        else {
            return  res.status(500).json({
                EC: -1,
                message: 'Create a semester FAILED'
            })
        }
    },

    deleteSemesterController: async (req, res) => {
        const sem = await deleteSemesterService(req.params.id)
        if (sem) {
            return res.status(200).json({
                EC: 0,
                data: sem,
                message: 'Delete semester successfully'
            })
        }
        else {
            return res.status(500).json({
                EC: -1,
                message: 'Delete semester FAILED'
            })
        }
    },

    updateSemesterController: async (req, res) => {
        const sem = await updateSemesterService(req.params.id, req.body.semesterName)
        if (sem) {
            return res.status(200).json({
                EC: 0,
                data: sem,
                message: 'Update semester successfully'
            })
        }
        else {
            return res.status(500).json({
                EC: -1,
                message: 'Update semester FAILED'
            })
        }
    },

    getSemestersByUserIdController: async (req, res) => {
        const user_id = req.user.id
        const semesters = await getSemestersByUserIdService(user_id)
        if (semesters) {
            return res.status(200).json({
                EC: 0,
                data: semesters,
                message: 'Get semesters successfully'
            })
        }
        else {
            return res.status(500).json({
                EC: -1,
                message: 'Get semesters FAILED'
            })
        }
    }
}

module.exports = semesterController