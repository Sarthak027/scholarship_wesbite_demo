"use client";

import { useState, useEffect } from "react";
import { Download, Search, Trash2, CheckCircle, Clock } from "lucide-react";
import * as XLSX from 'xlsx';

interface CheckRequest {
    _id: string;
    fullName: string;
    phone: string;
    email: string;
    preferredCollege: string;
    targetCourse: string;
    expectedBatch: string;
    status: 'pending' | 'checked' | 'contacted';
    createdAt: string;
}

export default function CheckRequestsTab() {
    const [requests, setRequests] = useState<CheckRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5005';

            const response = await fetch(`${API_URL}/api/scholarship-check`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(requests.map(req => ({
            "Full Name": req.fullName,
            "Phone": req.phone,
            "Email": req.email,
            "Preferred College": req.preferredCollege,
            "Target Course": req.targetCourse,
            "Expected Batch": req.expectedBatch,
            "Status": req.status,
            "Date Received": new Date(req.createdAt).toLocaleDateString()
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");
        XLSX.writeFile(workbook, "Scholarship_Check_Requests.xlsx");
    };

    const filteredRequests = requests.filter(req =>
        req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Scholarship Check Requests</h2>
                    <p className="text-slate-500 text-sm">Manage user requests for manual scholarship verification</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 w-full sm:w-64"
                        />
                    </div>
                    <button
                        onClick={handleExport}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-100"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline">Export Excel</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-600 text-sm">User Details</th>
                                <th className="px-6 py-4 font-bold text-slate-600 text-sm">Target Info</th>
                                <th className="px-6 py-4 font-bold text-slate-600 text-sm">Requested Date</th>
                                <th className="px-6 py-4 font-bold text-slate-600 text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading requests...</td></tr>
                            ) : filteredRequests.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No requests found.</td></tr>
                            ) : (
                                filteredRequests.map((req) => (
                                    <tr key={req._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900">{req.fullName}</p>
                                            <p className="text-xs text-slate-500">{req.email}</p>
                                            <p className="text-xs text-indigo-600 font-semibold">{req.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-700 text-sm mb-1">{req.preferredCollege}</p>
                                            <div className="flex gap-2">
                                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">{req.targetCourse}</span>
                                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">Batch {req.expectedBatch}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                            <br />
                                            <span className="text-xs opactiy-70">{new Date(req.createdAt).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full border border-amber-100 flex items-center gap-1 w-fit">
                                                <Clock size={12} /> Pending
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
