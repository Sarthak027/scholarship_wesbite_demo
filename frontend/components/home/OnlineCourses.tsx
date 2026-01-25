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
                        className="text-brand-magenta font-extrabold text-sm uppercase tracking-[0.3em] mb-4 bg-brand-magenta/5 inline-block px-6 py-2 rounded-full"
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
                                className="bg-white rounded-[2.5rem] overflow-hidden border-2 border-slate-900 shadow-xl group transition-all duration-300 flex flex-col p-5 h-full"
                            >
                                {/* Banner Image Container */}
                                <div className="h-44 overflow-hidden relative rounded-2xl bg-white mb-6 border border-slate-100 shadow-sm">
                                    <img
                                        src={getAssetUrl(uni.bannerImage)}
                                        alt={uni.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="flex flex-col flex-grow text-center px-2">
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 group-hover:text-brand-magenta transition-colors leading-tight">
                                        {uni.name}
                                    </h3>

                                    <div className="mb-6 flex-grow">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Available Course</p>
                                        <p className="text-xs md:text-sm font-bold text-slate-600 leading-relaxed line-clamp-2">
                                            {uni.availableCourses.join(", ")}
                                        </p>
                                    </div>

                                    <div className="mt-auto space-y-6">
                                        <p className="font-black text-lg text-brand-magenta tracking-tight">
                                            Scholarship Guaranteed*
                                            <br />
                                            <span className="text-xl">{uni.priceRange}</span>
                                        </p>

                                        <Link href={`/online-courses/${uni.slug}`} className="w-full block">
                                            <button className="w-full bg-brand-magenta hover:bg-brand-magenta/90 text-white font-black py-4 rounded-full text-sm uppercase tracking-widest shadow-lg shadow-brand-magenta/20 transition-all active:scale-95">
                                                <span className="underline underline-offset-4 decoration-white/30">EXPLORE NOW</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
