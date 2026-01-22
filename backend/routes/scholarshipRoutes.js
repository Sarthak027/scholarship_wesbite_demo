const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const authMiddleware = require('../middleware/authMiddleware');

// ============= PUBLIC ROUTES =============

// Categories
router.get('/categories', scholarshipController.getAllCategories);
router.get('/categories/with-count', scholarshipController.getCategoriesWithCount);
router.get('/categories/:slug', scholarshipController.getCategoryBySlug);

// Scholarships
router.get('/', scholarshipController.getAllScholarships);
router.get('/by-category/:slug', scholarshipController.getScholarshipsByCategory);
router.get('/:id', scholarshipController.getScholarshipById);

// ============= ADMIN-ONLY ROUTES =============

// Categories (Admin)
router.get('/admin/categories', authMiddleware, scholarshipController.getAllCategoriesAdmin);
router.post('/categories', authMiddleware, scholarshipController.createCategory);
router.put('/categories/:id', authMiddleware, scholarshipController.updateCategory);
router.delete('/categories/:id', authMiddleware, scholarshipController.deleteCategory);

// Scholarships (Admin)
router.get('/admin/all', authMiddleware, scholarshipController.getAllScholarshipsAdmin);
router.post('/', authMiddleware, scholarshipController.createScholarship);
router.put('/:id', authMiddleware, scholarshipController.updateScholarship);
router.delete('/:id', authMiddleware, scholarshipController.deleteScholarship);

module.exports = router;
