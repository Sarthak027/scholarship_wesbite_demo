const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.get('/post/:blogId', commentController.getBlogComments);
router.post('/post/:blogId', commentController.submitComment);

// Admin
router.get('/', authMiddleware, commentController.getAllComments);
router.patch('/:id/status', authMiddleware, commentController.updateCommentStatus);
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
