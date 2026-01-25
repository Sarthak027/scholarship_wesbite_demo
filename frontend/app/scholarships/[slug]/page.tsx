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

export default function ScholarshipCategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);

    const [category, setCategory] = useState<Category | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await api.categories.getBySlug(slug);
                setCategory(categoryData);

                const scholarshipsData = await api.scholarships.getByCategory(slug);

                const sortedSections = [...scholarshipsData].sort((a, b) => {
                    if (a.title.includes("MBA")) return -1;
                    if (b.title.includes("MBA")) return 1;
                    return a.title.localeCompare(b.title);
                });

                setSections(sortedSections);
            } catch {
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-magenta" />
            </div>
        );
    }

    if (notFound || !category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
                <GraduationCap size={48} className="text-slate-300 mb-4" />
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                    Category Not Found
                </h1>
                <p className="text-slate-500 mb-6">
                    The scholarship category you're looking for doesn't exist.
                </p>
                <Link
                    href="/scholarships"
                    className="bg-brand-navy text-white px-6 py-2 rounded-lg font-bold"
                >
                    View All Scholarships
                </Link>
            </div>
        );
    }

    return (
        /* ⬇️ THIS FIXES THE NAVBAR OVERLAP */
        <main className="min-h-screen bg-gray-50 pb-20 pt-[80px]">
            {/* HERO */}
            <section className="relative min-h-[420px] bg-slate-900 flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    {category.banner && (
                        <img
                            src={getAssetUrl(category.banner)}
                            alt={category.name}
                            className="w-full h-full object-cover opacity-40"
                        />
                    )}
                    <div className="absolute inset-0 bg-slate-900/60" />
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        {/* Minimalist Breadcrumbs - Desktop Only */}
                        <div className="hidden md:block w-full mb-8">
                            <div className="flex flex-row flex-nowrap items-center gap-4 overflow-x-auto scrollbar-hide py-1">
                                <Link href="/" className="text-white/40 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors shrink-0 whitespace-nowrap">Home</Link>
                                <div className="w-1 h-1 bg-brand-magenta rounded-full shrink-0" />
                                <Link href="/scholarships" className="text-white/40 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors shrink-0 whitespace-nowrap">Scholarships</Link>
                                <div className="w-1 h-1 bg-brand-magenta rounded-full shrink-0" />
                                <span className="text-brand-magenta text-xs font-black uppercase tracking-[0.2em] shrink-0 whitespace-nowrap">{category.name}</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
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

            {/* SECTIONS */}
            {sections.map((section, idx) => (
                <section key={idx} className="pt-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 relative inline-block uppercase tracking-wider">
                                {section.title}
                                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-brand-magenta rounded-full" />
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {section.items.map((item, i) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                                >
                                    <div className="h-44 overflow-hidden relative">
                                        <img
                                            src={getAssetUrl(item.image)}
                                            alt={item.college}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <span className="bg-brand-magenta/10 text-brand-magenta px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest mb-3 w-fit">
                                            {item.course}
                                        </span>

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
                                            className="w-full bg-brand-navy hover:bg-brand-deep-navy text-white py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-brand-navy/20 active:scale-95 mt-auto"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            <EnquiryModal
                mode="scholarship"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}
