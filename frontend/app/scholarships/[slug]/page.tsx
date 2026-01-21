"use client";

import { use, useEffect, useState } from "react";
import { scholarshipCategories } from "@/lib/scholarship-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, MapPin, GraduationCap, Award } from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function ScholarshipCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [category, setCategory] = useState<typeof scholarshipCategories[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (slug) {
            const cat = scholarshipCategories.find(c => c.slug === slug);
            setCategory(cat || null);
        }
    }, [slug]);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative py-24 bg-slate-900 overflow-hidden min-h-[400px] flex items-center">
                <div className="absolute inset-0">
                    {category.banner ? (
                        <img
                            src={category.banner}
                            alt={category.title}
                            className="w-full h-full object-cover opacity-40"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-slate-900/60" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                </div>

                <div className="relative container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/90 text-sm font-bold mb-8">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={14} />
                            <Link href="/scholarships" className="hover:text-white transition-colors">Scholarships</Link>
                            <ChevronRight size={14} />
                            <span className="text-sky-400">{category.title}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            {category.title} <span className="text-sky-500">Scholarships</span>
                        </h1>
                        <p className="text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
                            {category.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Practical Placeholder for categories without sections yet */}
            {category.sections.length === 0 ? (
                <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 font-black text-3xl">
                        {category.title[0]}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Coming Soon</h2>
                    <p className="text-slate-500 max-w-md mb-8">
                        We are currently updating our database with the latest {category.title} scholarships. Check back soon for guaranteed financial support.
                    </p>
                    <Link href="/scholarships" className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors uppercase tracking-widest text-xs">
                        View Other Categories
                    </Link>
                </section>
            ) : (
                category.sections.map((section, sectionIdx) => (
                    <section key={sectionIdx} className="container mx-auto px-4 pt-16">
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 relative inline-block">
                                {section.title}
                                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-sky-500 rounded-full" />
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {section.items.map((item, itemIdx) => (
                                <motion.div
                                    key={itemIdx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: itemIdx * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200 border border-slate-100 flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Image Container */}
                                    <div className="h-44 overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.college}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-sky-600 shadow-sm">
                                                {item.course}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight min-h-[3rem]">
                                            {item.college}
                                        </h3>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <MapPin size={14} className="shrink-0" />
                                                <span className="text-xs font-semibold">{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sky-600">
                                                <Award size={14} className="shrink-0" />
                                                <span className="text-xs font-bold">{item.scholarship}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full bg-slate-900 hover:bg-sky-600 text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-sky-200 active:scale-95 mt-auto"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))
            )}

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
