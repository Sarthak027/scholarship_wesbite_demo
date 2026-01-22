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
                    scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white/40 backdrop-blur-sm py-3"
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
                                className="h-8 md:h-10 w-auto object-contain"
                            />

                        </Link>

                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "relative group font-bold text-sm transition-all duration-200 py-2 uppercase tracking-widest",
                                            isActive ? "text-brand-magenta" : "text-slate-800 hover:text-brand-magenta"
                                        )}
                                    >
                                        {link.name}
                                        <span className={clsx(
                                            "absolute left-0 bottom-0 h-0.5 bg-brand-magenta transition-all duration-300",
                                            isActive ? "w-full" : "w-0 group-hover:w-full"
                                        )} />
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-4">
                            {/* CTA Button */}
                            <div className="hidden md:block">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-brand-magenta text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-widest shadow-lg shadow-brand-magenta/20 hover:shadow-brand-magenta/40 uppercase transition-all"
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
