"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await api.inquiries.create({ ...formData, source: 'contact_page', type: 'contact' });
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Contact submit error:", error);
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop")', backgroundAttachment: 'fixed' }}
                >
                    <div className="absolute inset-0 bg-slate-900/80"></div>
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Contact Us</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 mx-auto rounded-full"></div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="container mx-auto px-4 -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ContactCard
                        icon={<MapPin size={32} />}
                        title="Location"
                        details="#305, 5th Cross, 6th Main Road, DLF New Town, Akshay Nagar, Bangalore-560076. Landmark: DLF"
                    />
                    <ContactCard
                        icon={<Mail size={32} />}
                        title="Email"
                        details="info@confirmscholarship.com"
                    />
                    <ContactCard
                        icon={<Phone size={32} />}
                        title="Phone"
                        details="+91 99570 85559"
                    />
                </div>
            </section>

            {/* Form Section */}
            <section className="container mx-auto px-4 py-24">
                <div className="flex flex-col lg:flex-row gap-16 items-start max-w-7xl mx-auto">

                    {/* Form Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 bg-slate-dark p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <h2 className="text-3xl font-bold text-white mb-2 relative z-10">Get In Touch</h2>
                        <p className="text-slate-400 mb-8 relative z-10">Fill out the form below and we will get back to you shortly.</p>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 99999 99999"
                                        required
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows={4}
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none text-white placeholder:text-slate-600"
                                ></textarea>
                            </div>

                            {status === "success" && (
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center font-bold flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    Message sent successfully!
                                </div>
                            )}

                            {status === "error" && (
                                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-center font-bold">
                                    Something went wrong. Please try again later.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full premium-gradient hover:shadow-lg hover:shadow-sky-500/30 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                            >
                                {status === "submitting" ? (
                                    <>SENDING...</>
                                ) : (
                                    <>SEND MESSAGE <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 pt-8"
                    >
                        <span className="text-sky-600 font-black tracking-[0.2em] text-xs uppercase mb-4 block">HAVE QUESTIONS?</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            If You Have Any Query, Then Drop A Message Below
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                            We're here to help you every step of the way. Whether you have questions about the application process, need more information about our courses, or require assistance with anything else, don't hesitate to reach out.
                        </p>

                        <div className="flex items-center gap-4">
                            <SocialIcon icon={<MessageCircle size={20} />} label="WhatsApp" />
                            <SocialIcon icon={<Mail size={20} />} label="Email" />
                            <SocialIcon icon={<Phone size={20} />} label="Call" />
                        </div>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}

function ContactCard({ icon, title, details }: { icon: any, title: string, details: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 text-center border border-slate-100 flex flex-col items-center h-full hover:-translate-y-2 transition-transform duration-300 group"
        >
            <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-200">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-[250px] mx-auto text-sm">
                {details}
            </p>
        </motion.div>
    );
}

function SocialIcon({ icon, label }: { icon: any, label: string }) {
    return (
        <a href="#" className="w-12 h-12 bg-white border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-sky-600 hover:text-white hover:border-sky-600 hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg hover:shadow-sky-200" title={label}>
            {icon}
        </a>
    );
}
