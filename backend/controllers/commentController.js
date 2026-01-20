const Comment = require('../models/Comment');

// Submit Comment (Public)
exports.submitComment = async (req, res) => {
    try {
        const comment = new Comment({
            ...req.body,
            blogPost: req.params.blogId,
            status: 'approved' // Auto-approve all comments
        });
        await comment.save();
        res.status(201).json(comment); // Return the actual comment so frontend can display it
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get comments for a blog (Public - only approved)
exports.getBlogComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            blogPost: req.params.blogId,
            status: 'approved'
        }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all comments (Admin)
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('blogPost', 'title')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update comment status (Admin)
exports.updateCommentStatus = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Comment (Admin)
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
