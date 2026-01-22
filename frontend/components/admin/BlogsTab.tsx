"use client";

import { useState } from "react";
import { Plus, Trash2, Edit as EditIcon, FileText, Check, X, Image as ImageIcon } from "lucide-react";
import BlogEditor from "@/components/admin/BlogEditor";
import { api } from "@/lib/api";

export default function BlogsTab({
    blogs,
    onRefresh,
    pagination
}: {
    blogs: any[],
    onRefresh: (page?: number) => void,
    pagination?: { currentPage: number, totalPages: number, totalBlogs: number }
}) {
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        category: "General",
        status: "published",
        featuredImage: ""
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("No admin token found. Please login again.");
            return;
        }

        setIsSaving(true);

        try {
            let finalFeaturedImage = formData.featuredImage;

            // Handle image upload if a new file is selected
            if (thumbnailFile) {
                setIsUploading(true);
                try {
                    const uploadRes = await api.blogs.uploadThumbnail(thumbnailFile, token);
                    if (uploadRes.success) {
                        finalFeaturedImage = uploadRes.url;
                        console.log("Thumbnail uploaded successfully:", finalFeaturedImage);
                    }
                } catch (err: any) {
                    console.error("Upload failed:", err);
                    alert("Image upload failed, but attempting to save blog anyway.");
                } finally {
                    setIsUploading(false);
                }
            }

            const blogToSave = { ...formData, featuredImage: finalFeaturedImage };
            console.log("Saving blog with data:", blogToSave);

            if (editingBlog) {
                // Update existing blog
                await api.blogs.update(editingBlog._id, blogToSave, token);
                alert("Blog updated successfully!");
            } else {
                // Create new blog
                await api.blogs.create(blogToSave, token);
                alert("Blog published successfully!");
            }

            setEditingBlog(null);
            setIsCreating(false);
            setThumbnailFile(null);
            setThumbnailPreview(null);
            onRefresh();
        } catch (error: any) {
            console.error("Error saving blog:", error);
            alert(`Error: ${error.message || "Failed to save blog. Please try again."}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("No admin token found. Please login again.");
            return;
        }

        try {
            await api.blogs.delete(id, token);
            alert("Blog deleted successfully!");
            onRefresh();
        } catch (error: any) {
            console.error("Error deleting blog:", error);
            alert(`Error: ${error.message || "Failed to delete blog. Please try again."}`);
        }
    };

    const startEditing = (blog: any) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            excerpt: blog.excerpt,
            category: blog.category,
            status: blog.status,
            featuredImage: blog.featuredImage || ""
        });
    };

    const startCreating = () => {
        setIsCreating(true);
        setFormData({
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            category: "General",
            status: "published",
            featuredImage: ""
        });
    };

    if (editingBlog || isCreating) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
                    <button
                        onClick={() => { setEditingBlog(null); setIsCreating(false); }}
                        className="p-2 hover:bg-slate-100 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                                placeholder="Enter blog title"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                                placeholder="blog-post-slug"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                            >
                                <option value="General">General</option>
                                <option value="Scholarship">Scholarship</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block">Featured Image (Thumbnail)</label>

                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Preview */}
                            <div className="w-full md:w-64 aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group relative">
                                {thumbnailPreview || formData.featuredImage ? (
                                    <img
                                        src={thumbnailPreview || (formData.featuredImage.startsWith('http') ? formData.featuredImage : `${api.baseURL}${formData.featuredImage}`)}
                                        alt="Thumbnail Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <ImageIcon size={32} className="text-slate-300" />
                                )}
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upload New Image</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-sky-50 file:text-sky-600 hover:file:bg-sky-100 transition-all cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or Use Image URL</p>
                                    <input
                                        type="text"
                                        value={formData.featuredImage}
                                        onChange={(e) => {
                                            setFormData({ ...formData, featuredImage: e.target.value });
                                            setThumbnailPreview(null); // Clear preview when URL is manually entered? Or keep it if it's a valid image...
                                        }}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Excerpt</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={2}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20 resize-none"
                            placeholder="Short summary of the blog..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Content</label>
                        <BlogEditor
                            initialContent={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-sky-primary text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm shadow-xl shadow-sky-100 hover:bg-sky-500 transition-all disabled:opacity-50"
                    >
                        {isSaving ? 'Processing...' : (editingBlog ? 'Update Blog Post' : 'Publish Blog Post')}
                    </button>
                </form>
            </div>
        );
    }

    const handleDeleteAll = async () => {
        if (!confirm("Are you sure you want to delete ALL blogs? This action cannot be undone!")) return;
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("No admin token found. Please login again.");
            return;
        }

        try {
            await api.blogs.deleteAll(token);
            alert("Successfully deleted all blogs!");
            onRefresh();
        } catch (error: any) {
            console.error("Error deleting all blogs:", error);
            alert(`Error: ${error.message || "Failed to delete all blogs"}`);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold">Manage Blogs</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                        onClick={handleDeleteAll}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <Trash2 size={20} /> DELETE ALL BLOGS
                    </button>
                    <button
                        onClick={startCreating}
                        className="bg-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <Plus size={20} /> ADD NEW BLOG
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-600">Blog Title</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Category</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Views/Likes</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-800 line-clamp-1">{blog.title}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-3 py-1 rounded-full border border-purple-100 uppercase">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                            <span>{blog.viewCount || 0} Views</span>
                                            <span>{blog.likes || 0} Likes</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${blog.status === 'published' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-amber-50 text-amber-500 border-amber-100'
                                            }`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => startEditing(blog)}
                                                className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                                            >
                                                <EditIcon size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No blogs found. Start writing!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Admin Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mt-6">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        Showing Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalBlogs} Total Blogs)
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onRefresh(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-100"
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-1">
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => onRefresh(i + 1)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${pagination.currentPage === i + 1
                                        ? 'bg-sky-primary text-white shadow-lg shadow-sky-100'
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => onRefresh(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
