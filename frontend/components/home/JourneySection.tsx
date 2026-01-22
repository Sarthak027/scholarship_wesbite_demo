"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, FileText, CheckCircle2 } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Explore Scholarships",
        desc: "Browse our extensive list of available scholarships.",
        icon: <Search size={36} />,
        gradient: "from-brand-magenta to-brand-magenta/80"
    },
    {
        id: 2,
        title: "Check Eligibility",
        desc: "Review the requirements and ensure you meet the criteria.",
        icon: <UserCheck size={36} />,
        gradient: "from-brand-navy to-brand-navy/80"
    },
    {
        id: 3,
        title: "Apply Online",
        desc: "Complete and submit the application form for your chosen scholarship.",
        icon: <FileText size={36} />,
        gradient: "from-brand-deep-navy to-brand-deep-navy/80"
    },
    {
        id: 4,
        title: "Get Approved",
        desc: "Receive confirmation and begin your journey to success.",
        icon: <CheckCircle2 size={36} />,
        gradient: "from-brand-magenta to-brand-magenta/80"
    }
];

export default function JourneySection() {
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-brand-magenta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-brand-navy/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-navy mb-4 md:mb-6 uppercase tracking-tight"
                    >
                        Let's Start <span className="text-brand-magenta">Your Journey</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                    >
                        <p className="text-brand-navy font-extrabold text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] bg-white px-6 md:px-8 py-2 md:py-3 rounded-full shadow-sm border border-brand-magenta/20">
                            Steps To Apply
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-brand-navy/10 -translate-y-16 z-0" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-6 md:mb-10">
                                    <div className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl md:rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-2xl shadow-brand-navy/10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 relative z-10`}>
                                        <div className="scale-75 md:scale-100">
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Number Badge */}
                                    <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-brand-navy text-white rounded-xl md:rounded-2xl flex items-center justify-center font-black text-base md:text-xl border-4 border-white shadow-lg z-20 group-hover:-translate-y-1 transition-transform">
                                        {step.id}
                                    </div>

                                    {/* Pulse/Glow Effect */}
                                    <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r ${step.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                                </div>

                                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-brand-navy mb-3 md:mb-4 group-hover:text-brand-magenta transition-colors tracking-tight uppercase">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-[240px]">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
