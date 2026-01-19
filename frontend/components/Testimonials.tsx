"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
    {
        id: 1,
        name: "KISHAN D",
        location: "Tripura",
        text: "I received a Scholarship of ₹10,000 for BBA just because I applied on their portal.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "NITOKA",
        location: "Nagaland",
        text: "Confirm Scholarship help me secure ₹50,000 Scholarship for my Bachelor in Culinary Arts and it was wonderful experience!",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "PRIYA S",
        location: "Maharashtra",
        text: "The guidance provided by the team was exceptional. I secured a full scholarship for my MBA program.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500 font-black text-2xl uppercase tracking-[0.2em] mb-4"
                    >
                        Testimonial
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-bold text-sm uppercase tracking-widest"
                    >
                        Student Success Stories
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto relative px-4 min-h-[450px]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const sweep = swipePower(offset.x, velocity.x);
                                if (sweep < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (sweep > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="glass-light p-10 md:p-16 rounded-[3rem] relative group hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 border border-slate-100/50 text-center pointer-events-auto cursor-grab active:cursor-grabbing w-full">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-600/30 group-hover:-translate-y-1 transition-transform">
                                    <Quote size={28} />
                                </div>
                                <p className="text-slate-600 font-medium italic leading-relaxed mb-12 text-xl md:text-2xl">
                                    "{testimonials[currentIndex].text}"
                                </p>
                                <div className="flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-3xl overflow-hidden mb-6 border-4 border-white shadow-2xl group-hover:scale-105 transition-transform">
                                        <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="font-black text-slate-dark tracking-widest uppercase text-base mb-1">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <span className="text-sky-600 text-xs font-black uppercase tracking-[0.4em]">
                                        {testimonials[currentIndex].location}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 z-20">
                        <button
                            onClick={() => paginate(-1)}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all shadow-xl shadow-slate-200/50 active:scale-95"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                    <div className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 z-20">
                        <button
                            onClick={() => paginate(1)}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all shadow-xl shadow-slate-200/50 active:scale-95"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Dots indicator */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-sky-600" : "w-2 bg-slate-200"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
