"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

const govtScholarships = [
    {
        title: "GOVT. SCHOLARSHIP",
        description: "Central Sector Scheme of Scholarship for College and University Students. Scholarship is ₹12,000 per annum for the first three years and ₹20,000 per annum for the fourth and fifth year.",
        scholarship: "₹20,000*",
        image: ASSETS.govtScholarships.govt,
        badge: "APPLY NOW",
        url: "https://www.education.gov.in/scholarships-education-loan-0-hi"
    },
    {
        title: "J.N. TATA SCHOLARSHIP",
        description: "The J.N. Tata Endowment Loan Scholarship is a merit-based scholarship that awards between ₹1 lakh and ₹10 lakh.",
        scholarship: "₹10,00,000*",
        image: ASSETS.govtScholarships.jnTata,
        badge: "APPLY NOW",
        url: "https://jntataendowment.org/"
    },
    {
        title: "TATA PANKH SCHOLARSHIP",
        description: "Classes 11 and 12 students will get One-time merit-based scholarship of up to 80% of their course fees or an amount ranging from ₹10,000 to ₹12,000 (whichever is less) to fulfill their academic dreams.",
        scholarship: "₹12,000*",
        image: ASSETS.govtScholarships.tataPankh,
        badge: "APPLY NOW",
        url: "https://www.buddy4study.com/page/the-tata-capital-pankh-scholarship-programme"
    }
];

export default function GovtScholarships() {
    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-magenta font-black text-lg md:text-xl lg:text-2xl uppercase tracking-[0.2em] mb-3 md:mb-4"
                    >
                        GOVERNMENT & OTHER SCHOLARSHIPS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest"
                    >
                        Government Business And Technology Degrees
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {govtScholarships.map((scholarship, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl md:rounded-[1.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 group hover:-translate-y-2 transition-all duration-500 flex flex-col"
                        >
                            <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden flex-shrink-0">
                                <img
                                    src={scholarship.image}
                                    alt={scholarship.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm border border-slate-100 text-brand-navy text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-lg uppercase tracking-widest shadow-lg z-10">
                                    {scholarship.badge}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <h3 className="text-lg md:text-xl font-black text-slate-dark mb-3 md:mb-4 tracking-tight uppercase">
                                    {scholarship.title}
                                </h3>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-medium line-clamp-4">
                                    {scholarship.description}
                                </p>
                                <div className="mb-6 mt-auto">
                                    <div className="mb-4">
                                        <span className="text-brand-magenta font-black text-base md:text-lg">
                                            Scholarship Upto {scholarship.scholarship}
                                        </span>
                                    </div>
                                    <a
                                        href={scholarship.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center bg-brand-navy hover:bg-brand-deep-navy text-white font-black py-3 md:py-4 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-brand-navy/20 active:scale-95 min-h-[44px] flex items-center justify-center font-bold"
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
