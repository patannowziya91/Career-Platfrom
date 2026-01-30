const express = require('express');
const {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Seeker routes
router.post('/', protect, authorize('seeker'), applyForJob);
router.get('/my-applications', protect, authorize('seeker'), getMyApplications);

// Employer routes
router.get('/job/:jobId', protect, authorize('employer'), getJobApplications);
router.patch('/:id', protect, authorize('employer'), updateApplicationStatus);

module.exports = router;
