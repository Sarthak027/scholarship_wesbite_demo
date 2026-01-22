const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

dotenv.config();

// WordPress API URL
const WP_URL = "https://confirmscholarship.com/wp-json/wp/v2/posts";
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'images', 'blogs');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    console.log(`Creating directory: ${UPLOADS_DIR}`);
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

/**
 * Downloads an image from a URL and saves it locally.
 * @param {string} url - The image URL.
 * @param {string} slug - The post slug to name the file.
 * @returns {Promise<string>} - The local path to the image.
 */
async function downloadImage(url, slug) {
    if (!url) return '';
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        // Get extension from URL or default to .jpg
        let extension = path.extname(new URL(url).pathname) || '.jpg';
        const fileName = `${slug}${extension}`;
        const filePath = path.join(UPLOADS_DIR, fileName);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`Downloaded image: ${fileName}`);
                resolve(`/uploads/images/blogs/${fileName}`);
            });
            writer.on('error', (err) => {
                console.error(`Error saving image ${fileName}:`, err.message);
                reject(err);
            });
        });
    } catch (error) {
        console.error(`Failed to download image from ${url}:`, error.message);
        return '';
    }
}

/**
 * Fetches posts from WordPress API and maps them to our Blog model.
 * @param {string} adminId - The ID of the author admin.
 * @returns {Promise<Array>} - Array of mapped blog posts.
 */
async function fetchWpPosts(adminId) {
    console.log(`Fetching posts from ${WP_URL}...`);
    try {
        // Fetch posts with embedded data (featured images, categories, etc.)
        // We Use per_page=100 to get as many as possible in one go
        const res = await axios.get(`${WP_URL}?per_page=100&_embed`);
        const posts = [];

        console.log(`Found ${res.data.length} posts on WordPress.`);

        for (const post of res.data) {
            console.log(`Processing: ${post.title.rendered}`);

            // Get featured image URL from embedded data
            const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "";
            let localFeaturedImage = "";

            if (featuredImageUrl) {
                localFeaturedImage = await downloadImage(featuredImageUrl, post.slug);
            }

            // Map WP post fields to our Blog model
            posts.push({
                title: post.title.rendered,
                slug: post.slug,
                content: post.content.rendered,
                excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...', // Strip HTML and limit length
                category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "Uncategorized",
                featuredImage: localFeaturedImage,
                status: "published",
                author: adminId,
                createdAt: post.date,
                tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || []
            });
        }
        return posts;
    } catch (e) {
        console.error("WP API failed:", e.message);
        return [];
    }
}

/**
 * Main function to seed blogs from WordPress.
 */
async function seedBlogs() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI not found in .env file");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Find an admin user to assign as author
        const admin = await Admin.findOne();
        if (!admin) {
            console.error("No admin user found. Please create an admin user first in the dashboard.");
            process.exit(1);
        }
        const ADMIN_ID = admin._id;
        console.log(`Using Admin ID: ${ADMIN_ID} (${admin.email})`);

        const wpPosts = await fetchWpPosts(ADMIN_ID);

        if (wpPosts.length === 0) {
            console.log("No posts found to seed.");
            process.exit(0);
        }

        let seededCount = 0;
        let skippedCount = 0;

        for (const blogData of wpPosts) {
            const exists = await Blog.findOne({ slug: blogData.slug });
            if (!exists) {
                await Blog.create(blogData);
                console.log(`✅ Seeded: ${blogData.title}`);
                seededCount++;
            } else {
                console.log(`ℹ️ Skipped (already exists): ${blogData.title}`);
                skippedCount++;
            }
        }

        console.log("-----------------------------------------");
        console.log(`Seeding summary:`);
        console.log(`Successfully seeded: ${seededCount}`);
        console.log(`Skipped (duplicates): ${skippedCount}`);
        console.log("-----------------------------------------");

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seedBlogs();
