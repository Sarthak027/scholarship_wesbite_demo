const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        trim: true
    },
    featuredImage: {
        type: String,
        default: ''
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    tags: [String],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    likes: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Pre-save hook to generate slug if not provided? (Usually done in controller)

module.exports = mongoose.model('Blog', blogSchema);
