"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

export default function RequestCheckBanner() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="relative bg-[#0F172A] rounded-[2rem] md:rounded-[3rem] p-4 overflow-hidden shadow-2xl">
                    {/* Background Effects */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-navy/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-magenta/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
                        {/* Star-like dots using CSS */}
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'radial-gradient(white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    {/* White Frame Border */}
                    <div className="absolute inset-4 md:inset-8 border border-white/20 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none z-10"></div>

                    <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 px-6 py-8 md:px-16 md:py-12">

                        {/* Left Side: Model Image */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative w-full max-w-[400px]"
                            >
                                <img
                                    src="/images/malemodel-removebg-preview.png"
                                    alt="Scholarship Planning"
                                    className="w-full h-auto object-contain relative z-10 max-h-[300px] md:max-h-[400px] mx-auto"
                                />
                                {/* Glow behind student */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-navy/40 blur-[80px] rounded-full"></div>
                            </motion.div>
                        </div>

                        {/* Right Side: Text & CTA */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                                    Planning for <br />
                                    <span className="text-brand-magenta">MBA / PGDM?</span>
                                </h2>
                                <p className="text-indigo-100/90 text-lg md:text-xl font-medium mb-10 max-w-md mx-auto md:mx-0">
                                    Tell us your college name. We&apos;ll check scholarship options for you.
                                </p>

                                <Link href="/request-check">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        animate={{
                                            boxShadow: [
                                                "0 0 20px rgba(16, 185, 129, 0.3)",
                                                "0 0 40px rgba(16, 185, 129, 0.6)",
                                                "0 0 20px rgba(16, 185, 129, 0.3)",
                                            ],
                                        }}
                                        transition={{
                                            boxShadow: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            },
                                        }}
                                        className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-10 py-4 rounded-full text-lg shadow-xl shadow-emerald-500/20 transition-all uppercase tracking-wider relative overflow-hidden group"
                                    >
                                        {/* Shine effect on hover */}
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                        <span className="relative">Check Now</span>
                                    </motion.button>
                                </Link>

                                <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-white/40 text-xs font-bold uppercase tracking-widest">
                                    <span>Verified scholarships</span>
                                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                    <span>Free guidance</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
