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
        <section className="py-24 bg-slate-light/50">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-6 leading-tight">
                        We Are Featured In <br />
                        <span className="text-brand-magenta">The News!</span>
                    </h2>
                    <p className="text-gray-600 font-medium max-w-2xl mx-auto mb-12">
                        Empowering students across India with verified scholarships and genuine career guidance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
                    {newsOutlets.map((outlet, index) => (
                        <motion.div
                            key={outlet.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-sm px-4 py-4 rounded-2xl soft-shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full flex items-center justify-center h-40 border border-slate-100 group"
                        >
                            {/* Logo fallback */}
                            <img
                                src={outlet.logoUrl}
                                alt={outlet.name}
                                className="max-h-24 max-w-[90%] object-contain scale-110"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <span className="hidden font-serif text-xl font-bold text-gray-800">{outlet.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
