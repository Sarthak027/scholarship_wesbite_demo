const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
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
    website: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'spam'],
        default: 'pending'
    },
    isAdminReply: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
