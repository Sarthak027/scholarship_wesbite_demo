"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, ArrowRight, MessageCircle } from "lucide-react";
import { api } from "@/lib/api";

interface BlogCardProps {
    blog: {
        _id: string;
        title: string;
        slug: string;
        excerpt: string;
        featuredImage: string;
        category: string;
        createdAt: string;
        likes: number;
    };
    index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
    const imageUrl = blog.featuredImage
        ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : `${api.baseURL}${blog.featuredImage}`)
        : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group flex flex-col h-full"
        >
            {/* Image section */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-sky-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        {blog.category}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content section */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-sky-500" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                </div>

                <h3 className="text-xl font-black text-slate-dark mb-4 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight">
                    {blog.title}
                </h3>

                <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <Link
                        href={`/blog/${blog.slug}`}
                        className="flex items-center gap-2 text-sky-600 font-black text-xs uppercase tracking-widest group/link"
                    >
                        Read More
                        <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <div className="flex items-center gap-3 text-slate-400">
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                            <MessageCircle size={14} />
                            <span>12</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
