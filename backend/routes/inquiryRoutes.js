const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.post('/', inquiryController.submitInquiry);

// Admin routes
router.get('/', authMiddleware, inquiryController.getAllInquiries);
router.patch('/:id/status', authMiddleware, inquiryController.updateInquiryStatus);

module.exports = router;
