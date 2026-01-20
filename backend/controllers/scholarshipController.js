const Scholarship = require('../models/Scholarship');

// Get all scholarships
exports.getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find().sort({ createdAt: -1 });
        res.json(scholarships);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scholarships', error: error.message });
    }
};

// Create scholarship
exports.createScholarship = async (req, res) => {
    try {
        const newScholarship = new Scholarship(req.body);
        const savedScholarship = await newScholarship.save();
        res.status(201).json(savedScholarship);
    } catch (error) {
        res.status(400).json({ message: 'Error creating scholarship', error: error.message });
    }
};

// Update scholarship
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

// Delete scholarship
exports.deleteScholarship = async (req, res) => {
    try {
        const deletedScholarship = await Scholarship.findByIdAndDelete(req.params.id);
        if (!deletedScholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json({ message: 'Scholarship deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting scholarship', error: error.message });
    }
};
