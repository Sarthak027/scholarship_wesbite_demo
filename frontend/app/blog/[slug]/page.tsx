"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Calendar, User, Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import parse from "html-react-parser";
import "@/styles/blog-content.css";

export default function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [likeCount, setLikeCount] = useState(0);
    const [newComment, setNewComment] = useState({ name: "", email: "", website: "", content: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogData = await api.blogs.getBySlug(slug);
                setBlog(blogData);
                setLikeCount(blogData.likes);

                // Fetch comments
                try {
                    const commentData = await api.comments.getByPostId(blogData._id);
                    setComments(commentData);
                } catch (commentError) {
                    console.error("Error fetching comments:", commentError);
                    // Don't fail the whole page if comments fail
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const handleLike = async () => {
        if (!blog) return;
        try {
            await api.blogs.like(blog._id);
            setLikeCount(prev => prev + 1);
        } catch (error) {
            console.error("Error liking blog:", error);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        if (!blog) return;

        try {
            await api.comments.create(blog._id, newComment);
            setSubmitMessage("Comment submitted and awaiting approval!");
            setNewComment({ name: "", email: "", website: "", content: "" });
            setTimeout(() => setSubmitMessage(""), 5000);
        } catch (error) {
            console.error("Error submitting comment:", error);
            setSubmitMessage("Failed to submit comment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600"></div>
        </div>
    );

    if (!blog) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">Blog Not Found</h1>
                <Link href="/blog" className="text-sky-600 font-bold hover:underline">Back to Blogs</Link>
            </div>
        </div>
    );

    return (
        <article className="min-h-screen bg-white pt-20">
            {/* Post Header */}
            <header className="py-20 bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors">
                        <ArrowLeft size={16} /> Back to Hub
                    </Link>

                    <div className="space-y-6">
                        <span className="inline-block bg-sky-100 text-sky-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                            {blog.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-dark leading-[1.1] uppercase tracking-tight">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 py-6 border-y border-slate-200/60">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold">
                                    C
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Author</p>
                                    <p className="text-sm font-bold text-slate-700 uppercase">ConfirmScholarship Team</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Published</p>
                                    <p className="text-sm font-bold text-slate-700 uppercase">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="container mx-auto px-4 max-w-6xl -mt-16">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-sky-900/10">
                    <img
                        src={blog.featuredImage || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop"}
                        alt={blog.title}
                        className="w-full h-auto aspect-video object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="blog-content-wrapper text-slate-600">
                    {parse(blog.content)}
                </div>

                {/* Engagement Bar */}
                <div className="mt-20 py-10 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                                <Heart size={20} className={likeCount > blog.likes ? "fill-rose-500 text-rose-500" : ""} />
                            </div>
                            <span className="font-bold">{likeCount} Likes</span>
                        </button>

                        <div className="flex items-center gap-2 text-slate-400">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                                <MessageCircle size={20} />
                            </div>
                            <span className="font-bold">{comments.length} Comments</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Comment Section (Placeholder for now) */}
                <section className="mt-20 space-y-10">
                    <h3 className="text-3xl font-black text-slate-dark uppercase tracking-tight">Leave A Reply</h3>
                    <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
                        <p className="text-slate-500 font-medium mb-8">Your email address will not be published. Required fields are marked *</p>
                        <form onSubmit={handleCommentSubmit} className="space-y-6">
                            {submitMessage && (
                                <div className={`p-4 rounded-xl text-sm font-bold uppercase tracking-widest ${submitMessage.includes('approval') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {submitMessage}
                                </div>
                            )}
                            <textarea
                                placeholder="Comment *"
                                value={newComment.content}
                                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                                required
                                className="w-full bg-white border border-slate-200 rounded-2xl p-6 h-40 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                            ></textarea>
                            <div className="grid md:grid-cols-3 gap-6">
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    value={newComment.name}
                                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                />
                                <input
                                    type="email"
                                    placeholder="Email *"
                                    value={newComment.email}
                                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                />
                                <input
                                    type="text"
                                    placeholder="Website"
                                    value={newComment.website}
                                    onChange={(e) => setNewComment({ ...newComment, website: e.target.value })}
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-rose-600 text-white font-black px-10 py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-rose-700 transition-all shadow-lg shadow-rose-900/10 disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Post Comment'}
                            </button>
                        </form>
                    </div>

                    {/* Display Comments */}
                    <div className="space-y-8 mt-16">
                        {comments.map((comment) => (
                            <div key={comment._id} className="flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-sky-600 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                                    {comment.name[0]}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-slate-800 uppercase tracking-wider">{comment.name}</h4>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed font-medium">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </article>
    );
}
