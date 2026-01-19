"use client";

import { motion } from "framer-motion";

const courses = [
    {
        title: "MBA | ONLINE",
        description: "MBA program is designed for professionals seeking to elevate their leadership and management skills...",
        scholarship: "₹50,000*",
        image: "https://images.unsplash.com/photo-1507679799987-c7377fb186a1?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "BBA | ONLINE",
        description: "BBA provides a strong foundation in business principles, equipping students with essential knowledge in management...",
        scholarship: "₹20,000*",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "BCA | ONLINE",
        description: "BCA focuses on developing proficiency in computer programming, software development, and IT management...",
        scholarship: "₹20,000*",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
    }
];

export default function OnlineCourses() {
    return (
        <section id="online-courses" className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-rose-500 font-black text-2xl uppercase tracking-[0.2em] mb-4"
                    >
                        Online Courses
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-bold text-sm uppercase tracking-widest"
                    >
                        Exploring Online Business And Technology Degrees
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {courses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-[1.5rem] overflow-hidden shadow-xl shadow-slate-200 border border-slate-100 group hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="p-8">
                                <h3 className="text-xl font-black text-slate-dark mb-4 tracking-tight uppercase">
                                    {course.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                                    {course.description}
                                </p>
                                <div className="mb-6">
                                    <span className="text-rose-600 font-black text-lg">
                                        Scholarship Upto {course.scholarship}
                                    </span>
                                </div>
                                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-rose-900/20 active:scale-95">
                                    Explore Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
