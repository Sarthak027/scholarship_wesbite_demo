"use client";

import { motion } from "framer-motion";

const steps = [
    {
        id: "01",
        title: "Scholarships For All Types Of Talent",
        description: "Whether you are into sports, academics, or arts, we have something for you.",
        bgColor: "bg-sky-500",
    },
    {
        id: "02",
        title: "Partnered With Top Universities",
        description: "We work with leading institutions to bring you exclusive opportunities.",
        bgColor: "bg-cyan-500",
    },
    {
        id: "03",
        title: "Personalized Career Guidance",
        description: "Get expert advice to choose the right path for your future.",
        bgColor: "bg-sky-600",
    },
];

export default function StatsSection() {
    return (
        <section className="relative z-30 -mt-20 md:-mt-28 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 shadow-2xl rounded-3xl overflow-hidden">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.8,
                                ease: [0.21, 1.11, 0.81, 0.99] // Bouncy ease
                            }}
                            className={`${step.bgColor} text-white p-8 md:p-12 flex flex-col items-start min-h-[300px] md:min-h-[350px] relative group overflow-hidden`}
                        >
                            {/* Decorative Circle for Number */}
                            <div className="bg-white/20 backdrop-blur-sm text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-8 border border-white/30 relative z-10 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                {step.id}
                            </div>

                            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight relative z-10">
                                {step.title}
                            </h3>

                            <p className="text-white/90 text-sm md:text-lg leading-relaxed relative z-10 max-w-xs">
                                {step.description}
                            </p>

                            {/* Hover Effect Background */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/15 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
