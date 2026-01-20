"use client";

import { useState } from "react";
import { Plus, Trash2, Edit as EditIcon, FileText, Check, X } from "lucide-react";
import BlogEditor from "@/components/admin/BlogEditor";

export default function BlogsTab({ blogs, onRefresh }: { blogs: any[], onRefresh: () => void }) {
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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("No admin token found. Please login again.");
            return;
        }

        const method = editingBlog ? 'PATCH' : 'POST';
        const url = editingBlog
            ? `http://127.0.0.1:5005/api/blogs/${editingBlog._id}`
            : `http://127.0.0.1:5005/api/blogs`;

        setIsSaving(true);
        console.log("Saving blog with data:", formData);

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                alert(editingBlog ? "Blog updated successfully!" : "Blog published successfully!");
                setEditingBlog(null);
                setIsCreating(false);
                onRefresh();
            } else {
                const text = await res.text();
                console.error("Save failed response:", text);
                try {
                    const data = JSON.parse(text);
                    alert(`Error: ${data.message || "Failed to save blog"}`);
                } catch (e) {
                    alert(`Server Error (${res.status}): The server returned an unexpected package. Please check backend console.`);
                }
            }
        } catch (error: any) {
            console.error("Error saving blog:", error);
            alert(`Network Error: ${error.message}. Please check if the backend is running on port 5005.`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`http://127.0.0.1:5005/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            onRefresh();
        } catch (error) {
            console.error("Error deleting blog:", error);
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

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Featured Image URL</label>
                        <input
                            type="text"
                            value={formData.featuredImage}
                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                            placeholder="https://images.unsplash.com/..."
                        />
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Manage Blogs</h2>
                <button
                    onClick={startCreating}
                    className="bg-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all flex items-center gap-2"
                >
                    <Plus size={20} /> ADD NEW BLOG
                </button>
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
        </div>
    );
}
