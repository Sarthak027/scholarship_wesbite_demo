"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle, Phone as PhoneIcon, Mail, User, MapPin, BookOpen, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";

const COURSES = [
    "B. Pharm", "B.A. LLB", "B.Arch", "B.Com", "B.Com Accounting and Finance",
    "B.Com. LLB", "B.Design", "B.Design (Fashion Designing)", "B.Design (Product Designing)",
    "B.Sc Anaesthesia Technology", "B.Sc Cardiac Care Technology", "B.Sc Imaging Technology",
    "B.Sc Neuro Science Technology", "B.Sc Operation Theater Technology", "B.Sc Perfusion Technology",
    "B.Sc Radiotherapy Technology", "B.Sc Renal Dialysis Technology", "B.Sc Respiratory Care Technology",
    "B.Tech Artificial Intelligence and Machine Learning", "B.Tech Automotive Engineering", "B.Tech Civil",
    "B.Tech Computer Science", "B.Tech CS Data Science", "B.Tech Cyber Security Engineering",
    "B.Tech Electrical", "B.Tech Mathematics and Computing", "B.Tech Mechanical", "B.Tech Robotics Engineering",
    "Bachelor of Hotel Management (BHM)", "Bachelor of Occupational Therapy (BOT)", "Bachelor of Physiotherapy (BPT)",
    "BBA", "BBA (Hospitality and Event Management)", "BBA (Hospital Management)", "BBA in Computer Application",
    "BBA Sport Management", "BPT", "D. Pharm", "B.Sc Psychology", "B.Sc Clinical Psychology", "Others"
];

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: 'callback' | 'scholarship';
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5005';
const IMAGE_URL = `${API_URL}/uploads/documents/blog_images/submissionform_image.jpeg`;

export default function EnquiryModal({ isOpen, onClose, mode = 'scholarship' }: EnquiryModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        course: "",
        consent: false,
        message: "",
        type: mode,
        source: 'enquiry_modal'
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "already_submitted" | "error">("idle");

    useEffect(() => {
        if (isOpen) {
            setStatus("idle");
            setFormData(prev => ({ ...prev, type: mode }));
        }
    }, [isOpen, mode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Consent is now implicit/informational in the design or handled differently? 
        // Screenshot implies "Your details are safe with us". 
        // But logic requires consent field if mode is scholarship? 
        // I will keep logic but maybe hide the checkbox if not in design, OR add it discreetly.
        // User screenshot shows "Connect on WhatsApp" as CTA.
        // User REQUEST text says "SUBMIT REQUEST".
        // I will keep "SUBMIT REQUEST" button.
        // I will keep consent as a small text or checkbox.

        if (mode === 'scholarship' && !formData.consent) {
            // If consent is required by backend but not in UI design, we might auto-set it or show error.
            // I'll keep the checkbox but style it minimally.
            alert("Please authorize communication to proceed.");
            return;
        }

        setStatus("submitting");

        try {
            const data = await api.inquiries.create(formData);

            if (data) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    state: "",
                    city: "",
                    course: "",
                    consent: false,
                    message: "",
                    type: mode,
                    source: 'enquiry_modal'
                });
                setTimeout(() => {
                    setStatus("idle");
                    onClose();
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white/50 hover:bg-slate-100 rounded-full transition-all z-20"
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>

                        {/* Left Side - Image */}
                        <div className="hidden md:block w-5/12 relative bg-slate-100">
                            <img
                                src={IMAGE_URL}
                                alt="Scholarship Guidance"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">

                                <div className="flex gap-4 mt-6 text-xs font-medium opacity-90">
                                    <div className="flex flex-col items-center gap-1">
                                        <ShieldCheck size={20} />
                                        <span>Verified</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <User size={20} />
                                        <span>Mentorship</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <CheckCircle size={20} />
                                        <span>Timely</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-full md:w-7/12 overflow-y-auto">
                            <div className="p-6 md:p-10 h-full flex flex-col justify-center">
                                {status === "success" ? (
                                    <div className="py-12 text-center">
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 mb-2">Request Received!</h2>
                                        <p className="text-slate-500">We will call you back shortly.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                                                {mode === 'callback' ? 'Confirm Your Call' : 'Confirm Your Scholarship'}
                                            </h2>
                                            <p className="text-slate-500 text-sm font-medium">
                                                {mode === 'callback'
                                                    ? 'Please fill in the details below to get a consultation.'
                                                    : 'Enter your details to proceed.'}
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Full Name"
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your Email"
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                                            />

                                            <div className="flex">
                                                <span className="bg-slate-50 border border-r-0 border-slate-200 rounded-l-xl px-3 py-3.5 text-slate-500 text-sm font-bold flex items-center">
                                                    +91
                                                </span>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Mobile Number"
                                                    maxLength={10}
                                                    className="w-full bg-white border border-slate-200 rounded-r-xl px-4 py-3.5 outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                                                />
                                            </div>

                                            {mode === 'scholarship' ? (
                                                <>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="State"
                                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="City"
                                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                                                        />
                                                    </div>

                                                    <select
                                                        name="course"
                                                        value={formData.course}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all text-sm font-semibold text-slate-700 text-slate-700"
                                                    >
                                                        <option value="" disabled>Course Interested In</option>
                                                        {COURSES.map(course => (
                                                            <option key={course} value={course}>{course}</option>
                                                        ))}
                                                    </select>

                                                    <div className="flex items-center gap-3 pt-2">
                                                        <input
                                                            type="checkbox"
                                                            name="consent"
                                                            id="consent"
                                                            checked={formData.consent}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-4 h-4 rounded text-brand-magenta focus:ring-brand-magenta cursor-pointer"
                                                        />
                                                        <label htmlFor="consent" className="text-xs text-slate-500 leading-tight cursor-pointer">
                                                            I authorize communication via WhatsApp/Email/Call.
                                                        </label>
                                                    </div>
                                                </>
                                            ) : (
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={3}
                                                    placeholder="Message"
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all text-sm font-semibold text-slate-700 placeholder:text-slate-400 resize-none"
                                                />
                                            )}

                                            {status === "error" && (
                                                <p className="text-rose-500 text-xs font-bold flex items-center gap-1">
                                                    <AlertCircle size={14} /> Something went wrong.
                                                </p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full bg-brand-deep-navy hover:bg-brand-navy text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 uppercase tracking-wider text-sm mt-2"
                                            >
                                                {status === "submitting" ? "Submitting..." : "SUBMIT REQUEST"}
                                                {!status.startsWith("submitting") && <Send size={16} />}
                                            </button>

                                            <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1 mt-2">
                                                <ShieldCheck size={12} /> Your details are safe with us. No spam, ever.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
