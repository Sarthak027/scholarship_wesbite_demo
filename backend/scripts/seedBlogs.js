const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');
const axios = require('axios');
// Mock Admin ID or find an existing one
const ADMIN_ID = "678df8ccf3273e9790eb999a";

dotenv.config();

const WP_URL = process.env.WP_URL || ''; // e.g. https://your-site.com/wp-json/wp/v2/posts

const dummyBlogs = [
    {
        title: "Aikyashree Scholarship 2025: Apply Online, Eligibility, Last Date & Benefits",
        slug: "aikyashree-scholarship-2025",
        content: `
            <h2>What Is The Aikyashree Scholarship 2025?</h2>
            <p>The Aikyashree Scholarship 2025 is a state-level financial assistance scheme run by the West Bengal Minority Development & Finance Corporation (WBMDFC). It supports economically weaker students from minority communities including Muslim, Christian, Buddhist, Sikh, Jain, and Parsee.</p>
            
            <h3>Objectives Of Aikyashree Scholarship</h3>
            <ul>
                <li>Promote literacy among religious minority communities in West Bengal.</li>
                <li>Prevent school and college dropouts.</li>
                <li>Encourage merit-based academic performance.</li>
            </ul>

            <h3>Types Of Aikyashree Scholarships 2025</h3>
            <table border="1" style="width:100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th>Scholarship Name</th>
                        <th>Target Group</th>
                        <th>Level of Education</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pre-Matric Scholarship</td>
                        <td>Minority students</td>
                        <td>Class 1 to 10</td>
                    </tr>
                    <tr>
                        <td>Post-Matric Scholarship</td>
                        <td>Minority students</td>
                        <td>Class 11 to Ph.D.</td>
                    </tr>
                </tbody>
            </table>

            <h3>Eligibility Criteria</h3>
            <ul>
                <li>The applicant should hold permanent residency status in West Bengal.</li>
                <li>Belong to minority communities.</li>
                <li>Minimum 50% marks in the previous exam.</li>
            </ul>
        `,
        excerpt: "Learn everything about Aikyashree Scholarship 2025, including eligibility, benefits, and how to apply online.",
        category: "Government Scholarship",
        status: "published",
        author: ADMIN_ID
    }
];

async function fetchWpPosts() {
    if (!WP_URL) return [];
    console.log(`Fetching posts from ${WP_URL}...`);
    try {
        const res = await axios.get(WP_URL + "?per_page=40&_embed");
        return res.data.map(post => ({
            title: post.title.rendered,
            slug: post.slug,
            content: post.content.rendered,
            excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, ''), // Strip HTML
            category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "Uncategorized",
            featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "",
            status: "published",
            author: ADMIN_ID,
            createdAt: post.date
        }));
    } catch (e) {
        console.error("WP API failed:", e.message);
        return [];
    }
}

async function seedBlogs() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        const wpPosts = await fetchWpPosts();
        const allPosts = [...dummyBlogs, ...wpPosts];

        for (const blogData of allPosts) {
            const exists = await Blog.findOne({ slug: blogData.slug });
            if (!exists) {
                await Blog.create(blogData);
                console.log(`Seeded: ${blogData.title}`);
            } else {
                console.log(`Skipped (already exists): ${blogData.title}`);
            }
        }

        console.log("Seeding completed successfully.");
        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seedBlogs();
