"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    {
        title: "Management",
        desc: "MBA is one of the most popular post-graduate programmes in India and abroad. The 2-year programme is…",
        amount: "₹1,00,000*",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Engineering",
        desc: "Engineering involves applying scientific principles and mathematical techniques to design, develop…….",
        amount: "₹1,00,000*",
        image: "https://images.unsplash.com/photo-1581094794329-cd109c096349?q=80&w=1932&auto=format&fit=crop",
        url: "https://engineering.confirmscholarship.com"
    },
    {
        title: "Computer Application",
        desc: "Computer Application involves utilizing software and programming skills to develop, maintain, and troubleshoot computer…..",
        amount: "₹20,000*",
        image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Designing",
        desc: "Designing involves creating visual and functional concepts for products, environments, and communication materials….",
        amount: "₹50,000*",
        image: "https://images.unsplash.com/photo-1626785774573-4b79931434c3?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Commerce",
        desc: "Commerce involves the study of trade, finance, and business activities, focusing on the exchange of goods and services….",
        amount: "₹10,000*",
        image: "https://images.unsplash.com/photo-1554224155-9844c69be667?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Health Science",
        desc: "Health Science involves studying the various aspects of health and healthcare, including medicine, nutrition….",
        amount: "₹10,000*",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Law",
        desc: "Law program offers an in-depth understanding of legal principles, practices, and systems, preparing students for careers as legal……",
        amount: "₹20,000*",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Pharmacy",
        desc: "Pharmacy program focuses on the science of medication, covering drug development, pharmacology, and clinical practices…..",
        amount: "₹20,000*",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
    {
        title: "Hotel Management",
        desc: "Hotel Management program provides comprehensive training in hospitality operations, customer service, and management skills…..",
        amount: "₹50,000*",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        url: "https://confirmscholarship.com"
    },
];

export default function ScholarshipCards() {
    return (
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300 flex flex-col"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow bg-white/50 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold text-slate-dark mb-3 group-hover:text-sky-600 transition-colors">{cat.title}</h3>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                                    {cat.desc}
                                </p>
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Scholarship Upto</span>
                                        <p className="font-extrabold text-2xl text-sky-600">
                                            {cat.amount}
                                        </p>
                                    </div>
                                    <a
                                        href={cat.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center premium-gradient text-white text-xs font-extrabold py-4 px-6 rounded-xl uppercase tracking-[0.1em] shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Explore Now
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
