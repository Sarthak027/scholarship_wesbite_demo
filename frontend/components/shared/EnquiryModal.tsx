"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle, Phone as PhoneIcon, Mail, User, MessageSquare, MapPin, BookOpen, ShieldCheck } from "lucide-react";

import { api } from "@/lib/api";

const COURSES = [
    "B. Pharm",
    "B.A. LLB",
    "B.Arch",
    "B.Com",
    "B.Com Accounting and Finance",
    "B.Com. LLB",
    "B.Design",
    "B.Design (Fashion Designing)",
    "B.Design (Product Designing)",
    "B.Sc Anaesthesia Technology",
    "B.Sc Cardiac Care Technology",
    "B.Sc Imaging Technology",
    "B.Sc Neuro Science Technology",
    "B.Sc Operation Theater Technology",
    "B.Sc Perfusion Technology",
    "B.Sc Radiotherapy Technology",
    "B.Sc Renal Dialysis Technology",
    "B.Sc Respiratory Care Technology",
    "B.Tech Artificial Intelligence and Machine Learning",
    "B.Tech Automotive Engineering",
    "B.Tech Civil",
    "B.Tech Computer Science",
    "B.Tech CS Data Science",
    "B.Tech Cyber Security Engineering",
    "B.Tech Electrical",
    "B.Tech Mathematics and Computing",
    "B.Tech Mechanical",
    "B.Tech Robotics Engineering",
    "Bachelor of Hotel Management (BHM)",
    "Bachelor of Occupational Therapy (BOT)",
    "Bachelor of Physiotherapy (BPT)",
    "BBA",
    "BBA (Hospitality and Event Management)",
    "BBA (Hospital Management)",
    "BBA in Computer Application",
    "BBA Sport Management",
    "BPT",
    "D. Pharm",
    "B.Sc Psychology",
    "B.Sc Clinical Psychology",
    "Others"
];

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: 'callback' | 'scholarship';
}

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
        if (mode === 'scholarship' && !formData.consent) {
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
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[95vw] md:max-w-xl bg-white rounded-xl md:rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col mx-2"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="overflow-y-auto p-6 md:p-8 lg:p-10">
                            {status === "success" ? (
                                <div className="py-8 md:py-12 text-center">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                        <CheckCircle size={32} className="md:w-10 md:h-10" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Request Received!</h2>
                                    <p className="text-sm md:text-base text-slate-500">We will call you back shortly. Thank you for your interest.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 md:mb-8 font-montserrat">
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-2 uppercase tracking-tight">
                                            {mode === 'callback' ? 'Request a Call' : 'Enquiry Form'}
                                        </h2>
                                        <p className="text-sm md:text-base text-slate-500 font-medium whitespace-pre-line">
                                            {mode === 'callback'
                                                ? 'Please fill in the details below to get a scholarship consultation.'
                                                : 'Get expert guidance for your career path.'}
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            <div className="relative group">
                                                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                    <User size={16} className="md:w-[18px] md:h-[18px]" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your Name"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-800 text-sm md:text-base min-h-[44px]"
                                                />
                                            </div>

                                            <div className="relative group">
                                                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                    <Mail size={16} className="md:w-[18px] md:h-[18px]" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your Email"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-800 text-sm md:text-base min-h-[44px]"
                                                />
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                <PhoneIcon size={16} className="md:w-[18px] md:h-[18px]" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="Phone Number"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-800 text-sm md:text-base min-h-[44px]"
                                            />
                                        </div>

                                        {mode === 'scholarship' ? (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                                    <div className="relative group">
                                                        <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                            <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Enter State"
                                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-800 text-sm md:text-base min-h-[44px]"
                                                        />
                                                    </div>

                                                    <div className="relative group">
                                                        <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                            <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Enter City"
                                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-800 text-sm md:text-base min-h-[44px]"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="relative group">
                                                    <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                        <BookOpen size={16} className="md:w-[18px] md:h-[18px]" />
                                                    </div>
                                                    <select
                                                        name="course"
                                                        value={formData.course}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-800 text-sm md:text-base appearance-none min-h-[44px]"
                                                    >
                                                        <option value="" disabled>Select Course</option>
                                                        {COURSES.map(course => (
                                                            <option key={course} value={course}>{course}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-sky-50 rounded-xl md:rounded-2xl border border-sky-100">
                                                    <div className="pt-1">
                                                        <input
                                                            type="checkbox"
                                                            name="consent"
                                                            id="consent"
                                                            checked={formData.consent}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-5 h-5 rounded border-sky-200 text-sky-600 focus:ring-sky-500 transition-all cursor-pointer"
                                                        />
                                                    </div>
                                                    <label htmlFor="consent" className="text-xs font-semibold text-slate-600 leading-normal cursor-pointer select-none">
                                                        I authorize <span className="text-sky-600">confirmscholarship</span> to contact me with notifications/updates via E-Mail/SMS/Whatsapp/Call
                                                    </label>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="relative group">
                                                <div className="absolute left-3 md:left-4 top-4 md:top-5 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                    <MessageSquare size={16} className="md:w-[18px] md:h-[18px]" />
                                                </div>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={4}
                                                    placeholder="Message"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-800 text-sm md:text-base resize-none min-h-[120px]"
                                                />
                                            </div>
                                        )}

                                        {status === "error" && (
                                            <p className="text-rose-500 text-xs md:text-sm font-bold bg-rose-50 p-3 rounded-xl border border-rose-100 flex items-center gap-2">
                                                <AlertCircle size={14} className="md:w-4 md:h-4" /> Failed to submit. Please try again.
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-sky-100 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 md:gap-3 tracking-widest uppercase text-xs md:text-sm min-h-[44px]"
                                        >
                                            {status === "submitting" ? (
                                                "SUBMITTING..."
                                            ) : (
                                                <>
                                                    SUBMIT REQUEST <Send size={14} className="md:w-4 md:h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
