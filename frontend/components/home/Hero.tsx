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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative min-h-screen w-full overflow-hidden">
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
                <div className="relative z-20 container mx-auto px-6 pt-32 max-w-7xl">
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
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6">
                        Your Gateway To <br /> A Brighter Future
                    </h1>

                    {/* Subheading */}
                    <p className="text-base md:text-lg font-bold max-w-2xl mb-8">
                        Unlock a world of opportunities with scholarships tailored to your dream career.
                    </p>

                    {/* APPLY NOW — DESKTOP (LEFT ALIGNED) */}
                    <div className="hidden lg:block">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-brand-magenta hover:bg-brand-magenta/90 text-white px-8 py-3 rounded-md font-bold text-sm uppercase shadow-lg"
                        >
                            APPLY NOW
                        </button>
                    </div>
                </div>

                {/* APPLY NOW — MOBILE (BOTTOM CENTER) */}
                <div className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-brand-magenta hover:bg-brand-magenta/90 text-white px-10 py-4 rounded-full font-bold text-sm uppercase shadow-xl"
                    >
                        APPLY NOW
                    </button>
                </div>

                {/* ================= FEATURE CARDS (DESKTOP) ================= */}
                <div className="hidden lg:flex absolute bottom-0 right-0 z-30">
                    <div className="flex">
                        <div className="bg-brand-magenta text-white p-6 w-60 rounded-tl-[40px]">
                            <div className="w-9 h-9 rounded-full bg-white text-brand-magenta flex items-center justify-center font-bold mb-3 text-sm">
                                01
                            </div>
                            <p className="font-bold text-sm leading-snug">
                                Scholarships For All From 10% To 100%
                            </p>
                        </div>

                        <div className="bg-brand-navy text-white p-6 w-60">
                            <div className="w-9 h-9 rounded-full bg-white text-brand-navy flex items-center justify-center font-bold mb-3 text-sm">
                                02
                            </div>
                            <p className="font-bold text-sm leading-snug">
                                Partnered With Best Universities & Colleges Of India
                            </p>
                        </div>

                        <div className="bg-brand-deep-navy text-white p-6 w-60">
                            <div className="w-9 h-9 rounded-full bg-white text-brand-deep-navy flex items-center justify-center font-bold mb-3 text-sm">
                                03
                            </div>
                            <p className="font-bold text-sm leading-snug">
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
