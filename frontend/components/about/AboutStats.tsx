"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Students", value: "10,000+", suffix: "" },
    { label: "Colleges", value: "100+", suffix: "" },
    { label: "Great Years", value: "15+", suffix: "" },
    { label: "Satisfaction", value: "100%", suffix: "" }
];

export default function AboutStats() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="text-4xl md:text-5xl font-black text-slate-dark mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-sky-600 transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
