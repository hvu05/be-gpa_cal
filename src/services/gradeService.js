const Grade = require('../models/gradeModel')
const Semester = require('../models/semesterModel')

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
        // Lấy tất cả semester của user
        const semesters = await Semester.find({ userId: idUser }).sort({ semesterName: 1 });

        // Lấy tất cả grade của user
        const grades = await Grade.find({ userId: idUser })
            .populate("subjectId", "subjectName credit")
            .populate("semesterId", "semesterName");

        // Sắp xếp grade theo tên học kỳ
        grades.sort((a, b) => a.semesterId.semesterName.localeCompare(b.semesterId.semesterName));

        // Tính GPA tổng thể
        let totalGradePoints = 0;
        let totalCredits = 0;
        let totalSubject = 0;

        // Tính GPA theo từng semester
        const semesterGPA = {};

        grades.forEach((grade) => {
            const credit = grade.subjectId.credit;
            const grade4 = grade.grade4;

            totalGradePoints += grade4 * credit;
            totalCredits += credit;
            totalSubject += 1;

            const semesterName = grade.semesterId.semesterName;
            if (!semesterGPA[semesterName]) {
                semesterGPA[semesterName] = {
                    totalGradePoints: 0,
                    totalCredits: 0,
                };
            }
            semesterGPA[semesterName].totalGradePoints += grade4 * credit;
            semesterGPA[semesterName].totalCredits += credit;
        });

        // Tính GPA tổng thể
        const overallGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(3) : 0;

        // Tính GPA cho từng semester
        Object.keys(semesterGPA).forEach((semester) => {
            const { totalGradePoints, totalCredits } = semesterGPA[semester];
            semesterGPA[semester].gpa =
                totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
        });

        // Gom nhóm grades theo semester
        const gradesBySemester = grades.reduce((acc, grade) => {
            const semesterName = grade.semesterId.semesterName;
            if (!acc[semesterName]) {
                acc[semesterName] = {
                    semesterName: semesterName,
                    semesterId: grade.semesterId._id,
                    subjects: [],
                    gpa: parseFloat(semesterGPA[semesterName]?.gpa || 0),
                    totalCredits: semesterGPA[semesterName]?.totalCredits || 0,
                    totalGradePoints: semesterGPA[semesterName]?.totalGradePoints || 0,
                };
            }
            acc[semesterName].subjects.push({
                _id: grade._id,
                subjectId: grade.subjectId,
                grade10: grade.grade10,
                grade4: grade.grade4,
                gradeChar: grade.gradeChar,
                createdAt: grade.createdAt,
                updatedAt: grade.updatedAt,
            });
            return acc;
        }, {});

        // Đảm bảo tất cả semester đều có trong kết quả
        const semesterArray = semesters.map((sem) => {
            return (
                gradesBySemester[sem.semesterName] || {
                    semesterName: sem.semesterName,
                    semesterId: sem._id,
                    subjects: [],
                    gpa: 0,
                    totalCredits: 0,
                    totalGradePoints: 0,
                }
            );
        });

        const result = {
            grades: grades, // giữ nguyên format cũ
            gradesBySemester: semesterArray, // format mới gom nhóm theo semester
            overallGPA: parseFloat(overallGPA),
            semesterGPA: semesterGPA,
            totalCredit: totalCredits,
            totalSubject: totalSubject,
        };

        return result;
    } catch (e) {
        console.log("error at get all Grade", e);
        return null;
    }
}

const updateGradeService = async (_id, grade4, grade10) => {
    try {
        const gradeChar = gradeMap.get(Number(grade4))
        console.log('>>>check id', _id, gradeChar)
        const result = await Grade.findByIdAndUpdate(_id, { grade4, grade10, gradeChar }, { new: true })
        return result
    } catch (e) {
        console.log('error at update grade', e)
        return null
    }
}

const deleteGradeService = async (_id) => {
    try {
        const result = await Grade.findByIdAndDelete(_id)
        return result
    } catch (e) {
        console.log('error at delete grade', e)
        return null
    }
}
module.exports = {
    createGradeService,
    getAllSubjectAndGradeOfUserService,
    updateGradeService,
    deleteGradeService
}