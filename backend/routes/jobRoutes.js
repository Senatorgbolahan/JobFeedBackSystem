const express = require('express')
const router = express.Router()
const {createJob, getJobs, getJob, deleteJob, updatedJob} = require('../controller/jobController')

const {protect} = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:jobId/notes', noteRouter)


router.route('/').get(protect, getJobs).post(protect, createJob)

router.route('/:id').get(protect, getJob).delete(protect, deleteJob).put(protect, updatedJob)


module.exports = router