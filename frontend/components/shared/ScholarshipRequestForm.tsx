"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, GraduationCap, ArrowRight } from "lucide-react";

interface ScholarshipRequestFormProps {
    variant?: "light" | "dark" | "glass";
    onSuccess?: () => void;
}

export default function ScholarshipRequestForm({ variant = "light", onSuccess }: ScholarshipRequestFormProps) {
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
                if (onSuccess) onSuccess();
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
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[400px] ${variant === 'glass' ? 'bg-white/10 text-white' : 'bg-white text-slate-900 border border-slate-100 shadow-xl'
                    }`}
            >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-bounce ${variant === 'glass' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-black mb-2">Request Received!</h3>
                <p className={`mb-8 max-w-sm mx-auto text-sm ${variant === 'glass' ? 'text-white/70' : 'text-slate-500'}`}>
                    We'll check scholarship options for your preferred college and contact you shortly.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className={`font-bold py-3 px-8 rounded-xl transition-all ${variant === 'glass' ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                >
                    Submit Another Request
                </button>
            </motion.div>
        );
    }

    const inputClasses = variant === 'glass'
        ? "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-magenta transition-all font-semibold text-white placeholder:text-white/40"
        : "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-700 placeholder:text-slate-400";

    const labelClasses = `block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${variant === 'glass' ? 'text-white/60' : 'text-slate-500'}`;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Rahul Sharma"
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="10-digit number"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div>
                <label className={labelClasses}>Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@email.com"
                    className={inputClasses}
                />
            </div>

            <div>
                <label className={labelClasses}>Preferred College/University</label>
                <div className="relative">
                    <GraduationCap className={`absolute left-4 top-1/2 -translate-y-1/2 ${variant === 'glass' ? 'text-white/30' : 'text-slate-400'}`} size={18} />
                    <input
                        type="text"
                        name="preferredCollege"
                        value={formData.preferredCollege}
                        onChange={handleChange}
                        required
                        placeholder="Which college should we check?"
                        className={`${inputClasses} ${variant === 'glass' ? 'pl-11' : 'pl-11'}`}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>Target Course</label>
                    <input
                        type="text"
                        name="targetCourse"
                        value={formData.targetCourse}
                        onChange={handleChange}
                        required
                        placeholder="e.g. MBA, B.Tech"
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label className={labelClasses}>Expected Batch</label>
                    <select
                        name="expectedBatch"
                        value={formData.expectedBatch}
                        onChange={handleChange}
                        className={inputClasses}
                    >
                        {["2024", "2025", "2026", "2027", "2028"].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full font-black py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-sm ${variant === 'glass'
                    ? 'bg-brand-magenta hover:bg-brand-magenta/90 text-white'
                    : 'bg-brand-navy hover:bg-brand-deep-navy text-white shadow-brand-navy/20'
                    }`}
            >
                {status === "submitting" ? "Submitting..." : (
                    <>
                        Start Scholarship Hunt <ArrowRight size={18} />
                    </>
                )}
            </button>
        </form>
    );
}
