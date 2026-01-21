"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import EnquiryModal from "@/components/shared/EnquiryModal";

const categories = [
    {
        title: "Management",
        desc: "Management involves planning, organizing, and overseeing the operations of a business to ensure efficiency, productivity, and achievement of organizational goals.",
        amount: "₹1,00,000*",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Engineering",
        desc: "Engineering involves applying scientific principles and mathematical techniques to design, develop, and innovate structures, machines, and processes that solve practical problems and improve quality of life.",
        amount: "₹1,00,000*",
        image: "https://images.unsplash.com/photo-1581094794329-cd109c096349?q=80&w=1932&auto=format&fit=crop",
        url: "https://engineering.confirmscholarship.com"
    },
    {
        title: "Computer Application",
        desc: "Computer Application involves utilizing software and programming skills to develop, maintain, and troubleshoot computer systems and applications that support business functions and user needs.",
        amount: "₹20,000*",
        image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Designing",
        desc: "Designing involves creating visual and functional concepts for products, environments, and communication materials, combining aesthetics and practicality to meet user needs and enhance experiences.",
        amount: "₹50,000*",
        image: "https://images.unsplash.com/photo-1626785774573-4b79931434c3?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Commerce",
        desc: "Commerce involves the study of trade, finance, and business activities, focusing on the exchange of goods and services, market analysis, and financial management to drive economic growth and business success.",
        amount: "₹10,000*",
        image: "https://images.unsplash.com/photo-1554224155-9844c69be667?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Health Science",
        desc: "Health Science involves studying the various aspects of health and healthcare, including medicine, nutrition, and public health, to improve patient care, promote wellness, and advance medical knowledge and practices.",
        amount: "₹10,000*",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Law",
        desc: "Law program offers an in-depth understanding of legal principles, practices, and systems, preparing students for careers as legal professionals with a strong foundation in various branches of law including corporate, criminal, and civil law.",
        amount: "₹20,000*",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Pharmacy",
        desc: "Pharmacy program focuses on the science of medication, covering drug development, pharmacology, and clinical practices, equipping students with the expertise needed for careers in pharmaceutical industries, healthcare settings, and research.",
        amount: "₹20,000*",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Hotel Management",
        desc: "Hotel Management program provides comprehensive training in hospitality operations, customer service, and management skills, preparing students to excel in the global hospitality and tourism industry with roles in hotel administration, event planning, and food and beverage management.",
        amount: "₹50,000*",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
];

export default function ScholarshipCards() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleExplore = (title: string) => {
        setSelectedCategory(title);
        setIsModalOpen(true);
    };

    return (
        <>
            <section className="py-20 bg-gray-50" id="scholarships">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sky-600 font-extrabold text-sm uppercase tracking-[0.3em] mb-4 bg-sky-50 inline-block px-6 py-2 rounded-full"
                        >
                            Our Scholarships
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-600 text-3xl md:text-4xl font-bold max-w-2xl mx-auto"
                        >
                            Scholarships Tailored For <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">Your Ambition</span>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                <div className="h-40 overflow-hidden relative">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors line-clamp-1">{cat.title}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                                        {cat.desc}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upto</p>
                                            <p className="font-bold text-lg text-sky-600">
                                                {cat.amount}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleExplore(cat.title)}
                                            className="text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors shadow-md shadow-sky-100"
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
