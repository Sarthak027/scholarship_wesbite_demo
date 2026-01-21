"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

export default function AboutHero() {
    return (
        <section className="pt-32 pb-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Images Side */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-sky-100"
                        >
                            <img
                                src={ASSETS.images.aboutSection1}
                                alt="Students Studying"
                                className="w-full h-auto"
                            />
                        </motion.div>

                        {/* Overlapping Image/Element */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-10 -right-10 z-20 bg-sky-600 text-white p-8 rounded-[2rem] shadow-2xl shadow-sky-900/20 max-w-[200px]"
                        >
                            <div className="font-black text-4xl mb-1">20+</div>
                            <div className="text-xs font-bold uppercase tracking-widest opacity-80 leading-tight">
                                Years Of Experience
                            </div>
                        </motion.div>

                        {/* Decorative Background Shape */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-50 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-rose-500 font-black tracking-[0.3em] text-xs uppercase mb-4 block"
                            >
                                About Us
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-slate-dark leading-[1.1] mb-6"
                            >
                                Empowering Students <br />
                                Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">Education</span>
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-light p-8 rounded-[2rem] border-l-4 border-l-sky-600"
                        >
                            <p className="text-slate-500 font-medium leading-relaxed">
                                At ConfirmScholarship, we're passionate about empowering students to pursue their dreams through education. As an online platform dedicated to easing the financial burden of higher education, we strive to make scholarships accessible to everyone. By consolidating a comprehensive list of scholarships under one roof, we aim to simplify the process and ensure that aspiring students can find the support they need to excel in their academic endeavors.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="font-black text-slate-dark uppercase tracking-widest text-sm mb-4">Mission</h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Our mission is to democratize education by providing accessible scholarship opportunities to all aspiring students, regardless of their background or financial status. We believe that education is a fundamental right, and everyone deserves the chance to pursue their passions and achieve their goals.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3 className="font-black text-slate-dark uppercase tracking-widest text-sm mb-4">Vision</h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Our vision is to create a world where education is not hindered by financial constraints. We envision a future where every student has the opportunity to unlock their full potential and contribute meaningfully to society through knowledge and skills acquired with the help of scholarships.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
