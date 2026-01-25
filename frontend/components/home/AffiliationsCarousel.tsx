"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

const affiliations = [
    { name: "UGC", fullname: "University Grants Commission", logo: ASSETS.affiliations.ugc },
    { name: "AICTE", fullname: "All India Council for Technical Education", logo: ASSETS.affiliations.aicte },
    { name: "NAAC", fullname: "National Assessment and Accreditation Council", logo: ASSETS.affiliations.naac },
    { name: "NBA", fullname: "National Board of Accreditation", logo: ASSETS.affiliations.nba },
    { name: "PCI", fullname: "Pharmacy Council of India", logo: ASSETS.affiliations.pci },
    { name: "NIRF", fullname: "National Institutional Ranking Framework", logo: ASSETS.affiliations.nirf },
];

export default function AffiliationsCarousel() {
    // Duplicate for infinite scroll
    const doubledAffiliations = [...affiliations, ...affiliations];

    return (
        <section className="py-12 bg-white overflow-hidden border-y border-slate-100">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h3 className="text-xl md:text-3xl font-black text-slate-800 uppercase tracking-[0.2em] mb-4">
                    Our Affiliations & Approvals
                </h3>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
                >
                    {doubledAffiliations.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center min-w-[180px] md:min-w-[240px] group/item"
                        >
                            <div className="h-28 md:h-36 w-full flex items-center justify-center mb-4 px-4">
                                <img
                                    src={item.logo}
                                    alt={item.name}
                                    className="max-h-[95%] max-w-[95%] object-contain transition-all duration-300 transform group-hover/item:scale-110"
                                />
                            </div>
                            <span className="text-xs md:text-sm font-black text-slate-400 group-hover/item:text-brand-magenta uppercase tracking-[0.2em] transition-colors duration-300">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
}
