"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function EligibilityBanner() {
    return (
        <section className="py-20 md:py-24 relative overflow-hidden mt-12 md:mt-0">
            {/* Top Solid White Separator Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/30 z-20" />

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deep-navy via-brand-navy to-brand-deep-navy" />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-navy/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
                >
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            animate={{
                                backgroundColor: [
                                    "rgba(255, 255, 255, 0.1)",
                                    "rgba(250, 204, 21, 0.4)",
                                    "rgba(255, 255, 255, 0.1)"
                                ],
                                borderColor: [
                                    "rgba(255, 255, 255, 0.2)",
                                    "rgba(250, 204, 21, 0.8)",
                                    "rgba(255, 255, 255, 0.2)"
                                ],
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    "0 0 0px rgba(250, 204, 21, 0)",
                                    "0 0 20px rgba(250, 204, 21, 0.4)",
                                    "0 0 0px rgba(250, 204, 21, 0)"
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 border transition-all shadow-xl backdrop-blur-sm"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] drop-shadow-sm">
                                Scholarship Calculator
                            </span>
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                            Check Your Eligibility <br className="hidden md:block" />
                            <span className="text-brand-magenta">For Our Scholarship</span>
                        </h2>

                        <p className="text-white/70 text-lg max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
                            Discover your potential scholarship amount based on your academic scores and entrance exam performance.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto lg:mx-0">
                            <Link href="/check-eligibility" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-brand-deep-navy font-black px-8 py-4 rounded-xl shadow-2xl shadow-yellow-500/30 transition-all duration-300 uppercase tracking-wide text-sm"
                                >
                                    Check Your Worth
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Stats/Features */}
                    <div className="flex-shrink-0 grid grid-cols-2 gap-4 lg:gap-6 w-full lg:w-auto max-w-[500px]">
                        {/* Merged Large Box */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-brand-magenta transition-all group relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles size={60} className="text-white" />
                            </div>
                            <div className="text-6xl md:text-7xl font-black text-white mb-2 group-hover:text-brand-magenta transition-all duration-500 tracking-tighter">
                                ₹6,00,000<span className="text-2xl md:text-3xl opacity-50 ml-1">*</span>
                            </div>
                            <p className="text-white/80 text-lg font-bold uppercase tracking-widest">Maximum Scholarship Available</p>
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <div className="h-1 w-12 bg-brand-magenta rounded-full" />
                                <span className="text-xs text-white/40 font-black uppercase tracking-widest">Across 6+ Course Options</span>
                                <div className="h-1 w-12 bg-brand-magenta rounded-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-magenta/50 transition-all group"
                        >
                            <div className="text-4xl font-black text-white mb-2 group-hover:text-brand-magenta transition-colors">100%</div>
                            <p className="text-white/60 text-sm font-medium uppercase tracking-wider text-center">Merit Based</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-magenta/50 transition-all group"
                        >
                            <div className="text-4xl font-black text-white mb-2 group-hover:text-brand-magenta transition-colors">2026</div>
                            <p className="text-white/60 text-sm font-medium uppercase tracking-wider text-center">Scholarship Year</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
