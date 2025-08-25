const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    grade10: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    grade4: {
        type: Number,
        required: true,
        min: 0,
        max: 4
    },
    gradeChar: {
        type: String,
        required: true,
        enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F']
    }
}, { timestamps: true })

const Grade = mongoose.model('Grade', gradeSchema)
module.exports = Grade