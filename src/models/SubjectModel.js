const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    credit: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject