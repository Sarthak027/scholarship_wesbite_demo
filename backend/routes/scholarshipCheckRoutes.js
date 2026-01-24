const express = require('express');
const router = express.Router();
const ScholarshipCheckRequest = require('../models/ScholarshipCheckRequest');
const auth = require('../middleware/authMiddleware'); // Assuming auth middleware exists

// Submit a new request
router.post('/', async (req, res) => {
    try {
        const newRequest = new ScholarshipCheckRequest(req.body);
        await newRequest.save();
        res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting request', error: error.message });
    }
});

// Get all requests (Admin only)
router.get('/', auth, async (req, res) => {
    try {
        const requests = await ScholarshipCheckRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
});

// Delete all requests (Admin only) - Optional utility
router.delete('/all', auth, async (req, res) => {
    try {
        await ScholarshipCheckRequest.deleteMany({});
        res.json({ message: 'All requests deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting requests', error: error.message });
    }
});

module.exports = router;
