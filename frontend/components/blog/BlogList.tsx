"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { api } from "@/lib/api";

export default function BlogList({ initialBlogs }: { initialBlogs: any[] }) {
    const [blogs, setBlogs] = useState<any[]>(initialBlogs || []);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        // Poll for updates every 3 seconds
        const interval = setInterval(async () => {
            try {
                // Fetch fresh data
                // Note: api.blogs.getAll now uses cache: 'no-cache' so it fetches fresh
                const freshBlogs = await api.blogs.getAll();

                // Simple comparison to avoid re-renders if data is same (by length or ID check)
                // For now, just setting it is fine as React handles diffing
                if (JSON.stringify(freshBlogs) !== JSON.stringify(blogs)) {
                    setBlogs(freshBlogs);
                    console.log("Updated blogs list");
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [blogs]);

    if (!blogs || blogs.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-slate-400">No blogs found.</h3>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {blogs.map((blog: any, index: number) => (
                <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
        </div>
    );
}
