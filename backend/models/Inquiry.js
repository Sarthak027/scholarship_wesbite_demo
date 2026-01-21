const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
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
    phone: {
        type: String,
        required: true
    },
    state: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    course: {
        type: String,
        trim: true
    },
    consent: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['callback', 'scholarship'],
        default: 'scholarship'
    },
    subject: {
        type: String,
        default: "Scholarship/Course Application"
    },
    message: {
        type: String,
        default: "New application submitted through unified form."
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'resolved'],
        default: 'new'
    },
    source: {
        type: String,
        enum: ['enquiry_modal', 'contact_page', 'scholarship_page', 'online_course_page'],
        default: 'enquiry_modal'
    }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
