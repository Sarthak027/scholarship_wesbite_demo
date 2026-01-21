"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { ASSETS } from "@/lib/assets";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Online Course", href: "/online-courses" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact us", href: "/contact" },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Smart Scroll: Hide on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 20);
    });

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                    scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-white/0 py-4"
                )}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={ASSETS.logos.nav}
                                alt="Confirm Scholarship"
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative group text-slate-600 hover:text-sky-600 font-semibold text-sm transition-colors duration-200 py-2 uppercase tracking-wide"
                                >
                                    {link.name}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            {/* CTA Button */}
                            <div className="hidden md:block">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsModalOpen(true)}
                                    className="premium-gradient text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-widest shadow-lg shadow-sky-100 hover:shadow-sky-200 uppercase transition-all"
                                >
                                    Enquire Now
                                </motion.button>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="lg:hidden text-slate-dark p-2 hover:bg-slate-100 rounded-full transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full top-full left-0 shadow-xl"
                        >
                            <div className="flex flex-col p-6 gap-2">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="block text-slate-700 font-bold py-3 border-b border-slate-50 uppercase tracking-wide hover:text-sky-600 hover:pl-2 transition-all"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                    className="premium-gradient text-white w-full py-4 rounded-xl font-bold text-sm tracking-widest mt-4 uppercase shadow-lg shadow-sky-100"
                                >
                                    Enquire Now
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
