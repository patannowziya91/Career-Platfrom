const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title'],
        trim: true,
        maxlength: [100, 'Title can not be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    requirements: {
        type: String,
        required: [true, 'Please add job requirements']
    },
    salaryRange: {
        type: String,
        required: [true, 'Please add a salary range']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    jobType: {
        type: String,
        required: [true, 'Please select job type'],
        enum: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    employerID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);
