"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import ScholarshipRequestForm from "@/components/shared/ScholarshipRequestForm";

export default function HomeLeadForm() {
    return (
        <section className="py-20 md:py-32 bg-brand-deep-navy relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-magenta/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-navy/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Start Your <br />
                            <span className="text-brand-magenta">Scholarship Journey</span>
                        </h2>
                        <p className="text-indigo-100/70 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 mb-8">
                            Join over 10,000+ students who have secured their future through our platform. One simple form, endless possibilities.
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-white/60">
                                {["100% Secure", "Expert Guidance", "Fast Approval"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-brand-magenta" />
                                        <span className="text-sm font-bold uppercase tracking-wider whitespace-nowrap">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-magenta to-brand-navy rounded-t-[2.5rem]"></div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-slate-900 mb-1">Scholarship Application</h3>
                                <p className="text-slate-500 text-sm">Fill your details to check eligible scholarship amounts.</p>
                            </div>

                            <ScholarshipRequestForm variant="light" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
