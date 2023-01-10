const asyncHandler = require('express-async-handler')


const User = require('../models/userModel')
const Job = require('../models/jobModel')
const Note = require('../models/noteModel')


// @desc       Get note for a job
// @route      GET /api/jobs/:jobId/notes
// @access     Private
const getNotes = asyncHandler(async(req, res) => {
    
    // Get user using the userId in the JWT
    const user = User.findById(req.user.userId)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const job = await Job.findById(req.params.jobId)
    console.log(job);

    if (job.user.toString() !== req.user.userId) {
        res.status(400)
        throw new Error('User not authorized')
    }

    const notes = await Note.find({job: req.params.jobId})

    res.status(201).json(notes)

})


// @desc       Create note for a job
// @route      POST /api/jobs/:jobId/notes
// @access     Private
const addNote = asyncHandler(async(req, res) => {
    
    // Get user using the userId in the JWT
    const user = User.findById(req.user.userId)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const job = await Job.findById(req.params.jobId)
    console.log(job);

    if (job.user.toString() !== req.user.userId) {
        res.status(400)
        throw new Error('User not authorized')
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        job: req.params.jobId,
        user: req.user.userId
    })

    res.status(201).json(note)

})


module.exports = {
    getNotes,
    addNote
}