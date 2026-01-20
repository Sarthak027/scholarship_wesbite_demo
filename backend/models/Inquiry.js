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
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'resolved'],
        default: 'new'
    },
    source: {
        type: String,
        enum: ['enquiry_modal', 'contact_page'],
        default: 'enquiry_modal'
    }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
