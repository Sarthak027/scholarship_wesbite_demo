"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function PopularPrograms() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500 font-black text-2xl uppercase tracking-[0.2em]">
                            Most Popular
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto">
                        {/* BBA Banner */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            onClick={() => setIsModalOpen(true)}
                            className="relative rounded-[2rem] overflow-hidden group shadow-xl shadow-sky-100/50 cursor-pointer bg-slate-50"
                        >
                            <img
                                src="/images/most_popular1.png"
                                alt="BBA Scholarship"
                                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                            {/* Interactive Overlay Shadow */}
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500" />
                        </motion.div>

                        {/* B.Tech Banner */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            onClick={() => setIsModalOpen(true)}
                            className="relative rounded-[2rem] overflow-hidden group shadow-xl shadow-sky-100/50 cursor-pointer bg-slate-50"
                        >
                            <img
                                src="/images/most_popular2.png"
                                alt="B.Tech Scholarship"
                                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                            {/* Interactive Overlay Shadow */}
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
