"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function PromoBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="relative w-full py-24 px-4 bg-blue-900 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                        alt="Classroom"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
                </div>

                <div className="container mx-auto relative z-10 flex flex-col items-center text-center text-white">

                    <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-wide">
                        Enroll For Top Coaching Of India
                    </h3>

                    <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-lg">
                        Win Upto ₹1 LAKH <br className="md:hidden" /> Scholarship
                    </h2>

                    <p className="text-2xl font-bold uppercase tracking-wider mb-8 text-pink-200">
                        NEET | JEE
                    </p>

                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-primary hover:bg-pink-600 text-white px-10 py-4 rounded-md font-bold text-lg shadow-xl uppercase tracking-wider transition-all"
                    >
                        Apply Now
                    </motion.button>

                    {/* Guarantee Badge (Simulation) */}
                    <div className="absolute left-4 md:left-20 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col items-center justify-center w-32 h-32 bg-yellow-400 rounded-full text-blue-900 font-black shadow-lg border-4 border-red-600 rotate-12">
                        <span className="text-xs">100%</span>
                        <span className="text-sm">GUARANTEE</span>
                    </div>
                </div>
            </section>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
