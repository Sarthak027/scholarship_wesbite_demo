const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin
router.get('/admin/all', authMiddleware, blogController.getAdminBlogs);
router.post('/', authMiddleware, blogController.createBlog);
router.patch('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

// Public
router.get('/', blogController.getBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/:id/like', blogController.likeBlog);

module.exports = router;
