"use client";

import { use, useEffect, useState } from "react";
import { onlineUniversities } from "@/lib/online-course-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Clock, Award, BookOpen } from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    // Correctly unwrap params using React.use()
    const { slug } = use(params);

    const [university, setUniversity] = useState<typeof onlineUniversities[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (slug) {
            const uni = onlineUniversities.find(u => u.slug === slug);
            setUniversity(uni || null);
        }
    }, [slug]);

    if (!university) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative h-[400px] md:h-[500px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={university.bannerImage}
                        alt={university.name}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16 md:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/90 text-sm font-bold mb-6">
                            <span>Online Degree Programs</span>
                            <ChevronRight size={16} />
                            <span>{university.name}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight max-w-4xl">
                            {university.name}
                        </h1>
                        <p className="text-xl text-slate-200 max-w-2xl font-medium">
                            Empower your career with valid online degrees recognized globally.
                            Flexible learning designed for working professionals.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="container mx-auto px-4 -mt-10 relative z-10 pb-20">
                <div className="grid grid-cols-1 max-w-5xl mx-auto gap-8">
                    {university.courses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row gap-0 group hover:border-sky-200 transition-all duration-300"
                        >
                            {/* Left: Course Graphic Image */}
                            <div className="w-full md:w-[45%] shrink-0 relative overflow-hidden">
                                {course.image ? (
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <BookOpen size={40} />
                                    </div>
                                )}
                            </div>

                            {/* Right: Details */}
                            <div className="flex-grow p-6 md:p-10 flex flex-col justify-center">
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                                    {course.title}
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                        </div>
                                        <p className="text-slate-800 font-bold text-sm">
                                            {course.specializations}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                        </div>
                                        <p className="text-slate-800 font-bold text-sm">
                                            {course.scholarship}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 items-center mt-2">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-[#9e0059] hover:bg-[#800048] text-white px-8 py-2.5 rounded-full font-bold text-xs transition-all shadow-lg hover:shadow-[#9e0059]/30 active:scale-95 uppercase tracking-widest whitespace-nowrap"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
