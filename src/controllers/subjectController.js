const { 
    createSubject,
    deleteSubject, 
    editSubjectservice} = require('../services/subjectService')

const subjectController = {
    createSubjectController: async(req, res) => {
        // console.log('>>req', req.body)
        const {subjectName, credit} = req.body
        const result = await createSubject(subjectName, credit)
        if(result) 
        {
            return res.status(200).json({
                EC: 0,
                data: result
            })
        }
        else return res.status(500).json({
            EC: -1,
            data: null
        })
    },
    deleteSubjectController: async(req, res) => {
        const {_id} = req.body
        const result = await deleteSubject(_id)
        if(result) 
        {
            return res.status(200).json({
                EC: 0,
                message: 'Delete 1 subject success'
            })
        }
        else return res.status(500).json({
            EC: -1,
            message: 'Delete 1 subject failed'
        })
    },
    getAllSubject: async(req, res) => {
        
    },
    editSubjectController: async(req, res) => {
        const {idSubject, subjectName, credit} = req.body
        const result = await editSubjectservice(idSubject, {subjectName, credit})
        if(result) 
        {
            return res.status(200).json({
                EC: 0,
                data: result
            })
        }
        else return res.status(500).json({
            EC: -1,
            message: 'Edit 1 subject failed'
        })
    }
}

module.exports = subjectController