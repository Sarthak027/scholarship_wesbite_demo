const express = require('express');
const router = express.Router();
const onlineCourseController = require('../controllers/onlineCourseController');
const authMiddleware = require('../middleware/authMiddleware');

// ============= PUBLIC ROUTES =============

// Universities
router.get('/universities', onlineCourseController.getAllUniversities);
router.get('/universities/with-count', onlineCourseController.getUniversitiesWithCount);
router.get('/universities/:slug', onlineCourseController.getUniversityBySlug);
router.get('/universities/:slug/courses', onlineCourseController.getUniversityWithCourses);

// Courses
router.get('/', onlineCourseController.getAllCourses);
router.get('/by-university/:slug', onlineCourseController.getCoursesByUniversity);
router.get('/:id', onlineCourseController.getCourseById);

// ============= ADMIN-ONLY ROUTES =============

// Universities (Admin)
router.get('/admin/universities', authMiddleware, onlineCourseController.getAllUniversitiesAdmin);
router.post('/universities', authMiddleware, onlineCourseController.createUniversity);
router.put('/universities/:id', authMiddleware, onlineCourseController.updateUniversity);
router.delete('/universities/:id', authMiddleware, onlineCourseController.deleteUniversity);

// Courses (Admin)
router.get('/admin/all', authMiddleware, onlineCourseController.getAllCoursesAdmin);
router.post('/', authMiddleware, onlineCourseController.createCourse);
router.put('/:id', authMiddleware, onlineCourseController.updateCourse);
router.delete('/:id', authMiddleware, onlineCourseController.deleteCourse);

module.exports = router;
