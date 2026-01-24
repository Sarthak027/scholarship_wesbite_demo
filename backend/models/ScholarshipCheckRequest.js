const mongoose = require('mongoose');

const scholarshipCheckRequestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    preferredCollege: {
        type: String,
        trim: true
    },
    targetCourse: {
        type: String,
        trim: true
    },
    expectedBatch: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'checked', 'contacted'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ScholarshipCheckRequest', scholarshipCheckRequestSchema);
