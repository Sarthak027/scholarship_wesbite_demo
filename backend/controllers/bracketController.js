const ScholarshipBracket = require('../models/ScholarshipBracket');

// Default brackets data for seeding
const defaultBrackets = [
    { minPercentile: 95, maxPercentile: 100, rewardAmount: 600000, label: "95 - 100%" },
    { minPercentile: 90, maxPercentile: 94.99, rewardAmount: 400000, label: "90 - 94.99%" },
    { minPercentile: 85, maxPercentile: 89.99, rewardAmount: 250000, label: "85 - 89.99%" },
    { minPercentile: 75, maxPercentile: 84.99, rewardAmount: 100000, label: "75 - 84.99%" },
    { minPercentile: 0, maxPercentile: 74.99, rewardAmount: 50000, label: "Below 75%" }
];

const courses = ['mba', 'pgdm', 'btech', 'bba', 'bca', 'mca'];

// Get all brackets (Public)
exports.getAllBrackets = async (req, res) => {
    try {
        let brackets = await ScholarshipBracket.find({ isActive: true });

        // If no brackets exist, create default ones
        if (brackets.length === 0) {
            const defaultData = courses.map(course => ({
                course,
                year: 2026,
                brackets: defaultBrackets,
                isActive: true
            }));

            await ScholarshipBracket.insertMany(defaultData);
            brackets = await ScholarshipBracket.find({ isActive: true });
        }

        res.json(brackets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brackets', error: error.message });
    }
};

// Get brackets by course (Public)
exports.getBracketsByCourse = async (req, res) => {
    try {
        const { course } = req.params;
        let bracket = await ScholarshipBracket.findOne({
            course: course.toLowerCase(),
            isActive: true
        });

        // If bracket doesn't exist, create default one
        if (!bracket) {
            bracket = new ScholarshipBracket({
                course: course.toLowerCase(),
                year: 2026,
                brackets: defaultBrackets,
                isActive: true
            });
            await bracket.save();
        }

        res.json(bracket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bracket', error: error.message });
    }
};

// Update brackets for a course (Admin)
exports.updateBrackets = async (req, res) => {
    try {
        const { course } = req.params;
        const { brackets, year } = req.body;

        const updatedBracket = await ScholarshipBracket.findOneAndUpdate(
            { course: course.toLowerCase() },
            {
                brackets,
                year: year || 2026,
                updatedAt: new Date()
            },
            { new: true, upsert: true }
        );

        res.json({ message: 'Brackets updated successfully', data: updatedBracket });
    } catch (error) {
        res.status(400).json({ message: 'Error updating brackets', error: error.message });
    }
};

// Initialize/Reset all brackets to default (Admin)
exports.initializeBrackets = async (req, res) => {
    try {
        // Delete all existing brackets
        await ScholarshipBracket.deleteMany({});

        // Create default brackets for all courses
        const defaultData = courses.map(course => ({
            course,
            year: 2026,
            brackets: defaultBrackets,
            isActive: true
        }));

        await ScholarshipBracket.insertMany(defaultData);
        const brackets = await ScholarshipBracket.find();

        res.json({ message: 'Brackets initialized successfully', data: brackets });
    } catch (error) {
        res.status(500).json({ message: 'Error initializing brackets', error: error.message });
    }
};

// Calculate reward based on score and course (Public)
exports.calculateReward = async (req, res) => {
    try {
        const { course, score } = req.body;

        const bracket = await ScholarshipBracket.findOne({
            course: course.toLowerCase(),
            isActive: true
        });

        if (!bracket) {
            return res.status(404).json({ message: 'Brackets not found for this course' });
        }

        let reward = 50000; // Default minimum
        for (const b of bracket.brackets) {
            if (score >= b.minPercentile && score <= b.maxPercentile) {
                reward = b.rewardAmount;
                break;
            }
        }

        res.json({
            course: bracket.course,
            score,
            reward,
            year: bracket.year
        });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating reward', error: error.message });
    }
};
