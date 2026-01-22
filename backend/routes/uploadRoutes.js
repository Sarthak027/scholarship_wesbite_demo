const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');

// Upload single image (Admin only)
router.post('/image', authMiddleware, upload.single('image'), async (req, res) => {
    // ... (existing code for generic image upload)
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
            sharp.cache(false);
            const optimizedPath = filePath.replace(/\.\w+$/, '-optimized.webp');
            await sharp(filePath)
                .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 85 })
                .toFile(optimizedPath);

            try {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            } catch (unlinkErr) {
                console.warn('Warning: Could not delete original file after optimization:', unlinkErr.message);
            }

            finalPath = optimizedPath;
            finalUrl = `/uploads/images/${path.basename(optimizedPath)}`;
        } catch (optimizeError) {
            console.warn('Image optimization failed, using original file:', optimizeError.message);
            finalUrl = `/uploads/images/${filename}`;
        }

        res.json({ success: true, url: finalUrl, filename: path.basename(finalPath) });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
});

// Upload Blog Thumbnail (Admin only) - Stores in backend\uploads\documents\blog_images
router.post('/blog-thumbnail', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const blogImagesDir = path.join(__dirname, '..', 'uploads', 'documents', 'blog_images');
        if (!fs.existsSync(blogImagesDir)) {
            fs.mkdirSync(blogImagesDir, { recursive: true });
        }

        const originalPath = req.file.path;
        const filename = `thumb-${Date.now()}.webp`;
        const finalPath = path.join(blogImagesDir, filename);

        // Optimize and save as permanent thumbnail
        await sharp(originalPath)
            .resize(800, 450, { fit: 'cover' }) // Consistent 16:9 ratio for thumbnails
            .webp({ quality: 80 })
            .toFile(finalPath);

        // Clean up original upload
        try {
            if (fs.existsSync(originalPath)) fs.unlinkSync(originalPath);
        } catch (e) {
            console.warn('Cleanup failed:', e.message);
        }

        res.json({
            success: true,
            url: `/uploads/documents/blog_images/${filename}`,
            filename
        });
    } catch (error) {
        console.error('Thumbnail upload error:', error);
        res.status(500).json({ message: 'Error uploading thumbnail', error: error.message });
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
