"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ASSETS } from "@/lib/assets";

const features = [
    {
        title: "Comprehensive Database",
        desc: "Access a wide range of scholarships from various sources, all in one convenient location."
    },
    {
        title: "Quality User-Friendly Platform",
        desc: "Our intuitive interface makes it easy to search for and apply to scholarships that match your qualifications and interests."
    },
    {
        title: "Personalized Support",
        desc: "Our dedicated support team is here to assist you throughout the application process and address any questions or concerns you may have."
    },
    {
        title: "Commitment To Accessibility",
        desc: "We are committed to ensuring that scholarships are accessible to students from diverse backgrounds, making higher education a reality for all."
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-slate-dark relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-12">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-sky-400 font-bold tracking-[0.3em] text-xs uppercase mb-4 block"
                            >
                                Why Choose Us
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight"
                            >
                                What We're All About
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-400 font-medium leading-relaxed mt-6 max-w-xl"
                            >
                                We are a comprehensive scholarship arena where students can find scholarships to pursue their academic careers, ranging from partial to full financial support. Stay updated with the latest scholarships through our platform.
                            </motion.p>
                        </div>

                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-900/20 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 size={16} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-lg tracking-tight mb-2 group-hover:text-sky-400 transition-colors">
                                            {feature.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-900 border-8 border-slate-800"
                        >
                            <img
                                src={ASSETS.images.aboutSection2}
                                alt="Graduating Student"
                                className="w-full h-[600px] object-cover"
                            />
                        </motion.div>

                        {/* Decorative Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/40 to-transparent pointer-events-none rounded-[3rem]" />
                    </div>
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-900/20 blur-3xl -skew-x-12 translate-x-1/2 pointer-events-none" />
        </section>
    );
}
