const asyncHandler = require('express-async-handler')


const User = require('../models/userModel')
const Job = require('../models/jobModel')


// @desc       Get user jobs
// @route      GET /api/jobs
// @access     Private
const getJobs = asyncHandler(async(req, res) => {
    
    // Get user using the userId in the JWT
    const user = User.findById(req.user.userId)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const job = await Job.find({ user: req.user.userId})

    res.status(201).json(job)

})


// @desc       Get user jobs
// @route      GET /api/jobs/:id
// @access     Private
const getJob = asyncHandler(async(req, res) => {
    
    // Get user using the userId in the JWT
    const user = User.findById(req.user.userId)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const job = await Job.findById(req.params.id)

    if (!job) {
        res.status(404)
        throw new Error("Job not found")
    }

    if (job.user.toString() !== req.user.userId) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(201).json(job)

})



// @desc      Create new jobs
// @route      POST /api/jobs
// @access     Private
const createJob = asyncHandler(async(req, res) => {
    const {category, description} = req.body

    if (!category || !description) {
        res.status(400)
        throw new Error("Please add a category and description")
    }

    // Get user using the userId in the JWT
    const user = User.findById(req.user.userId)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const userData = {category, description, user: req.user.userId, status: "new"}
    const job = await Job.create({ ...userData})

    res.status(201).json(job)


})


// @desc Delete Job
// @route DELETE /api/jobs/:id
// @access Private

const deleteJob = asyncHandler(async(req, res) => {

    // Get user using the id in the JWT
    const user = await User.findById(req.user.userId)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const job = await Job.findById(req.params.id)
    console.log("my jobs : " + job);

    if (!job) {
        res.status(404)
        throw new Error("Job not found")
    }

    if (job.user.toString() !== req.user.userId) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await job.remove();

    res.status(200).json({ success: "Deleted Succesfuly" })
})

// @desc Update user jobs
// @route PUT /api/jobs/:id
// @access Private

const updatedJob = asyncHandler(async(req, res) => {

    // Get user using the userId in the JWT
    const user = await User.findById(req.user.userId)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const job = await Job.findById(req.params.id)

    if (!job) {
        res.status(404)
        throw new Error("Job not found")
    }

    if (job.user.toString() !== req.user.userId) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(200).json( updatedJob )
})



module.exports = {
    getJobs,
    createJob,
    getJob,
    deleteJob,
    updatedJob
}
