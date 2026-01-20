const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: String, // e.g., "₹1,00,000*"
        required: true
    },
    image: {
        type: String, // URL or Path
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Management', 'Engineering', 'Computer Application', 'Designing', 'Commerce', 'Health Science', 'Law', 'Pharmacy', 'Hotel Management', 'Other']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
