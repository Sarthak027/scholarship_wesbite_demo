"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import { motion } from "framer-motion";
import axios from "axios";

export default function BlogListPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5005/api/blogs");
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 pt-20">
            {/* Header */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-4 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sky-600 font-black tracking-[0.3em] text-xs uppercase mb-4 block"
                    >
                        Our Knowledge Hub
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-dark leading-tight mb-6 uppercase tracking-tight"
                    >
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">SCHOLARSHIP</span> BLOG
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 font-medium max-w-2xl mx-auto text-lg"
                    >
                        Expert advice, success stories, and latest updates on scholarships from across the globe.
                    </motion.p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
                        </div>
                    ) : blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                            {blogs.map((blog, index) => (
                                <BlogCard key={blog._id} blog={blog} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-slate-400">No blogs found.</h3>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
