"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import EnquiryModal from "@/components/shared/EnquiryModal";

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
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || window.pageYOffset;
            // Show cards when user scrolls down
            if (scrollPosition > 200) {
                setShowCards(true);
            } else {
                setShowCards(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative min-h-screen w-full overflow-visible">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    {backgroundImages.map((src, index) => (
                        <motion.div
                            key={src}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: index === currentImageIndex ? 1 : 0,
                                scale: index === currentImageIndex ? 1 : 1.05,
                            }}
                            transition={{ duration: 1.6, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={src}
                                alt="Hero Background"
                                fill
                                priority={index === 0}
                                className="object-cover object-center"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-white/60 z-10" />

                {/* Content */}
                <div className="relative z-20 container mx-auto px-6 h-full min-h-screen max-w-7xl flex flex-col items-center justify-center lg:items-start lg:justify-start lg:pt-32 text-center lg:text-left">
                    {/* Badge */}
                    <div className="inline-flex mb-6 overflow-hidden rounded-md">
                        <span className="bg-brand-magenta text-white font-bold py-1.5 px-3 text-xs">
                            Welcome
                        </span>
                        <span className="bg-black/5 text-black font-bold py-1.5 px-3 text-xs border border-black/10 border-l-0">
                            To Confirm Scholarship
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6 text-black">
                        Your Gateway To <br className="hidden lg:block" /> A Brighter Future
                    </h1>

                    {/* Subheading */}
                    <p className="text-base md:text-lg font-bold max-w-2xl mb-8 text-black">
                        Unlock a world of opportunities with scholarships tailored to your dream career.
                    </p>

                    {/* APPLY NOW — DESKTOP */}
                    <div className="hidden lg:block">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-brand-magenta hover:bg-brand-magenta/90 text-white px-8 py-3 rounded-md font-bold text-sm uppercase shadow-lg"
                        >
                            APPLY NOW
                        </button>
                    </div>

                    {/* APPLY NOW — MOBILE */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-brand-magenta hover:bg-brand-magenta/90 text-white px-10 py-4 rounded-md font-bold text-sm uppercase shadow-xl"
                        >
                            APPLY NOW
                        </button>
                    </div>
                </div>

                {/* ================= FEATURE CARDS (MOBILE) ================= */}
                {showCards && (
                    <motion.div
                        className="lg:hidden absolute -bottom-12 left-0 right-0 z-40"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0 }}
                            className="bg-brand-magenta text-white p-7 rounded-t-[24px] border-b border-white/20"
                        >
                            <div className="w-10 h-10 rounded-full bg-white text-brand-magenta flex items-center justify-center font-black mb-4 text-sm">
                                01
                            </div>
                            <p className="font-black text-lg leading-tight uppercase tracking-wide">
                                Scholarships For All From 10% To 100%
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-brand-navy text-white p-7 border-b border-white/20"
                        >
                            <div className="w-10 h-10 rounded-full bg-white text-brand-navy flex items-center justify-center font-black mb-4 text-sm">
                                02
                            </div>
                            <p className="font-black text-lg leading-tight uppercase tracking-wide">
                                Partnered With Best Universities & Colleges Of India
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-brand-deep-navy text-white p-7" // Increased padding slightly
                        >
                            <div className="w-10 h-10 rounded-full bg-white text-brand-deep-navy flex items-center justify-center font-black mb-4 text-sm">
                                03
                            </div>
                            <p className="font-black text-lg leading-tight uppercase tracking-wide">
                                Personalized Mentoring & Guidance
                            </p>
                        </motion.div>
                    </motion.div>
                )}

                {/* ================= FEATURE CARDS (DESKTOP) ================= */}
                <div className="hidden lg:flex absolute bottom-0 right-0 z-30">
                    <div className="flex">
                        <div className="bg-brand-magenta text-white p-10 w-80 rounded-tl-[40px] flex flex-col justify-center">
                            <div className="w-12 h-12 rounded-full bg-white text-brand-magenta flex items-center justify-center font-black mb-5 text-base">
                                01
                            </div>
                            <p className="font-black text-lg leading-tight uppercase tracking-wide">
                                Scholarships For All From 10% To 100%
                            </p>
                        </div>

                        <div className="bg-brand-navy text-white p-10 w-80 flex flex-col justify-center">
                            <div className="w-12 h-12 rounded-full bg-white text-brand-navy flex items-center justify-center font-black mb-5 text-base">
                                02
                            </div>
                            <p className="font-black text-lg leading-tight uppercase tracking-wide">
                                Partnered With Best Universities & Colleges Of India
                            </p>
                        </div>

                        <div className="bg-brand-deep-navy text-white p-10 w-80 flex flex-col justify-center">
                            <div className="w-12 h-12 rounded-full bg-white text-brand-deep-navy flex items-center justify-center font-black mb-5 text-base">
                                03
                            </div>
                            <p className="font-black text-lg leading-tight uppercase tracking-wide">
                                Personalized Mentoring & Guidance
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <EnquiryModal
                mode="callback"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
