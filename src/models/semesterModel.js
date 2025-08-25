const mongoose = require('mongoose')

const semesterSchema = new mongoose.Schema({
    semesterName: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Semester = mongoose.model('Semester', semesterSchema)
module.exports = Semester