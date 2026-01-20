const Inquiry = require('../models/Inquiry');

// Submit inquiry (Public)
exports.submitInquiry = async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        const savedInquiry = await newInquiry.save();
        res.status(201).json({ message: 'Inquiry submitted successfully', data: savedInquiry });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting inquiry', error: error.message });
    }
};

// Get all inquiries (Admin)
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inquiries', error: error.message });
    }
};

// Update inquiry status (Admin)
exports.updateInquiryStatus = async (req, res) => {
    try {
        const updatedInquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
        res.json(updatedInquiry);
    } catch (error) {
        res.status(400).json({ message: 'Error updating status', error: error.message });
    }
};
