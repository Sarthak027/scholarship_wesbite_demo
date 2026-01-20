"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryModal from "@/components/shared/EnquiryModal";

const backgroundImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", // Graduation/Students
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", // Campus Group
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", // Students talking
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden flex items-center bg-slate-100">
                {/* Background Slideshow */}
                <div className="absolute inset-0 w-full h-full z-0 bg-slate-900">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img
                                src={backgroundImages[currentImageIndex]}
                                alt="Hero Background"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Soft Light Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/40 to-transparent z-10" />
                </div>


                {/* Content */}
                <div className="container mx-auto px-4 md:px-6 relative z-20 text-slate-dark pt-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <span className="bg-sky-primary text-white font-bold py-1.5 px-5 rounded-full shadow-lg shadow-sky-100 text-sm md:text-base uppercase tracking-wider">
                                Welcome
                            </span>
                            <span className="text-lg md:text-xl font-semibold text-sky-700 tracking-wide">
                                To Confirm Scholarship
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-6 text-slate-dark"
                        >
                            Your Gateway To <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
                                A Brighter Future
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
                            className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed"
                        >
                            Unlock a world of opportunities with scholarships tailored to your dream career.
                            We verify so you succeed.
                        </motion.p>

                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(14 165 233 / 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 1.4, duration: 0.4 }}
                                className="bg-sky-primary hover:bg-sky-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-sky-100 tracking-wide transition-all"
                            >
                                APPLY NOW
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 1.6, duration: 0.4 }}
                                className="bg-white text-sky-primary border-2 border-sky-100 hover:border-sky-200 px-10 py-4 rounded-full font-bold text-lg shadow-lg tracking-wide transition-all"
                            >
                                LEARN MORE
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
