const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', scholarshipController.getAllScholarships);

// Admin-only routes
router.post('/', authMiddleware, scholarshipController.createScholarship);
router.put('/:id', authMiddleware, scholarshipController.updateScholarship);
router.delete('/:id', authMiddleware, scholarshipController.deleteScholarship);

module.exports = router;
