const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Seed route (remove in production)
exports.seedAdmin = async (req, res) => {
    try {
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

        const newAdmin = new Admin({
            username: 'admin',
            password: 'adminpassword123'
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding admin', error: error.message });
    }
};
