const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Seeker only)
exports.applyForJob = async (req, res) => {
    try {
        const { jobID, resumeURL, seekerName, expertise, education } = req.body;

        // Check if job exists
        const job = await Job.findById(jobID);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user has already applied
        const existingApplication = await Application.findOne({
            jobID,
            seekerID: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = await Application.create({
            jobID,
            seekerID: req.user.id,
            seekerName,
            expertise,
            education,
            resumeURL
        });

        res.status(201).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged in user's applications
// @route   GET /api/applications/my-applications
// @access  Private (Seeker only)
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ seekerID: req.user.id })
            .populate('jobID', 'title company location salaryRange')
            .sort({ appliedDate: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all applications for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer only)
exports.getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Ensure the employer owns the job
        if (job.employerID.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view these applications' });
        }

        const applications = await Application.find({ jobID: req.params.jobId })
            .populate('seekerID', 'name email')
            .sort({ appliedDate: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update application status
// @route   PATCH /api/applications/:id
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Pending', 'Reviewed', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        let application = await Application.findById(req.params.id).populate('jobID');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Ensure the employer owns the job this application refers to
        if (application.jobID.employerID.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
