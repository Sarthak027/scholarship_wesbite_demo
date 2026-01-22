"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function PromoBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="relative w-full py-16 md:py-24 px-4 bg-brand-navy overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                        alt="Classroom"
                        className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-brand-deep-navy/40 mix-blend-multiply" />
                </div>

                <div className="container mx-auto relative z-10 flex flex-col items-center text-center text-white">

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 tracking-wide text-white/80">
                        Enroll For Top Coaching Of India
                    </h3>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 md:mb-4 leading-tight drop-shadow-lg px-2">
                        Win Upto ₹1 LAKH <br className="md:hidden" /> Scholarship
                    </h2>

                    <p className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-6 md:mb-8 text-brand-magenta">
                        NEET | JEE
                    </p>

                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-brand-magenta hover:bg-brand-magenta/90 text-white px-8 md:px-10 py-3 md:py-4 rounded-md font-bold text-base md:text-lg shadow-xl uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center"
                    >
                        Apply Now
                    </motion.button>

                    {/* Guarantee Badge */}
                    <div className="absolute left-4 md:left-20 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col items-center justify-center w-32 h-32 bg-brand-magenta rounded-full text-white font-black shadow-2xl border-4 border-white rotate-12">
                        <span className="text-xs">100%</span>
                        <span className="text-sm uppercase tracking-tighter">Verified</span>
                    </div>
                </div>
            </section>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
