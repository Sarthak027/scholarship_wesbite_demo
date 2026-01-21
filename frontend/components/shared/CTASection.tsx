"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-0">
            <div className="container mx-auto px-4 md:px-0 max-w-none">
                <div className="relative w-full overflow-hidden min-h-[400px] flex items-center justify-center">
                    {/* Background with Image and Premium Gradient Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={ASSETS.images.student}
                            className="w-full h-full object-cover"
                            alt="Student Success"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-magenta/90" />
                    </div>

                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white/80 font-black tracking-[0.5em] text-xs md:text-sm uppercase mb-6 block"
                        >
                            Ready to take off?
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white text-3xl md:text-5xl font-black mb-10 leading-[1.2] md:leading-tight uppercase tracking-tight"
                        >
                            Start Your Journey With ConfirmScholarship Today <br className="hidden md:block" />
                            And Secure Your Future With The Right Scholarship.
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link href="/scholarships" className="inline-block bg-brand-magenta hover:bg-brand-magenta/90 text-white px-8 py-4 rounded-md font-black text-xs md:text-sm tracking-[0.3em] transition-all shadow-2xl shadow-brand-magenta/40 hover:-translate-y-1 uppercase text-center">
                                View Scholarships
                            </Link>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>
            </div>
        </section>
    );
}
