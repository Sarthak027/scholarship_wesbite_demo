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
                    <div className="text-center mb-16 lg:hidden">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-brand-magenta font-extrabold text-sm uppercase tracking-[0.3em] mb-4 bg-brand-magenta/5 inline-block px-6 py-2 rounded-full"
                        >
                            Our Scholarships
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="bg-[#fbfbfb] rounded-3xl overflow-hidden border-2 border-slate-900 shadow-xl group transition-all duration-300 flex flex-col p-5"
                            >
                                {/* Image Container with rounded corners and padding */}
                                <div className="h-48 overflow-hidden relative rounded-2xl bg-white mb-6 border border-slate-100 shadow-sm">
                                    {cat.banner ? (
                                        <img
                                            src={getAssetUrl(cat.banner)}
                                            alt={cat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <GraduationCap size={44} />
                                        </div>
                                    )}
                                </div>

                                {/* Card Content - Centered */}
                                <div className="flex flex-col flex-grow text-center">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-brand-magenta transition-colors">
                                        {cat.name}
                                    </h3>

                                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                                        {cat.description || `Explore the best ${cat.name} scholarships available for Indian students today.`}
                                    </p>

                                    <div className="mt-auto space-y-6">
                                        <p className="font-bold text-lg text-brand-magenta tracking-tight">
                                            Scholarship Upto {cat.sampleScholarship?.split("-")[1]?.trim() || "₹1,00,000*"}
                                        </p>

                                        <button
                                            onClick={() => handleExplore(cat.slug)}
                                            className="w-full bg-brand-magenta hover:bg-brand-magenta/90 text-white font-black py-4 rounded-full text-sm uppercase tracking-widest shadow-lg shadow-brand-magenta/20 transition-all active:scale-95"
                                        >
                                            <span className="underline underline-offset-4 decoration-white/30">EXPLORE NOW</span>
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
