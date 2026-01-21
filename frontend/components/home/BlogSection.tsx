"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
    {
        title: "Odisha Scholarship Guide 2025-26",
        excerpt: "Odisha Scholarship portal Guide 2025-26: Eligibility, Portal Steps, and Tips to Avoid Rejection.",
        date: "January 3, 2026",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop", // Studying
    },
    {
        title: "Dr Ambedkar Scholarship: A Complete Guide",
        excerpt: "Introduction to Dr Ambedkar Scholarship. Education is the backbone of personal growth and national development.",
        date: "December 22, 2025",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop", // Books
    },
    {
        title: "Post Matric Scholarship For Students",
        excerpt: "Post Matric Scholarship: Complete Guide, Eligibility, Application Process, Benefits & Latest Updates.",
        date: "December 10, 2025",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop", // Graduation
    },
];

export default function BlogSection() {
    return (
        <section className="py-20 bg-white" id="blog">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div>
                        <h2 className="text-brand-magenta font-extrabold text-sm uppercase tracking-[0.3em] mb-4 bg-brand-magenta/5 inline-block px-6 py-2 rounded-full">
                            Latest Updates
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight">
                            Recent News & <span className="text-brand-magenta">Blogs</span>
                        </h3>
                    </div>
                    <Link href="#" className="flex items-center gap-3 text-brand-magenta font-bold hover:text-brand-magenta/80 hover:gap-4 transition-all duration-300 group">
                        View All Posts <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.title} className="group cursor-pointer">
                            <div className="h-64 rounded-xl overflow-hidden mb-6 relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <div className="p-2">
                                <div className="text-xs text-slate-400 mb-4 font-bold tracking-widest uppercase flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-slate-200"></span>
                                    {post.date}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-dark mb-4 group-hover:text-brand-magenta transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-brand-navy font-extrabold text-sm group/btn cursor-pointer">
                                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-magenta after:transform after:scale-x-0 group-hover/btn:after:scale-x-100 after:transition-transform after:origin-right group-hover/btn:after:origin-left">
                                        Read Full Article
                                    </span>
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
