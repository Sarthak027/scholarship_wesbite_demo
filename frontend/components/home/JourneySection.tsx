"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, FileText, CheckCircle2 } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Explore Scholarships",
        desc: "Browse our extensive list of available scholarship.",
        icon: <Search size={36} />,
        gradient: "from-sky-500 to-sky-600"
    },
    {
        id: 2,
        title: "Check Eligibility",
        desc: "Review the requirements and ensure you meet the criteria.",
        icon: <UserCheck size={36} />,
        gradient: "from-cyan-500 to-cyan-600"
    },
    {
        id: 3,
        title: "Apply Online",
        desc: "Complete and submit the application form for your chosen scholarship.",
        icon: <FileText size={36} />,
        gradient: "from-blue-600 to-blue-700"
    },
    {
        id: 4,
        title: "Get Approved",
        desc: "Receive confirmation and begin your journey to success.",
        icon: <CheckCircle2 size={36} />,
        gradient: "from-rose-500 to-rose-600"
    }
];

export default function JourneySection() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-slate-dark mb-6 uppercase tracking-tight"
                    >
                        Let's Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">Your Journey</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                    >
                        <p className="text-sky-600 font-extrabold text-sm uppercase tracking-[0.4em] bg-white px-8 py-3 rounded-full shadow-sm border border-slate-100">
                            Steps To Apply
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-sky-200 -translate-y-16 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-10">
                                    <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-2xl shadow-sky-200 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 relative z-10`}>
                                        {step.icon}
                                    </div>

                                    {/* Number Badge */}
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-dark text-white rounded-2xl flex items-center justify-center font-black text-xl border-4 border-white shadow-lg z-20 group-hover:-translate-y-1 transition-transform">
                                        {step.id}
                                    </div>

                                    {/* Pulse/Glow Effect */}
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                                </div>

                                <h3 className="text-2xl font-black text-slate-dark mb-4 group-hover:text-sky-600 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[240px]">
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
