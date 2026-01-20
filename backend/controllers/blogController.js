const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// Create Blog
exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            author: req.admin.id // From authMiddleware
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all blogs (Public - only published)
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'published' })
            .sort({ createdAt: -1 })
            .select('-content'); // Don't send full content in list
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all blogs (Admin - including drafts)
exports.getAdminBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // Increment view count
        blog.viewCount += 1;
        await blog.save();

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like Blog
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        blog.likes += 1;
        await blog.save();
        res.json({ likes: blog.likes });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
