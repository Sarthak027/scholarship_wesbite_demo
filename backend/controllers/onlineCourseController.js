const OnlineUniversity = require('../models/OnlineUniversity');
const OnlineCourse = require('../models/OnlineCourse');

// ============= UNIVERSITY CONTROLLERS =============

// Get all universities
exports.getAllUniversities = async (req, res) => {
    try {
        const universities = await OnlineUniversity.find({ isActive: true }).sort({ order: 1 });
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching universities', error: error.message });
    }
};

// Get all universities for admin (including inactive)
exports.getAllUniversitiesAdmin = async (req, res) => {
    try {
        const universities = await OnlineUniversity.find().sort({ order: 1 });
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching universities', error: error.message });
    }
};

// Get single university by slug
exports.getUniversityBySlug = async (req, res) => {
    try {
        const university = await OnlineUniversity.findOne({ slug: req.params.slug, isActive: true });
        if (!university) return res.status(404).json({ message: 'University not found' });
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching university', error: error.message });
    }
};

// Create university (Admin only)
exports.createUniversity = async (req, res) => {
    try {
        const newUniversity = new OnlineUniversity(req.body);
        const savedUniversity = await newUniversity.save();
        res.status(201).json(savedUniversity);
    } catch (error) {
        res.status(400).json({ message: 'Error creating university', error: error.message });
    }
};

// Update university (Admin only)
exports.updateUniversity = async (req, res) => {
    try {
        const updatedUniversity = await OnlineUniversity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUniversity) return res.status(404).json({ message: 'University not found' });
        res.json(updatedUniversity);
    } catch (error) {
        res.status(400).json({ message: 'Error updating university', error: error.message });
    }
};

// Delete university (Admin only)
exports.deleteUniversity = async (req, res) => {
    try {
        const deletedUniversity = await OnlineUniversity.findByIdAndDelete(req.params.id);
        if (!deletedUniversity) return res.status(404).json({ message: 'University not found' });

        // Also delete all courses from this university
        await OnlineCourse.deleteMany({ universitySlug: deletedUniversity.slug });

        res.json({ message: 'University and associated courses deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting university', error: error.message });
    }
};

// ============= COURSE CONTROLLERS =============

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await OnlineCourse.find({ isActive: true }).sort({ universitySlug: 1, order: 1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

// Get all courses for admin (including inactive)
exports.getAllCoursesAdmin = async (req, res) => {
    try {
        const courses = await OnlineCourse.find().sort({ universitySlug: 1, order: 1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

// Get courses by university slug
exports.getCoursesByUniversity = async (req, res) => {
    try {
        const { slug } = req.params;
        const courses = await OnlineCourse.find({ universitySlug: slug, isActive: true }).sort({ order: 1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

// Get single course
exports.getCourseById = async (req, res) => {
    try {
        const course = await OnlineCourse.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
};

// Create course (Admin only)
exports.createCourse = async (req, res) => {
    try {
        const newCourse = new OnlineCourse(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ message: 'Error creating course', error: error.message });
    }
};

// Update course (Admin only)
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await OnlineCourse.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: 'Error updating course', error: error.message });
    }
};

// Delete course (Admin only)
exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await OnlineCourse.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
};

// Get universities with course count
exports.getUniversitiesWithCount = async (req, res) => {
    try {
        const universities = await OnlineUniversity.find({ isActive: true }).sort({ order: 1 });

        const universitiesWithCount = await Promise.all(
            universities.map(async (university) => {
                const count = await OnlineCourse.countDocuments({ universitySlug: university.slug, isActive: true });
                return {
                    ...university.toObject(),
                    courseCount: count
                };
            })
        );

        res.json(universitiesWithCount);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching universities', error: error.message });
    }
};

// Get university with its courses
exports.getUniversityWithCourses = async (req, res) => {
    try {
        const { slug } = req.params;
        const university = await OnlineUniversity.findOne({ slug, isActive: true });
        if (!university) return res.status(404).json({ message: 'University not found' });

        const courses = await OnlineCourse.find({ universitySlug: slug, isActive: true }).sort({ order: 1 });

        res.json({
            ...university.toObject(),
            courses
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching university with courses', error: error.message });
    }
};
