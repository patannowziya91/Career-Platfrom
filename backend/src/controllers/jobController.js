const Job = require('../models/Job');

// @desc    Get all jobs (with filters)
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
    try {
        const { keyword, location, jobType, category } = req.query;
        let query = {};

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (jobType) {
            query.jobType = jobType;
        }

        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 }).populate('employerID', 'name email');

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employerID', 'name email');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer only)
exports.createJob = async (req, res) => {
    try {
        // Add user to req.body
        req.body.employerID = req.user.id;

        const job = await Job.create(req.body);

        res.status(201).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get jobs posted by current employer
// @route   GET /api/jobs/myjobs
// @access  Private (Employer only)
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ employerID: req.user.id }).sort({ createdAt: -1 }).populate('employerID', 'name email');

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer only)
exports.updateJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Make sure user is job owner
        if (job.employerID.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this job' });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer only)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Make sure user is job owner
        if (job.employerID.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this job' });
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
