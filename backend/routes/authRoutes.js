const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/login', authController.login);
router.post('/seed', authController.seedAdmin);

// Protected routes
router.get('/me', authMiddleware, authController.getCurrentAdmin);
router.patch('/username', authMiddleware, authController.updateUsername);
router.patch('/password', authMiddleware, authController.updatePassword);

module.exports = router;
