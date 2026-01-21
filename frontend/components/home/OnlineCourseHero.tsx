"use client";

import { motion } from "framer-motion";

export default function OnlineCourseHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden min-h-[400px] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                    alt="Online Course Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-rose-500 text-white font-black text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full mb-8 inline-block shadow-xl shadow-rose-500/20"
                        >
                            Online Learning
                        </motion.span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1]">
                            Online <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">
                                Courses.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
                            Exploring Online Business And Technology Degrees from top universities. Take the next step in your professional journey from the comfort of your home.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
