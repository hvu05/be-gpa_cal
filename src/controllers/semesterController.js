const { createSemesterService, deleteSemesterService, updateSemesterService } = require("../services/semesterSevice")

const semesterController = {
    createSemesterController: async (req, res) => {
        const sem = await createSemesterService(req.body.semesterName)
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
    }
}

module.exports = semesterController