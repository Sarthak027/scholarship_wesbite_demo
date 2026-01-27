const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    youtubeVideoUrl: {
        type: String,
        default: 'https://www.youtube.com/embed/1ZQFppefWGM?cc_load_policy=1'
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
