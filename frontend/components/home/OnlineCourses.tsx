"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { getAssetUrl } from "@/lib/assets";
import { GraduationCap } from "lucide-react";

interface University {
    _id: string;
    name: string;
    slug: string;
    availableCourses: string[];
    priceRange: string;
    bannerImage: string;
    order: number;
    isActive: boolean;
    courseCount?: number;
}

export default function OnlineCourses() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const data = await api.onlineUniversities.getAllWithCount();
                setUniversities(data);
            } catch (error) {
                console.error("Error fetching universities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    if (loading) {
        return (
            <section id="online-courses" className="py-16 md:py-24 bg-gray-50 overflow-hidden relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-magenta"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="online-courses" className="py-16 md:py-24 bg-gray-50 overflow-hidden relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-magenta font-black text-xl md:text-2xl uppercase tracking-[0.2em] mb-3 md:mb-4"
                    >
                        Online Courses
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest"
                    >
                        Exploring Online Business And Technology Degrees
                    </motion.p>
                </div>

                {universities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <GraduationCap size={48} className="text-slate-300 mb-4" />
                        <p className="text-slate-500">No universities available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                        {universities.map((uni, index) => (
                            <motion.div
                                key={uni._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl md:rounded-[1.5rem] overflow-hidden shadow-xl shadow-slate-200 border border-slate-100 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 group"
                            >
                                <div className="flex flex-col">
                                    {/* Banner Image */}
                                    <div className="h-32 md:h-40 w-full overflow-hidden relative">
                                        <img
                                            src={getAssetUrl(uni.bannerImage)}
                                            alt={uni.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>

                                    <div className="p-6 md:p-8 pb-3 md:pb-4">
                                        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2">
                                            {uni.name}
                                        </h3>
                                    </div>

                                    <div className="px-6 md:px-8 mb-4 md:mb-6">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Available Course:</p>
                                        <p className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">
                                            {uni.availableCourses.join(", ")}
                                        </p>
                                    </div>

                                    <div className="px-6 md:px-8 pt-4 md:pt-6 border-t border-slate-50 mb-6 md:mb-8">
                                        <p className="text-brand-magenta font-bold text-xs md:text-sm">
                                            Courses Ranging From {uni.priceRange}
                                        </p>
                                    </div>
                                </div>

                                <Link href={`/online-courses/${uni.slug}`} className="w-full">
                                    <button className="w-full bg-brand-navy hover:bg-brand-deep-navy text-white font-bold py-3 rounded-b-xl uppercase tracking-widest text-[10px] shadow-lg shadow-brand-navy/10 transition-all min-h-[44px]">
                                        Explore Now
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
