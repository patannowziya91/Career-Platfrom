const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job',
        required: true
    },
    seekerID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    seekerName: {
        type: String,
        required: [true, 'Please add your name']
    },
    expertise: {
        type: String,
        required: [true, 'Please add your expertise']
    },
    education: {
        type: String,
        required: [true, 'Please add your ongoing study background']
    },
    resumeURL: {
        type: String,
        required: [true, 'Please upload a resume']
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    }
});

// Prevent user from applying to the same job twice
applicationSchema.index({ jobID: 1, seekerID: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
