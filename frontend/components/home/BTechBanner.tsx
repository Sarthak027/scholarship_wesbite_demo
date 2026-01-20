"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function BTechBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="py-12 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setIsModalOpen(true)}
                        className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-sky-100/50 cursor-pointer group bg-slate-50"
                    >
                        <img
                            src="/images/banner_homepage.png"
                            alt="Special B.Tech Scholarship"
                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
                        />
                        {/* Subtle Overlay on Hover */}
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500" />
                    </motion.div>
                </div>
            </section>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
