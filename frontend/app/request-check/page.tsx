"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, GraduationCap, ArrowRight } from "lucide-react";
import ScholarshipRequestForm from "@/components/shared/ScholarshipRequestForm";

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
                    <div className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-deep-navy rounded-3xl shadow-2xl shadow-brand-navy/30 border border-white/10 p-6 md:p-10 relative overflow-hidden">
                        {/* Decorative background sparks */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-magenta/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white mb-2">Request Scholarship Check</h2>
                            <p className="text-white/70 text-sm mb-8 font-medium">Tell us where you want to go, and we&apos;ll find the funds.</p>

                            <ScholarshipRequestForm variant="dark" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
