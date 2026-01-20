"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle, Phone as PhoneIcon, Mail, User, MessageSquare } from "lucide-react";

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "General Enquiry"
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "already_submitted" | "error">("idle");

    useEffect(() => {
        if (isOpen) {
            setStatus("idle");
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch("http://127.0.0.1:5005/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, source: 'enquiry_modal' }),
            });

            if (response.ok) {
                setStatus("success");
                // Reset form
                setFormData({ name: "", email: "", phone: "", message: "", subject: "General Enquiry" });
                // Auto close after 3 seconds on success
                setTimeout(() => {
                    setStatus("idle"); // allow submitting again
                    onClose();
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-10"
                        >
                            <X size={20} />
                        </button>

                        {status === "success" ? (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Request Received!</h2>
                                <p className="text-slate-500">We will call you back shortly. Thank you for your interest.</p>
                            </div>
                        ) : (
                            <div className="p-8 md:p-10">
                                <div className="mb-8 font-montserrat">
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 uppercase tracking-tight">Request a Call</h2>
                                    <p className="text-slate-500 font-medium">Please fill in the details below to get a scholarship consultation.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your Name"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate- dark"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your Email"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-dark"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                            <PhoneIcon size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="Phone Number"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-dark"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                            <MessageSquare size={18} />
                                        </div>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            placeholder="Message"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-dark resize-none"
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-rose-500 text-sm font-bold bg-rose-50 p-3 rounded-xl border border-rose-100">
                                            Failed to submit. Please try again.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full bg-sky-primary hover:bg-sky-500 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-sky-100 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 tracking-widest uppercase text-sm"
                                    >
                                        {status === "submitting" ? (
                                            "SUBMITTING..."
                                        ) : (
                                            <>
                                                SUBMIT REQUEST <Send size={16} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
