const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');

// Upload single image (Admin only)
router.post('/image', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        let finalPath = filePath;
        let finalUrl = '';
        const filename = req.file.filename;

        // Try to optimize with Sharp if installed/working
        try {
            // Disable sharp cache to prevent file locking on Windows
            sharp.cache(false);

            const optimizedPath = filePath.replace(/\.\w+$/, '-optimized.webp');
            await sharp(filePath)
                .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 85 })
                .toFile(optimizedPath);

            // If successful, delete original and use optimized
            try {
                // Small delay to ensure handle is released on Windows
                await new Promise(resolve => setTimeout(resolve, 100));

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (unlinkErr) {
                console.warn('Warning: Could not delete original file after optimization:', unlinkErr.message);
                // Don't fail the request, just keep the duplicate
            }

            finalPath = optimizedPath;
            finalUrl = `/uploads/images/${path.basename(optimizedPath)}`;
        } catch (optimizeError) {
            console.warn('Image optimization failed, using original file:', optimizeError.message);
            // Fallback to original file
            finalUrl = `/uploads/images/${filename}`;
        }

        res.json({
            success: true,
            url: finalUrl,
            filename: path.basename(finalPath)
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
});

// Upload multiple images (Admin only)
router.post('/images', authMiddleware, upload.array('images', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const uploadedFiles = [];

        for (const file of req.files) {
            const filePath = file.path;
            const optimizedPath = filePath.replace(/\.\w+$/, '-optimized.webp');

            await sharp(filePath)
                .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 85 })
                .toFile(optimizedPath);

            fs.unlinkSync(filePath);

            uploadedFiles.push({
                url: `/uploads/images/${path.basename(optimizedPath)}`,
                filename: path.basename(optimizedPath)
            });
        }

        res.json({
            success: true,
            files: uploadedFiles
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading images', error: error.message });
    }
});

// Delete image (Admin only)
router.delete('/image/:filename', authMiddleware, (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '..', 'uploads', 'images', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ success: true, message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Error deleting image', error: error.message });
    }
});

module.exports = router;
