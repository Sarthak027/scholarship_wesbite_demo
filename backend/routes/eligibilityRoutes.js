const express = require('express');
const router = express.Router();
const eligibilityController = require('../controllers/eligibilityController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route - Submit eligibility
router.post('/', eligibilityController.submitEligibility);

// Admin routes (protected)
router.get('/', authMiddleware, eligibilityController.getAllSubmissions);
router.get('/export', authMiddleware, eligibilityController.exportSubmissions);
router.get('/:id', authMiddleware, eligibilityController.getSubmissionById);
router.patch('/:id/status', authMiddleware, eligibilityController.updateSubmissionStatus);
router.delete('/admin/all', authMiddleware, eligibilityController.deleteAllSubmissions);

module.exports = router;
