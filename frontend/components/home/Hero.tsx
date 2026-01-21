"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
        // Preload images to eliminate delay
        backgroundImages.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6000); // 6 seconds per slide
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className="relative w-full min-h-[700px] lg:min-h-screen overflow-hidden flex items-center bg-slate-900">
                {/* Background Slideshow */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={backgroundImages[currentImageIndex]}
                                alt="Hero Background"
                                fill
                                priority
                                className="object-cover"
                                sizes="100vw"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Gradient Overlay for better readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 md:px-6 relative z-20 text-slate-dark pt-32 pb-40">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 mb-8"
                        >
                            <span className="bg-sky-primary text-white font-black py-2 px-6 rounded-full shadow-lg shadow-sky-100 text-xs md:text-sm uppercase tracking-[0.2em]">
                                Welcome
                            </span>
                            <span className="text-sm md:text-lg font-bold text-sky-700 tracking-wider uppercase">
                                To Confirm Scholarship
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-8 text-slate-dark uppercase tracking-tight"
                        >
                            Your Gateway <br className="hidden md:block" />
                            To <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
                                A Brighter
                            </span> <br className="hidden md:block" />
                            FUTURE
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-medium"
                        >
                            Unlock a world of opportunities with scholarships tailored to your dream career.
                            We verify every single detail so you can focus on your success.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-5 items-start w-full">
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                className="bg-sky-primary hover:bg-sky-500 text-white px-12 py-5 rounded-2xl font-black text-xs md:text-sm shadow-2xl shadow-sky-200 tracking-[0.2em] transition-all uppercase w-full sm:w-auto"
                            >
                                APPLY FOR SCHOLARSHIP
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            <EnquiryModal mode="callback" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
