"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, ShieldCheck, Zap, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

export default function RequestCheckPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Side: Text & Value Prop */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        Custom Check
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
                        Didn&apos;t find <br />
                        <span className="text-brand-magenta">your college</span> <br />
                        <span className="text-brand-navy">scholarship?</span>
                    </h1>

                    <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                        Tell us your preferred colleges or course. We&apos;ll check scholarship options for you manually and get back to you.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Expert Verification</h3>
                                <p className="text-xs text-slate-500 font-medium">Manual verification of unlisted colleges</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Priority Update</h3>
                                <p className="text-xs text-slate-500 font-medium">Get notification within 48 hours</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <RequestCheckForm />
                </motion.div>
            </div>
        </div>
    );
}

function RequestCheckForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        preferredCollege: "",
        targetCourse: "",
        expectedBatch: "2025"
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5005';
            const response = await fetch(`${API_URL}/api/scholarship-check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    fullName: "",
                    phone: "",
                    email: "",
                    preferredCollege: "",
                    targetCourse: "",
                    expectedBatch: "2025"
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === "success") {
        return (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">Request Received!</h2>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    We have received your request. Our experts will check the scholarship details for your preferred college and contact you shortly.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl transition-all"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 border border-slate-100 p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-magenta to-brand-navy"></div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Scholarship Check</h2>
            <p className="text-slate-500 text-sm mb-8">Tell us where you want to go, and we&apos;ll find the funds.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Rahul Sharma"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="10-digit number"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@email.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred College/University</label>
                    <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            name="preferredCollege"
                            value={formData.preferredCollege}
                            onChange={handleChange}
                            required
                            placeholder="Which college should we check?"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Course</label>
                        <input
                            type="text"
                            name="targetCourse"
                            value={formData.targetCourse}
                            onChange={handleChange}
                            required
                            placeholder="e.g. MBA, B.Tech"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expected Batch</label>
                        <select
                            name="expectedBatch"
                            value={formData.expectedBatch}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700"
                        >
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-brand-navy hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                    {status === "submitting" ? "Submitting..." : (
                        <>
                            Start Scholarship Hunt <ArrowRight size={20} />
                        </>
                    )}
                </button>

                <p className="text-[10px] text-center text-slate-400 mt-4">
                    Our team will research and update you via WhatsApp/Email.
                </p>
            </form>
        </div>
    );
}
