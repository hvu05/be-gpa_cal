const Grade = require('../models/gradeModel')
const gradeMap = new Map([
        [4.0, 'A'],
        [3.5, 'B+'],
        [3.0, 'B'],
        [2.5, 'C+'],
        [2.0, 'C'],
        [1.5, 'D+'],
        [1.0, 'D'],
        [0.0, 'F']
    ])
const createGradeService = async (idUser, info) => {
    // params: info:
    /*
        subjectId: '64f9b2a7c9e3a12d5f0a5678',
        semester: 'HK1 2024-2025',
        grade10: 8.5,
        grade4: 3.5,
        gradeChar: 'B+'
    */
    // Map từ thang điểm 4 sang điểm chữ
    
    const { subjectId, semesterId, grade10, grade4 } = info
    const gradeChar = gradeMap.get(grade4)
    try {
        const result = await Grade.create({
            userId: idUser,
            subjectId, semesterId, grade10, grade4, gradeChar
        })
        return result
    } catch (e) {
        console.log('error at create Grade', e)
        return null
    }
}

const getAllSubjectAndGradeOfUserService = async (idUser) => {
    try {
        const grades = await Grade.find({ userId: idUser })
            .populate("subjectId", 'subjectName credit')
            .populate('semesterId', 'semesterName')
            
        grades.sort((a, b) => a.semesterId.semesterName.localeCompare(b.semesterId.semesterName))

        // Tính GPA tổng thể
        let totalGradePoints = 0
        let totalCredits = 0
        
        // Tính GPA theo từng semester
        const semesterGPA = {}
        
        grades.forEach(grade => {
            const credit = grade.subjectId.credit
            const grade4 = grade.grade4
            
            // Tính tổng điểm và tín chỉ tổng thể
            totalGradePoints += grade4 * credit
            totalCredits += credit
            
            // Tính GPA theo semester
            const semesterName = grade.semesterId.semesterName
            if (!semesterGPA[semesterName]) {
                semesterGPA[semesterName] = {
                    totalGradePoints: 0,
                    totalCredits: 0
                }
            }
            semesterGPA[semesterName].totalGradePoints += grade4 * credit
            semesterGPA[semesterName].totalCredits += credit
        })
        
        // Tính GPA tổng thể
        const overallGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0
        
        // Tính GPA cho từng semester
        Object.keys(semesterGPA).forEach(semester => {
            const { totalGradePoints, totalCredits } = semesterGPA[semester]
            semesterGPA[semester].gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0
        })
        
        // Thêm GPA vào mỗi grade
        grades.forEach(grade => {
            const semesterName = grade.semesterId.semesterName
            grade.semesterGPA = parseFloat(semesterGPA[semesterName].gpa)
        })
        
        // Thêm thông tin GPA tổng thể
        const result = {
            grades: grades,
            overallGPA: parseFloat(overallGPA),
            semesterGPA: semesterGPA
        }

        return result
    } catch (e) {
        console.log('error at get all Grade', e)
        return null
    }
}

const updateGradeService = async (_id, grade4) => {
    try {
        const gradeChar = gradeMap.get(grade4)
        console.log(_id, gradeChar)
        const result = await Grade.findByIdAndUpdate(_id, {grade4, gradeChar}, {new: true})
        return result
    } catch (e) {
        console.log('error at update grade', e)
        return null
    }
}
module.exports = {
    createGradeService,
    getAllSubjectAndGradeOfUserService,
    updateGradeService
}