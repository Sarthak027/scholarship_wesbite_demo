"use client";

import { MessageSquare, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function CommentsTab({ comments, onRefresh }: { comments: any[], onRefresh: () => void }) {
    const updateStatus = async (id: string, status: string) => {
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`http://127.0.0.1:5005/api/comments/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            onRefresh();
        } catch (error) {
            console.error("Error updating comment status:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this comment permanently?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`http://127.0.0.1:5005/api/comments/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            onRefresh();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Blog Comments</h2>

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
