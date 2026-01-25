"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "KISHAN D",
            location: "Tripura",
            text: "I received a Scholarship of ₹10,000 for BBA just because I applied on their portal.",
            avatar: `${api.baseURL}/uploads/images/testimonial/KISHAN D.jpeg`
        },
        {
            id: 2,
            name: "NITOKA",
            location: "Nagaland",
            text: "Confirm Scholarship help me secure ₹50,000 Scholarship for my Bachelor in Culinary Arts and it was wonderful experience!",
            avatar: `${api.baseURL}/uploads/images/testimonial/NITOKA.jpeg`
        },
        {
            id: 3,
            name: "HOUDUMEI PHAOMEI",
            location: "Manipur",
            // Fixed the filename with double space
            avatar: `${api.baseURL}/uploads/images/testimonial/HOUDUMEI  PHAOMEI.jpeg`,
            text: "Thanks to Confirm Scholarship as I got ₹50,000 Scholarship for my Bachelor in Culinary Arts."
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-brand-navy uppercase tracking-tight mb-4"
                    >
                        Testimonials
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        viewport={{ once: true }}
                        className="h-1 bg-brand-magenta mx-auto mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-500 font-medium max-w-lg mx-auto"
                    >
                        Student Success Stories & Feedback from across India.
                    </motion.p>
                </div>

                {/* Testimonial Carousel Container */}
                <div className="relative max-w-4xl mx-auto px-4 md:px-12">
                    {/* Desktop View (Grid of 3) - Visible on lg+ */}
                    <div className="hidden lg:grid grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <TestimonialCard key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    {/* Mobile/Tablet View (Carousel) - Visible below lg */}
                    <div className="lg:hidden relative">
                        <div className="overflow-hidden py-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="flex justify-center"
                                >
                                    <TestimonialCard item={testimonials[currentIndex]} index={0} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ item, index }: { item: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-slate-50 p-6 pt-14 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group border border-slate-100 w-full"
        >
            {/* Avatar - Half overlapping */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-[5px] border-white shadow-lg overflow-hidden transition-transform group-hover:scale-110 duration-500">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Quote Icon */}
            <div className="mb-4">
                <Quote
                    size={20}
                    className="text-brand-magenta rotate-180 opacity-40"
                    fill="currentColor"
                />
            </div>

            {/* Text */}
            <p className="text-slate-600 font-medium italic leading-relaxed mb-6 flex-grow text-sm md:text-base">
                "{item.text}"
            </p>

            {/* Footer */}
            <div className="mt-auto">
                <h4 className="font-black text-brand-magenta tracking-wider uppercase text-xs md:text-sm mb-1">
                    {item.name}
                </h4>
                <span className="text-brand-navy/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                    {item.location}
                </span>
            </div>
        </motion.div>
    );
}
