"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-brand-deep-navy mb-4"
                    >
                        Why Choose <span className="text-brand-magenta">Confirm Scholarship?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg"
                    >
                        Watch our quick guide on how we help students achieve their academic dreams.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 aspect-video"
                >
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/1ZQFppefWGM?cc_load_policy=1"
                        title="Confirm Scholarship Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}
