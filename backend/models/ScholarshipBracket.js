const mongoose = require('mongoose');

const bracketSchema = new mongoose.Schema({
    minPercentile: {
        type: Number,
        required: true
    },
    maxPercentile: {
        type: Number,
        required: true
    },
    rewardAmount: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

const scholarshipBracketSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        enum: ['mba', 'pgdm', 'btech', 'bba', 'bca', 'mca'],
        unique: true,
        lowercase: true
    },
    year: {
        type: Number,
        required: true,
        default: 2026
    },
    brackets: [bracketSchema],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ScholarshipBracket', scholarshipBracketSchema);
