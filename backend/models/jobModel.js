const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    category: {
        type: String,
        required: [true, "Please select a category"],
        enum: ["Part-Time", "Contract Job", "Full-Time", "Internship"],
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"],
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "open", "closed"],
        default: "new"
    },
}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema)