"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
    { label: "Students", value: 10000, suffix: "+" },
    { label: "Colleges", value: 100, suffix: "+" },
    { label: "Great Years", value: 15, suffix: "+" },
    { label: "Satisfaction", value: 100, suffix: "%" }
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        return Math.round(latest).toLocaleString();
    });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, {
                duration: 2,
                ease: "easeOut"
            });
            return controls.stop;
        }
    }, [isInView, count, value]);

    return (
        <div ref={ref} className="text-4xl md:text-5xl font-black text-slate-dark mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-500">
            <motion.span>{rounded}</motion.span>{suffix}
        </div>
    );
}

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
                            <Counter value={stat.value} suffix={stat.suffix} />
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
