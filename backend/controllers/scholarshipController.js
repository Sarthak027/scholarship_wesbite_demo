const Scholarship = require('../models/Scholarship');
const ScholarshipCategory = require('../models/ScholarshipCategory');

// ============= CATEGORY CONTROLLERS =============

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await ScholarshipCategory.find({ isActive: true }).sort({ order: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Get all categories for admin (including inactive)
exports.getAllCategoriesAdmin = async (req, res) => {
    try {
        const categories = await ScholarshipCategory.find().sort({ order: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Get single category by slug
exports.getCategoryBySlug = async (req, res) => {
    try {
        const category = await ScholarshipCategory.findOne({ slug: req.params.slug, isActive: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
};

// Create category (Admin only)
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new ScholarshipCategory(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error: error.message });
    }
};

// Update category (Admin only)
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await ScholarshipCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error updating category', error: error.message });
    }
};

// Delete category (Admin only)
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await ScholarshipCategory.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });

        // Also delete all scholarships in this category
        await Scholarship.deleteMany({ categorySlug: deletedCategory.slug });

        res.json({ message: 'Category and associated scholarships deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

// ============= SCHOLARSHIP CONTROLLERS =============

// Get all scholarships
exports.getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find({ isActive: true }).sort({ categorySlug: 1, sectionTitle: 1, order: 1 });
        res.json(scholarships);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scholarships', error: error.message });
    }
};

// Get all scholarships for admin (including inactive)
exports.getAllScholarshipsAdmin = async (req, res) => {
    try {
        const scholarships = await Scholarship.find().sort({ categorySlug: 1, sectionTitle: 1, order: 1 });
        res.json(scholarships);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scholarships', error: error.message });
    }
};

// Get scholarships by category slug
exports.getScholarshipsByCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const scholarships = await Scholarship.find({ categorySlug: slug, isActive: true }).sort({ sectionTitle: 1, order: 1 });

        // Group by sectionTitle
        const grouped = scholarships.reduce((acc, scholarship) => {
            const section = scholarship.sectionTitle;
            if (!acc[section]) {
                acc[section] = [];
            }
            acc[section].push(scholarship);
            return acc;
        }, {});

        // Convert to array format
        const sections = Object.keys(grouped).map(title => ({
            title,
            items: grouped[title]
        }));

        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scholarships', error: error.message });
    }
};

// Get single scholarship
exports.getScholarshipById = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json(scholarship);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scholarship', error: error.message });
    }
};

// Create scholarship (Admin only)
exports.createScholarship = async (req, res) => {
    try {
        const newScholarship = new Scholarship(req.body);
        const savedScholarship = await newScholarship.save();
        res.status(201).json(savedScholarship);
    } catch (error) {
        res.status(400).json({ message: 'Error creating scholarship', error: error.message });
    }
};

// Update scholarship (Admin only)
exports.updateScholarship = async (req, res) => {
    try {
        const updatedScholarship = await Scholarship.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedScholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json(updatedScholarship);
    } catch (error) {
        res.status(400).json({ message: 'Error updating scholarship', error: error.message });
    }
};

// Delete scholarship (Admin only)
exports.deleteScholarship = async (req, res) => {
    try {
        const deletedScholarship = await Scholarship.findByIdAndDelete(req.params.id);
        if (!deletedScholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json({ message: 'Scholarship deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting scholarship', error: error.message });
    }
};

// Get categories with scholarship count
exports.getCategoriesWithCount = async (req, res) => {
    try {
        const categories = await ScholarshipCategory.find({ isActive: true }).sort({ order: 1 });

        const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const count = await Scholarship.countDocuments({ categorySlug: category.slug, isActive: true });
                const firstScholarship = await Scholarship.findOne({ categorySlug: category.slug, isActive: true });
                return {
                    ...category.toObject(),
                    scholarshipCount: count,
                    sampleScholarship: firstScholarship?.scholarship || null
                };
            })
        );

        res.json(categoriesWithCount);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};
