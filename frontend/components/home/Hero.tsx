"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { ASSETS } from "@/lib/assets";

const backgroundImages = [
    "/images/homepage_images/image1.webp",
    "/images/homepage_images/image2.webp",
    "/images/homepage_images/image3.webp",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Preload all images immediately
        backgroundImages.forEach((src) => {
            if (typeof window !== 'undefined') {
                const img = new window.Image();
                img.src = src;
            }
        });

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-screen overflow-hidden flex flex-col justify-between bg-white pb-0 pt-28 md:pt-0">
                {/* Background Slideshow - Pre-rendered for zero flash transitions */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    {backgroundImages.map((src, index) => (
                        <motion.div
                            key={src}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: index === currentImageIndex ? 1 : 0,
                                scale: index === currentImageIndex ? 1 : 1.05
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={src}
                                alt={`Hero Background ${index + 1}`}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                sizes="100vw"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 md:px-6 relative z-20 text-slate-900 pt-2 md:pt-32 pb-20 md:pb-20 lg:pb-10 flex-grow flex flex-col justify-center">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-0 mb-6 md:mb-8 overflow-hidden rounded-md"
                        >
                            <span className="bg-brand-magenta text-white font-bold py-1.5 px-3 md:px-4 text-xs md:text-sm">
                                Welcome
                            </span>
                            <span className="bg-black/5 backdrop-blur-sm text-black font-bold py-1.5 px-3 md:px-4 text-xs md:text-sm border border-black/10 border-l-0">
                                To Confirm Scholarship
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-4 md:mb-6 text-black tracking-tight"
                        >
                            Your Gateway To <br />
                            A Brighter Future
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="text-sm sm:text-base md:text-lg text-black mb-8 md:mb-10 max-w-2xl leading-relaxed font-bold"
                        >
                            Unlock a world of opportunities with scholarships tailored to your dream career.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 items-start w-full mb-8 lg:mb-0">
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                className="bg-brand-magenta hover:bg-brand-magenta/90 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-md font-bold text-xs md:text-sm tracking-wider transition-all uppercase w-full sm:w-auto shadow-xl min-h-[44px] flex items-center justify-center"
                            >
                                APPLY NOW
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Feature Boxes - Mobile: Stacked, Desktop: Horizontal */}
                <div className="container mx-auto px-4 md:px-6 relative z-20 lg:px-0 mt-8 lg:mt-0 w-full">
                    <div className="flex flex-col lg:flex-row items-stretch justify-end gap-4 lg:gap-0 lg:pr-0">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="bg-brand-magenta text-white p-6 md:p-8 w-full lg:w-72 flex flex-col gap-3 md:gap-4 border-t-4 border-brand-magenta"
                        >
                            <div className="w-10 h-10 rounded-full bg-white text-brand-magenta flex items-center justify-center font-bold text-base md:text-lg">01</div>
                            <p className="font-bold text-base md:text-lg leading-snug">Scholarships For All From 10% To 100%</p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                            className="bg-brand-navy text-white p-6 md:p-8 w-full lg:w-72 flex flex-col gap-3 md:gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-white text-brand-navy flex items-center justify-center font-bold text-base md:text-lg">02</div>
                            <p className="font-bold text-base md:text-lg leading-snug">Partnered With Best Universities & Colleges Of India</p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="bg-brand-deep-navy text-white p-6 md:p-8 w-full lg:w-72 flex flex-col gap-3 md:gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-white text-brand-deep-navy flex items-center justify-center font-bold text-base md:text-lg">03</div>
                            <p className="font-bold text-base md:text-lg leading-snug">Personalized Mentoring & Guidance</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <EnquiryModal mode="callback" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
