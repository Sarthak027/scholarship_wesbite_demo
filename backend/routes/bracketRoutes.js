const express = require('express');
const router = express.Router();
const bracketController = require('../controllers/bracketController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', bracketController.getAllBrackets);
router.get('/:course', bracketController.getBracketsByCourse);
router.post('/calculate', bracketController.calculateReward);

// Admin routes (protected)
router.put('/:course', authMiddleware, bracketController.updateBrackets);
router.post('/initialize', authMiddleware, bracketController.initializeBrackets);

module.exports = router;
