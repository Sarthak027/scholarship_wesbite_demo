const Settings = require('../models/Settings');

// Get all settings (or create default if none exists)
exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update settings
exports.updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(req.body);
        } else {
            settings = await Settings.findOneAndUpdate({}, req.body, {
                new: true,
                runValidators: true
            });
        }
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
