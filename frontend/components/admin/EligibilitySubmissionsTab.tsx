"use client";

import { useState, useEffect } from "react";
import { FileText, Eye, Check, Clock, X, ChevronDown } from "lucide-react";
import { api } from "@/lib/api";

interface EligibilitySubmission {
    _id: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    course: string;
    tenthMarks: number;
    twelfthMarks: number;
    graduationMarks?: number;
    entranceExam: string;
    examScore: number;
    calculatedReward: number;
    status: 'pending' | 'reviewed' | 'approved' | 'rejected';
    createdAt: string;
}

interface EligibilitySubmissionsTabProps {
    submissions: EligibilitySubmission[];
    onRefresh: () => void;
}

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    reviewed: "bg-blue-100 text-blue-700 border-blue-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-700 border-red-200"
};

const statusIcons = {
    pending: Clock,
    reviewed: Eye,
    approved: Check,
    rejected: X
};

export default function EligibilitySubmissionsTab({ submissions, onRefresh }: EligibilitySubmissionsTabProps) {
    const [selectedSubmission, setSelectedSubmission] = useState<EligibilitySubmission | null>(null);
    const [filterCourse, setFilterCourse] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Auto-refresh every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            onRefresh();
        }, 5000);
        return () => clearInterval(interval);
    }, [onRefresh]);

    const handleExport = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;
        const API_URL = api.baseURL;

        try {
            const response = await fetch(`${API_URL}/api/eligibility/export`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Eligibility_Submissions_${new Date().toISOString().split('T')[0]}.xlsx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert("Failed to export. Please check admin permissions.");
            }
        } catch (error) {
            console.error("Export error:", error);
            alert("An error occurred during export.");
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await api.eligibility.updateStatus(id, newStatus, token);
            onRefresh();
        } catch (error) {
            console.error("Status update error:", error);
            alert("Failed to update status.");
        }
    };

    const filteredSubmissions = submissions.filter(sub => {
        const courseMatch = filterCourse === "all" || sub.course === filterCourse;
        const statusMatch = filterStatus === "all" || sub.status === filterStatus;
        return courseMatch && statusMatch;
    });

    const courses = ["all", "mba", "pgdm", "btech", "bba", "bca", "mca"];
    const statuses = ["all", "pending", "reviewed", "approved", "rejected"];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Eligibility Submissions</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''} found
                    </p>
                </div>
                <button
                    onClick={handleExport}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 w-full md:w-auto"
                >
                    <FileText size={18} />
                    Export to Excel (.xlsx)
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-600">Course:</label>
                    <select
                        value={filterCourse}
                        onChange={(e) => setFilterCourse(e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        {courses.map(c => (
                            <option key={c} value={c}>
                                {c === "all" ? "All Courses" : c.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-600">Status:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        {statuses.map(s => (
                            <option key={s} value={s}>
                                {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1200px]">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-600">Contact Info</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Course</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Academic Marks</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Entrance Exam</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Reward</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Status</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Date</th>
                                <th className="px-6 py-4 font-bold text-slate-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((submission) => {
                                    const StatusIcon = statusIcons[submission.status];
                                    return (
                                        <tr key={submission._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-800">{submission.fullName}</p>
                                                <p className="text-xs text-slate-500">{submission.email}</p>
                                                <p className="text-xs text-sky-600 font-bold">{submission.mobileNumber}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-sky-50 text-sky-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-sky-100 uppercase tracking-tight">
                                                    {submission.course.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="text-slate-600"><span className="font-semibold">10th:</span> {submission.tenthMarks}%</p>
                                                    <p className="text-slate-600"><span className="font-semibold">12th:</span> {submission.twelfthMarks}%</p>
                                                    {submission.graduationMarks && (
                                                        <p className="text-slate-600"><span className="font-semibold">Grad:</span> {submission.graduationMarks}%</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-slate-700">{submission.entranceExam}</p>
                                                <p className="text-sm text-slate-500">Score: {submission.examScore}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-lg font-black text-brand-magenta">
                                                    ₹{submission.calculatedReward.toLocaleString('en-IN')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative group">
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${statusColors[submission.status]} cursor-pointer`}>
                                                        <StatusIcon size={12} />
                                                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                                        <ChevronDown size={12} />
                                                    </span>
                                                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                                                        {statuses.filter(s => s !== 'all').map(status => (
                                                            <button
                                                                key={status}
                                                                onClick={() => handleStatusUpdate(submission._id, status)}
                                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
                                                            >
                                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-xs font-medium">
                                                {new Date(submission.createdAt).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedSubmission(submission)}
                                                    className="text-sky-600 hover:text-sky-800 font-bold text-xs"
                                                >
                                                    VIEW
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No eligibility submissions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSubmission(null)}>
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Submission Details</h3>
                            <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                                <p className="text-slate-800 font-semibold">{selectedSubmission.fullName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Mobile</p>
                                    <p className="text-slate-800 font-semibold">{selectedSubmission.mobileNumber}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                                    <p className="text-slate-800 font-semibold text-sm">{selectedSubmission.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Course</p>
                                    <p className="text-slate-800 font-semibold">{selectedSubmission.course.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Entrance Exam</p>
                                    <p className="text-slate-800 font-semibold">{selectedSubmission.entranceExam}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">10th</p>
                                    <p className="text-slate-800 font-semibold">{selectedSubmission.tenthMarks}%</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">12th</p>
                                    <p className="text-slate-800 font-semibold">{selectedSubmission.twelfthMarks}%</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Graduation</p>
                                    <p className="text-slate-800 font-semibold">{selectedSubmission.graduationMarks || '-'}%</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Exam Score</p>
                                    <p className="text-slate-800 font-semibold">{selectedSubmission.examScore}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Calculated Reward</p>
                                    <p className="text-brand-magenta font-black text-lg">₹{selectedSubmission.calculatedReward.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Submitted On</p>
                                <p className="text-slate-800 font-semibold">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
