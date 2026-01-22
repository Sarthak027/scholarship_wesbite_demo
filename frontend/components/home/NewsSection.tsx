"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

const newsOutlets = [
    { name: "Dailyhunt", logoUrl: ASSETS.logos.dailyhunt },
    { name: "Economic Times", logoUrl: ASSETS.logos.economicTimes },
    { name: "Hindustan Times", logoUrl: ASSETS.logos.hindustan },
    { name: "Republic News", logoUrl: ASSETS.logos.republic },
];

export default function NewsSection() {
    return (
        <section className="py-16 md:py-24 bg-slate-light/50">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy mb-4 md:mb-6 leading-tight">
                        We Are Featured In <br />
                        <span className="text-brand-magenta">The News!</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-medium max-w-2xl mx-auto mb-8 md:mb-12">
                        Empowering students across India with verified scholarships and genuine career guidance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-center">
                    {newsOutlets.map((outlet, index) => (
                        <motion.div
                            key={outlet.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-sm px-3 md:px-4 py-3 md:py-4 rounded-xl md:rounded-2xl soft-shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full flex items-center justify-center h-32 md:h-40 border border-slate-100 group"
                        >
                            {/* Logo fallback */}
                            <img
                                src={outlet.logoUrl}
                                alt={outlet.name}
                                className="max-h-16 md:max-h-24 max-w-[90%] object-contain scale-110"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <span className="hidden font-serif text-lg md:text-xl font-bold text-gray-800">{outlet.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
