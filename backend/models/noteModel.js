const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    job: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Job',
    },
    text: {
        type: String,
        required: [true, "Please enter some text"],
    },
    isStaff: {
        type: Boolean,
        default:false,
    },
    staffId: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model("Note", noteSchema)