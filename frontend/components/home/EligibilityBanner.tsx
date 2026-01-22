"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function EligibilityBanner() {
    return (
        <section className="py-16 relative overflow-hidden">
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
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/90 text-sm font-semibold uppercase tracking-wider">
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

                        <Link href="/check-eligibility">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-brand-deep-navy font-black px-8 py-4 rounded-xl shadow-2xl shadow-yellow-500/30 transition-all duration-300 uppercase tracking-wide text-sm"
                            >
                                Check Your Worth
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Right Content - Stats/Features */}
                    <div className="flex-shrink-0 grid grid-cols-2 gap-4 lg:gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-magenta/50 transition-all group"
                        >
                            <div className="text-4xl font-black text-white mb-2 group-hover:text-brand-magenta transition-colors">₹6L</div>
                            <p className="text-white/60 text-sm font-medium">Maximum Scholarship</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-magenta/50 transition-all group"
                        >
                            <div className="text-4xl font-black text-white mb-2 group-hover:text-brand-magenta transition-colors">6+</div>
                            <p className="text-white/60 text-sm font-medium">Course Options</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-magenta/50 transition-all group"
                        >
                            <div className="text-4xl font-black text-white mb-2 group-hover:text-brand-magenta transition-colors">100%</div>
                            <p className="text-white/60 text-sm font-medium">Merit Based</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-magenta/50 transition-all group"
                        >
                            <div className="text-4xl font-black text-white mb-2 group-hover:text-brand-magenta transition-colors">2025</div>
                            <p className="text-white/60 text-sm font-medium">Scholarship Year</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
