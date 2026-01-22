"use client";

import { MessageSquare, Trash2, CheckCircle, XCircle } from "lucide-react";

import { api } from "@/lib/api";

export default function CommentsTab({ comments, onRefresh }: { comments: any[], onRefresh: () => void }) {
    const updateStatus = async (id: string, status: string) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await api.comments.updateStatus(id, status, token);
            onRefresh();
        } catch (error) {
            console.error("Error updating comment status:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this comment permanently?")) return;
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await api.comments.delete(id, token);
            onRefresh();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleDeleteAll = async () => {
        if (!confirm("Are you sure you want to delete ALL comments? This action cannot be undone!")) return;
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("No admin token found. Please login again.");
            return;
        }
        
        try {
            await api.comments.deleteAll(token);
            alert("Successfully deleted all comments!");
            onRefresh();
        } catch (error: any) {
            console.error("Error deleting all comments:", error);
            alert(`Error: ${error.message || "Failed to delete all comments"}`);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold">Blog Comments</h2>
                <button
                    onClick={handleDeleteAll}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all flex items-center justify-center gap-2 w-full md:w-auto"
                >
                    <Trash2 size={20} /> DELETE ALL COMMENTS
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-600">User</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Comment</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Blog Post</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <tr key={comment._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-800">{comment.name}</p>
                                        <p className="text-xs text-slate-500">{comment.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-600 text-sm font-medium line-clamp-2 max-w-xs">{comment.content}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-bold text-sky-600 uppercase tracking-wider line-clamp-1">
                                            {comment.blogPost?.title || "Unknown Post"}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${comment.status === 'approved' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' :
                                            comment.status === 'pending' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                                                'bg-rose-50 text-rose-500 border-rose-100'
                                            }`}>
                                            {comment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {comment.status === 'pending' && (
                                                <button
                                                    onClick={() => updateStatus(comment._id, 'approved')}
                                                    className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                                    title="Approve"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(comment._id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No comments to moderate.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
