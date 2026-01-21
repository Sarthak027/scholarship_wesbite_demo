"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { onlineUniversities } from "@/lib/online-course-data";

export default function OnlineCourses() {
    return (
        <section id="online-courses" className="py-24 bg-gray-50 overflow-hidden relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-magenta font-black text-2xl uppercase tracking-[0.2em] mb-4"
                    >
                        Online Courses
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-bold text-sm uppercase tracking-widest"
                    >
                        Exploring Online Business And Technology Degrees
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {onlineUniversities.map((uni, index) => (
                        <motion.div
                            key={uni.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-[1.5rem] overflow-hidden shadow-xl shadow-slate-200 border border-slate-100 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 group"
                        >
                            <div className="flex flex-col">
                                {/* Banner Image */}
                                <div className="h-40 w-full overflow-hidden relative">
                                    <img
                                        src={uni.bannerImage}
                                        alt={uni.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>

                                <div className="p-8 pb-4">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                                        {uni.name}
                                    </h3>
                                </div>

                                <div className="px-8 mb-6">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Available Course:</p>
                                    <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                                        {uni.availableCourses.join(", ")}
                                    </p>
                                </div>

                                <div className="px-8 pt-6 border-t border-slate-50 mb-8">
                                    <p className="text-brand-magenta font-bold text-sm">
                                        Courses Ranging From {uni.priceRange}
                                    </p>
                                </div>
                            </div>

                            <Link href={`/online-courses/${uni.slug}`} className="w-full">
                                <button className="w-full bg-brand-navy hover:bg-brand-deep-navy text-white font-bold py-3 rounded-b-xl uppercase tracking-widest text-[10px] shadow-lg shadow-brand-navy/10 transition-all">
                                    Explore Now
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
