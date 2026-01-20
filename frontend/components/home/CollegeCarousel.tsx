"use client";

import { motion } from "framer-motion";

const colleges = [
    { name: "NSHM Knowledge Campus", logoUrl: "/logos/NSHM Knowledge Campus.jpg" },
    { name: "Lexicon Management Institute", logoUrl: "/logos/Lexicon Management Institute.png" },
    { name: "Alliance University", logoUrl: "/logos/Alliance University.jpg" },
    { name: "GIBS Business School", logoUrl: "/logos/GIBS Business School.png" },
    { name: "IILM University", logoUrl: "/logos/IILM University.png" },
    { name: "KIIT", logoUrl: "/logos/KIIT.png" },
    { name: "Amity University", logoUrl: "/logos/Amity University.png" },
    { name: "Lovely Professional University", logoUrl: "/logos/Lovely Professional University.png" },
];

export default function CollegeCarousel() {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-pink-primary font-bold text-lg tracking-widest uppercase mb-2">
                    Top Colleges
                </h2>
                <div className="w-16 h-1 bg-blue-primary mx-auto opacity-20" />
            </div>

            <div className="relative w-full max-w-7xl mx-auto overflow-hidden mask-gradient-x">
                <div className="flex overflow-hidden relative">
                    <motion.div
                        className="flex gap-16 items-center whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...colleges, ...colleges].map((college, index) => (
                            <div
                                key={`${college.name}-${index}`}
                                className="flex flex-col items-center justify-center group"
                            >
                                {/* Logo Image */}
                                <div className="h-24 w-48 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-50">
                                    {college.logoUrl ? (
                                        <img
                                            src={college.logoUrl}
                                            alt={college.name}
                                            className="max-h-full max-w-full object-contain"
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
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
}
