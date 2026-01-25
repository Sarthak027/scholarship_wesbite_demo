"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, MapPin, GraduationCap, Award } from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { api } from "@/lib/api";
import { getAssetUrl } from "@/lib/assets";

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    banner: string;
}

interface ScholarshipItem {
    _id: string;
    college: string;
    location: string;
    scholarship: string;
    course: string;
    image: string;
    categorySlug: string;
    sectionTitle: string;
}

interface Section {
    title: string;
    items: ScholarshipItem[];
}

export default function ScholarshipCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [category, setCategory] = useState<Category | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;

            try {
                // Fetch category info
                const categoryData = await api.categories.getBySlug(slug);
                setCategory(categoryData);

                // Fetch scholarships for this category (already grouped by sections)
                const scholarshipsData = await api.scholarships.getByCategory(slug);

                // Sort sections: MBA before BBA (Descending order of title string usually works for MBA vs BBA, 
                // but let's do a more robust sort to ensure MBA stays at top)
                const sortedSections = [...scholarshipsData].sort((a, b) => {
                    if (a.title.includes('MBA')) return -1;
                    if (b.title.includes('MBA')) return 1;
                    return a.title.localeCompare(b.title);
                });

                setSections(sortedSections);
            } catch (error) {
                console.error("Error fetching data:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-magenta"></div>
            </div>
        );
    }

    if (notFound || !category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <GraduationCap size={48} className="text-slate-300 mb-4" />
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Category Not Found</h1>
                <p className="text-slate-500 mb-6">The scholarship category you're looking for doesn't exist.</p>
                <Link href="/scholarships" className="bg-brand-navy text-white px-6 py-2 rounded-lg font-bold">
                    View All Scholarships
                </Link>
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
                            src={getAssetUrl(category.banner)}
                            alt={category.name}
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
                        {/* Breadcrumbs Pill */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-white/90 text-[11px] md:text-sm font-bold mb-10 shadow-xl">
                            <Link href="/" className="hover:text-white transition-colors flex items-center">Home</Link>
                            <ChevronRight size={14} className="text-white/40" />
                            <Link href="/scholarships" className="hover:text-white transition-colors">Scholarships</Link>
                            <ChevronRight size={14} className="text-white/40" />
                            <span className="text-brand-magenta">{category.name}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            {category.name} <br className="md:hidden" />
                            <span className="text-brand-magenta">Scholarships</span>
                        </h1>

                        <div className="w-20 h-1.5 bg-brand-magenta rounded-full mb-8" />

                        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
                            {category.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Practical Placeholder for categories without sections yet */}
            {sections.length === 0 ? (
                <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-brand-magenta/5 rounded-2xl flex items-center justify-center text-brand-magenta mb-6 font-black text-3xl">
                        {category.name[0]}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Coming Soon</h2>
                    <p className="text-slate-500 max-w-md mb-8">
                        We are currently updating our database with the latest {category.name} scholarships. Check back soon for guaranteed financial support.
                    </p>
                    <Link href="/scholarships" className="bg-brand-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-deep-navy transition-colors uppercase tracking-widest text-xs">
                        View Other Categories
                    </Link>
                </section>
            ) : (
                sections.map((section, sectionIdx) => (
                    <section key={sectionIdx} className="container mx-auto px-4 pt-16">
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 relative inline-block">
                                {section.title}
                                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-brand-magenta rounded-full" />
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {section.items.map((item, itemIdx) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: itemIdx * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200 border border-slate-100 flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Image Container */}
                                    <div className="h-44 overflow-hidden relative">
                                        <img
                                            src={getAssetUrl(item.image)}
                                            alt={item.college}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-2">
                                            <span className="bg-brand-magenta/10 text-brand-magenta px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
                                                {item.course}
                                            </span>
                                        </div>
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
                                            className="w-full bg-brand-navy hover:bg-brand-deep-navy text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-brand-navy/20 active:scale-95 mt-auto"
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

            <EnquiryModal mode="scholarship" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
