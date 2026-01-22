const mongoose = require('mongoose');

const onlineCourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    degree: {
        type: String,
        required: true,
        trim: true
    },
    specializations: {
        type: String,
        required: true,
        trim: true
    },
    scholarship: {
        type: String, // e.g., "Scholarship- Guaranteed ₹50,000*"
        required: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String, // URL or Path
        required: true
    },
    universitySlug: {
        type: String,
        required: true,
        lowercase: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Index for faster university lookups
onlineCourseSchema.index({ universitySlug: 1 });

module.exports = mongoose.model('OnlineCourse', onlineCourseSchema);
