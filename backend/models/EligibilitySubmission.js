const mongoose = require('mongoose');

const eligibilitySubmissionSchema = new mongoose.Schema({
    // User details
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    // Academic details
    course: {
        type: String,
        required: true,
        enum: ['mba', 'pgdm', 'btech', 'bdesign', 'bba', 'others'],
        lowercase: true
    },
    tenthMarks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    twelfthMarks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    graduationMarks: {
        type: Number,
        min: 0,
        max: 100
    },

    // Entrance exam details
    entranceExam: {
        type: String,
        required: true,
        trim: true
    },
    examScore: {
        type: Number,
        required: true
    },

    // Calculated reward
    calculatedReward: {
        type: Number,
        required: true
    },

    // Status tracking
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('EligibilitySubmission', eligibilitySubmissionSchema);
