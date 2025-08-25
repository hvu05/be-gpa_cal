const Subject = require('../models/SubjectModel')

const createSubject = async (subjectName, credit) => {
    try {
        const result = await Subject.create({subjectName, credit})
        return result
    } catch (e) {
        console.log('error at createSubject', e)
        return null
    }
}
const deleteSubject = async (_id) => {
    try {
        const result = await Subject.findByIdAndDelete(_id)
        return result
    } catch (e) {
        console.log('error at deleteSubject', e)
        return null
    }
}
const getAllSubjectService = async(UserId) => {
    try {
        const result = await Subject.find({userId: UserId}, {
            
        })
    } catch (e) {
        
    }
}
const editSubjectservice = async(idSubject, {subjectName, credit}) => {
    try {
        const subject = await Subject.findByIdAndUpdate(
            {_id: idSubject}, 
            {subjectName, credit},
            {new: true}
        )
        return subject
    } catch (e) {
        console.log('error at update Subject', e)
        return null
    }
}
module.exports = {
    createSubject,
    deleteSubject,
    getAllSubjectService,
    editSubjectservice
}