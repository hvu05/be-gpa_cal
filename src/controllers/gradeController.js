const { createGradeService,
    getAllSubjectAndGradeOfUserService,
    updateGradeService,
    deleteGradeService } = require("../services/gradeService")

const gradeController = {
    crateGradeController: async (req, res) => {
        const grade = await createGradeService(req.user.id, req.body)
        if (grade) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: grade
                }
            )
        }
        else {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Create failed'
                }
            )
        }
    },
    getAllGradeController: async (req, res) => {
        const grade = await getAllSubjectAndGradeOfUserService(req.user.id)
        if (grade) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: grade
                }
            )
        }
        else {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Get all grade failed'
                }
            )
        }
    },
    updateGradeController: async (req, res) => {
        const { _id, grade4, grade10 } = req.body
        const grade = await updateGradeService(_id, grade4, grade10)
        if (grade) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: grade
                }
            )
        }
        else {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Get all grade failed'
                }
            )
        }
    },
    deleteGradeController: async (req, res) => {
        const _id = req.params.id
        const grade = await deleteGradeService(_id)
        if (grade) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: grade,
                    message: 'Grade deleted successfully'
                }
            )
        }
        else {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Delete grade failed'
                }
            )
        }
    }
}

module.exports = gradeController