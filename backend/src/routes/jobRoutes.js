const express = require('express');
const {
    getJobs,
    getJobById,
    createJob,
    deleteJob,
    updateJob,
    getMyJobs
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getJobs);

router.get('/myjobs', protect, authorize('employer'), getMyJobs);
router.post('/', protect, authorize('employer'), createJob);
router.put('/:id', protect, authorize('employer'), updateJob);
router.delete('/:id', protect, authorize('employer'), deleteJob);

// Public routes (Catch-all for IDs)
router.get('/:id', getJobById);

module.exports = router;
