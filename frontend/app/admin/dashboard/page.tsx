"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    GraduationCap,
    MessageSquare,
    LogOut,
    Users,
    ChevronRight,
    Search,
    Bell,
    FileText,
    MessageSquare as MessageIcon,
    Plus,
    Trash2,
    Edit as EditIcon,
    Check,
    Mail,
    Menu,
    X
} from "lucide-react";
import BlogEditor from "@/components/admin/BlogEditor";
import "@/styles/editor.css";
import BlogsTab from "@/components/admin/BlogsTab";
import CommentsTab from "@/components/admin/CommentsTab";
import { api } from "@/lib/api";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scholarships, setScholarships] = useState<any[]>([]);
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const fetchDashboardData = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            const [scholarshipData, inquiryData, blogData, commentData] = await Promise.all([
                api.scholarships.getAll(),
                api.inquiries.getAll(token),
                api.blogs.getAllAdmin(token),
                api.comments.getAll(token)
            ]);

            setScholarships(Array.isArray(scholarshipData) ? scholarshipData : []);
            setInquiries(Array.isArray(inquiryData) ? inquiryData : []);
            setBlogs(Array.isArray(blogData) ? blogData : []);
            setComments(Array.isArray(commentData) ? commentData : []);
            setLoading(false);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/admin/login");
        } else {
            setIsLoggedIn(true);
            fetchDashboardData();
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex relative">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                        CONFIRM ADMIN
                    </h2>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-rose-500">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-grow px-4 space-y-2 overflow-y-auto">
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        label="Overview"
                        active={activeTab === "overview"}
                        onClick={() => { setActiveTab("overview"); setSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<GraduationCap size={20} />}
                        label="Scholarships"
                        active={activeTab === "scholarships"}
                        onClick={() => { setActiveTab("scholarships"); setSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<MessageSquare size={20} />}
                        label="App Inquiries"
                        active={activeTab === "inquiries"}
                        onClick={() => { setActiveTab("inquiries"); setSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<Mail size={20} />}
                        label="Contact Us"
                        active={activeTab === "contact_us"}
                        onClick={() => { setActiveTab("contact_us"); setSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<FileText size={20} />}
                        label="Blogs"
                        active={activeTab === "blogs"}
                        onClick={() => { setActiveTab("blogs"); setSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<MessageIcon size={20} />}
                        label="Comments"
                        active={activeTab === "comments"}
                        onClick={() => { setActiveTab("comments"); setSidebarOpen(false); }}
                    />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden w-full lg:ml-64 transition-all duration-300">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between flex-shrink-0 gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="relative flex-1 max-w-md hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 ml-auto">
                        <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-4 md:p-8 overflow-y-auto flex-grow">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === "overview" && (
                                <OverviewTab
                                    stats={{
                                        scholarships: scholarships.length,
                                        inquiries: inquiries.length,
                                        newInquiries: inquiries.filter(i => i.status === 'new').length,
                                        blogs: blogs.length
                                    }}
                                    recentInquiries={inquiries.slice(0, 5)}
                                />
                            )}
                            {activeTab === "scholarships" && <ScholarshipsTab scholarships={scholarships} />}
                            {activeTab === "inquiries" && (
                                <InquiriesTab
                                    title="App Inquiries"
                                    inquiries={inquiries.filter(i => i.source === 'enquiry_modal' || !i.source)}
                                    onRefresh={fetchDashboardData}
                                />
                            )}
                            {activeTab === "contact_us" && (
                                <InquiriesTab
                                    title="Contact Us Messages"
                                    inquiries={inquiries.filter(i => i.source === 'contact_page')}
                                    onRefresh={fetchDashboardData}
                                />
                            )}
                            {activeTab === "blogs" && (
                                <BlogsTab
                                    blogs={blogs}
                                    onRefresh={fetchDashboardData}
                                />
                            )}
                            {activeTab === "comments" && (
                                <CommentsTab
                                    comments={comments}
                                    onRefresh={fetchDashboardData}
                                />
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${active
                ? "bg-sky-primary text-white shadow-lg shadow-sky-100"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-semibold">{label}</span>
            </div>
            {active && <ChevronRight size={16} />}
        </button>
    );
}

function OverviewTab({ stats, recentInquiries }: { stats: any, recentInquiries: any[] }) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm md:text-lg">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="text-left md:text-right">
                    <p className="text-slate-400 text-sm font-medium">SYSTEM STATUS</p>
                    <p className="text-emerald-500 font-bold flex items-center md:justify-end gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Healthy
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard label="Total Blogs" value={stats.blogs?.toString() || "0"} change="Knowledge Hub" color="bg-purple-600" />
                <StatCard label="Total Scholarship" value={stats.scholarships.toString()} change="Active now" color="bg-blue-500" />
                <StatCard label="Total Inquiries" value={stats.inquiries.toString()} change="All time" color="bg-cyan-500" />
            </div>

            <div className="bg-white rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg md:text-xl font-bold">Recent Inquiries</h3>
                    <button className="text-sky-600 font-semibold text-sm hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                    {recentInquiries.length > 0 ? (
                        recentInquiries.map((inquiry) => (
                            <ActivityItem
                                key={inquiry._id}
                                label={`New request from ${inquiry.name}`}
                                time={new Date(inquiry.createdAt).toLocaleDateString()}
                                type="inquiry"
                            />
                        ))
                    ) : (
                        <p className="text-slate-400 text-center py-4">No recent inquiries found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, change, color }: { label: string, value: string, change: string, color: string }) {
    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-slate-500 font-semibold mb-2 text-sm">{label}</p>
            <h4 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{value}</h4>
            <div className="flex items-center gap-2">
                <span className={`${color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>Live</span>
                <span className="text-slate-400 text-sm">{change}</span>
            </div>
        </div>
    );
}

function ActivityItem({ label, time, type }: { label: string, time: string, type: string }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:px-2 transition-all rounded-lg hover:bg-slate-50">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center ${type === 'inquiry' ? 'bg-sky-100 text-sky-600' :
                    type === 'update' ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                    {type === 'inquiry' ? <MessageSquare size={18} /> :
                        type === 'update' ? <GraduationCap size={18} /> : <Users size={18} />}
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">{label}</p>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">{time}</p>
                </div>
            </div>
            <button className="text-slate-400 hover:text-sky-500 transition-colors">
                <ChevronRight size={20} />
            </button>
        </div>
    );
}

function ScholarshipsTab({ scholarships }: { scholarships: any[] }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Manage Scholarships</h2>
                <button className="bg-sky-primary text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all flex items-center gap-2 text-sm w-full md:w-auto justify-center">
                    + ADD NEW
                </button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-600">Scholarship Name</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Category</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Amount</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Status</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {scholarships.length > 0 ? (
                                scholarships.map((scholarship) => (
                                    <tr key={scholarship._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{scholarship.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-3 py-1 rounded-full border border-sky-100 uppercase tracking-wider">{scholarship.category}</span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-600">{scholarship.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold flex items-center gap-2 ${scholarship.isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${scholarship.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                                {scholarship.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-slate-400 hover:text-sky-500 font-bold transition-colors">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No scholarships found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function InquiriesTab({ title, inquiries, onRefresh }: { title: string, inquiries: any[], onRefresh: () => void }) {
    // Auto-refresh every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            onRefresh();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                <button
                    onClick={() => {
                        const headers = ["Name", "Email", "Phone", "Message", "Date"];
                        const csvContent = [
                            headers.join(","),
                            ...inquiries.map(i => [
                                i.name,
                                i.email,
                                i.phone,
                                `"${i.message.replace(/"/g, '""')}"`,
                                new Date(i.createdAt).toLocaleDateString()
                            ].join(","))
                        ].join("\n");

                        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        const link = document.createElement("a");
                        const url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", `inquiries_export_${new Date().toISOString().split('T')[0]}.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 w-full md:w-auto"
                >
                    <FileText size={18} /> Export to Excel
                </button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-600">Contact Info</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Message</th>
                                <th className="px-6 py-4 font-bold text-slate-600">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {inquiries.length > 0 ? (
                                inquiries.map((inquiry) => (
                                    <tr key={inquiry._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-800">{inquiry.name}</p>
                                            <p className="text-xs text-slate-500">{inquiry.email}</p>
                                            <p className="text-xs text-slate-500 font-semibold">{inquiry.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-600 text-sm font-medium line-clamp-3 max-w-lg">{inquiry.message}</p>
                                            <p className="text-xs text-slate-400 mt-1 font-semibold">{inquiry.subject}</p>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm font-medium">
                                            {new Date(inquiry.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-slate-400 font-medium">No inquiries found yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
