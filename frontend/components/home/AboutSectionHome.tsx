"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSectionHome() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Images Side */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-navy/10"
                        >
                            <img
                                src={ASSETS.images.aboutHome}
                                alt="About ConfirmScholarship"
                                className="w-full h-auto"
                            />
                        </motion.div>

                        {/* Overlapping Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-10 -right-6 z-20 bg-brand-navy text-white p-8 rounded-[2rem] shadow-2xl shadow-brand-navy/20 max-w-[200px]"
                        >
                            <div className="font-black text-4xl mb-1">20+</div>
                            <div className="text-xs font-bold uppercase tracking-widest opacity-80 leading-tight">
                                Years Of Experience
                            </div>
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-navy/5 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-brand-magenta font-black tracking-[0.3em] text-xs uppercase mb-4 block"
                            >
                                About Us
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-black text-slate-dark leading-[1.2] mb-6 uppercase tracking-tight"
                            >
                                Empowering Dreams: The <br />
                                <span className="text-brand-navy">ConfirmScholarship</span> Mission
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 font-medium leading-relaxed"
                        >
                            ConfirmScholarship is an online platform dedicated to assisting aspiring students in pursuing their dream careers in various fields of interest. We strive to consolidate all scholarships under one roof, easing financial burdens and making higher education accessible to everyone. By integrating the latest technology, we aim to provide scholarships for all courses, making ConfirmScholarship the ultimate Runway4Success.
                        </motion.p>

                        <div className="grid md:grid-cols-2 gap-8 py-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta flex-shrink-0">
                                    <ArrowRight size={18} />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-dark text-sm uppercase mb-1">From 10% To 100%</h4>
                                    <p className="text-slate-400 text-xs font-medium">Find the perfect scholarship to suit your needs.</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta flex-shrink-0">
                                    <ArrowRight size={18} />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-dark text-sm uppercase mb-1">Top Institutes</h4>
                                    <p className="text-slate-400 text-xs font-medium">Partnered with the best colleges and institutes across India.</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link
                                href="/about"
                                className="inline-block bg-brand-magenta hover:bg-brand-magenta/90 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-brand-magenta/20 active:scale-95"
                            >
                                Read More
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
