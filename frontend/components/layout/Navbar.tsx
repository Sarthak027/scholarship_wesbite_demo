"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    return (
        <>
            <motion.header
                initial={{ y: 0 }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300",
                    scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white/40 backdrop-blur-sm py-4"
                )}
            >
                <div className="h-full max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <motion.img
                                whileHover={{ scale: 1.02 }}
                                src={ASSETS.logos.nav}
                                alt="Confirm Scholarship"
                                style={{ height: '56px' }}
                                className="max-h-14 w-auto object-contain"
                            />
                        </Link>

                        {/* Navigation - Centered */}
                        <nav className="hidden lg:flex items-center gap-7">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "text-sm font-medium transition-colors duration-200",
                                            isActive ? "text-brand-magenta" : "text-gray-700 hover:text-brand-magenta"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* CTA Button */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setIsModalOpen(true)}
                                className="hidden md:block bg-brand-magenta text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-brand-magenta/90 transition-colors"
                            >
                                Enquire Now
                            </motion.button>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="lg:hidden text-gray-700 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                                {navLinks.map((link, i) => {
                                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className={clsx(
                                                    "block font-black py-4 border-b border-slate-50 uppercase tracking-widest transition-all",
                                                    isActive ? "text-brand-magenta pl-4 border-l-4 border-l-brand-magenta" : "text-slate-700 hover:text-brand-magenta hover:pl-2"
                                                )}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                    className="bg-brand-magenta text-white w-full py-4 rounded-xl font-bold text-sm tracking-widest mt-4 uppercase shadow-lg shadow-brand-magenta/20"
                                >
                                    Enquire Now
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <EnquiryModal mode="callback" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
