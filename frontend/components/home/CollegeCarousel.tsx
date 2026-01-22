"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

const colleges = [
    { name: "College 1", logoUrl: ASSETS.collegeCarousel.college1 },
    { name: "College 2", logoUrl: ASSETS.collegeCarousel.college2 },
    { name: "College 3", logoUrl: ASSETS.collegeCarousel.college3 },
    { name: "College 4", logoUrl: ASSETS.collegeCarousel.college4 },
    { name: "College 5", logoUrl: ASSETS.collegeCarousel.college5 },
    { name: "College 6", logoUrl: ASSETS.collegeCarousel.college6 },
    { name: "Jagi Jain", logoUrl: ASSETS.collegeCarousel.jagiJain },
    { name: "Partner College", logoUrl: ASSETS.collegeCarousel.logo },
    { name: "Partner College 1", logoUrl: ASSETS.collegeCarousel.logo1 },
    { name: "Partner College 2", logoUrl: ASSETS.collegeCarousel.logo2 },
    { name: "Partner College 3", logoUrl: ASSETS.collegeCarousel.logo3 },
    { name: "Partner College 4", logoUrl: ASSETS.collegeCarousel.logo4 },
    { name: "Sharda University", logoUrl: ASSETS.collegeCarousel.sharda },
    { name: "Vignan University", logoUrl: ASSETS.collegeCarousel.vigna },
];

export default function CollegeCarousel() {
    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-8 md:mb-10 text-center">
                <h2 className="text-brand-magenta font-bold text-base md:text-lg tracking-widest uppercase mb-2">
                    Top Colleges
                </h2>
                <div className="w-12 md:w-16 h-1 bg-brand-navy mx-auto opacity-20" />
            </div>

            <div className="relative w-full max-w-7xl mx-auto overflow-hidden mask-gradient-x">
                <div className="flex overflow-hidden relative">
                    <motion.div
                        className="flex gap-8 md:gap-12 lg:gap-16 items-center whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...colleges, ...colleges].map((college, index) => (
                            <div
                                key={`${college.name}-${index}`}
                                className="flex flex-col items-center justify-center group"
                            >
                                {/* Logo Image */}
                                <div className="h-24 w-48 md:h-28 md:w-56 lg:h-32 lg:w-64 flex items-center justify-center p-2 bg-white rounded-lg shadow-sm border border-gray-50">
                                    {college.logoUrl ? (
                                        <img
                                            src={college.logoUrl}
                                            alt={college.name}
                                            className="max-h-full max-w-full object-contain scale-110"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                target.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : null}
                                    <span className={college.logoUrl ? "hidden text-gray-700 font-bold text-center text-xs break-words whitespace-normal" : "text-gray-700 font-bold text-center text-xs break-words whitespace-normal"}>
                                        {college.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Gradient Masks for smooth fade out at edges */}
                <div className="absolute top-0 left-0 w-16 md:w-24 lg:w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 right-0 w-16 md:w-24 lg:w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
}
