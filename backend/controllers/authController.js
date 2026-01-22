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

// Update username (Admin)
exports.updateUsername = async (req, res) => {
    try {
        const { newUsername } = req.body;
        const adminId = req.admin.id;

        if (!newUsername || newUsername.trim().length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long' });
        }

        // Check if new username already exists
        const existingAdmin = await Admin.findOne({ username: newUsername.trim() });
        if (existingAdmin && existingAdmin._id.toString() !== adminId) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        admin.username = newUsername.trim();
        await admin.save();

        res.json({
            message: 'Username updated successfully',
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating username', error: error.message });
    }
};

// Update password (Admin)
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const adminId = req.admin.id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Verify current password
        const isMatch = await admin.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update password
        admin.password = newPassword;
        await admin.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error: error.message });
    }
};

// Get current admin info (Admin)
exports.getCurrentAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin info', error: error.message });
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
