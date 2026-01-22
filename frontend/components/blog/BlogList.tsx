"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { api } from "@/lib/api";

export default function BlogList({ initialData }: { initialData: { blogs: any[], totalPages: number, currentPage: number, totalBlogs: number } }) {
    const [blogs, setBlogs] = useState<any[]>(initialData.blogs || []);
    const [currentPage, setCurrentPage] = useState(initialData.currentPage || 1);
    const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPage = async (page: number) => {
        setIsLoading(true);
        try {
            const data = await api.blogs.getAll(page, 10);
            setBlogs(data.blogs);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error("Error fetching page:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Poll for updates only on the first page to avoid confusion while navigating
        if (currentPage !== 1) return;

        const interval = setInterval(async () => {
            try {
                const data = await api.blogs.getAll(1, 10);
                if (JSON.stringify(data.blogs) !== JSON.stringify(blogs)) {
                    setBlogs(data.blogs);
                    setTotalPages(data.totalPages);
                    console.log("Updated blogs list");
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [blogs, currentPage]);

    if (!blogs || blogs.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-slate-400">No blogs found.</h3>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-16">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                {blogs.map((blog: any, index: number) => (
                    <BlogCard key={blog._id} blog={blog} index={index} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => fetchPage(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-2 mx-4">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => fetchPage(i + 1)}
                                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${currentPage === i + 1
                                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-100'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => fetchPage(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
