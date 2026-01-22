"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { getAssetUrl } from "@/lib/assets";

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    banner: string;
    order: number;
    isActive: boolean;
    scholarshipCount?: number;
    sampleScholarship?: string;
}

export default function ScholarshipCards() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.categories.getAllWithCount();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleExplore = (slug: string) => {
        router.push(`/scholarships/${slug}`);
    };

    if (loading) {
        return (
            <section className="py-20 bg-gray-50" id="scholarships">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-magenta"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="py-20 bg-gray-50" id="scholarships">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-brand-magenta font-extrabold text-sm uppercase tracking-[0.3em] mb-4 bg-brand-magenta/5 inline-block px-6 py-2 rounded-full"
                        >
                            Our Scholarships
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-brand-navy text-3xl md:text-4xl font-bold max-w-2xl mx-auto"
                        >
                            Scholarships Tailored For <span className="text-brand-magenta">Your Ambition</span>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                <div className="h-40 overflow-hidden relative bg-slate-100">
                                    {cat.banner ? (
                                        <img
                                            src={getAssetUrl(cat.banner)}
                                            alt={cat.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <GraduationCap size={40} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-magenta transition-colors line-clamp-1">{cat.name}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                                        {cat.description}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upto</p>
                                            <p className="font-bold text-lg text-brand-magenta">
                                                {cat.sampleScholarship?.split("-")[1]?.trim() || "₹1,00,000*"}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleExplore(cat.slug)}
                                            className="text-white bg-brand-navy hover:bg-brand-deep-navy px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors shadow-md shadow-brand-navy/10"
                                        >
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
