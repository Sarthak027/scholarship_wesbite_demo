"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import clsx from "clsx";
import EnquiryModal from "@/components/shared/EnquiryModal";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Online Course", href: "#online-courses" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact us", href: "#contact" },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Smart Scroll Login: Hide on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
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
                    "fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300",
                    scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
                )}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo (Image Only) */}
                        <Link href="/" className="flex items-center">
                            <img
                                src="/logos/nav_logo1.png"
                                alt="Confirm Scholarship Logo"
                                className="h-14 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative group text-slate-600 hover:text-sky-600 font-bold text-sm transition-colors duration-200 py-2 uppercase tracking-wider"
                                >
                                    {link.name}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="premium-gradient text-white px-8 py-3 rounded-xl font-extrabold text-sm tracking-widest transition-all shadow-lg shadow-sky-100 hover:shadow-sky-200 hover:-translate-y-0.5 uppercase"
                            >
                                ENQUIRE NOW
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden text-slate-dark p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial="closed"
                    animate={mobileMenuOpen ? "open" : "closed"}
                    variants={{
                        open: { opacity: 1, height: "auto" },
                        closed: { opacity: 0, height: 0 },
                    }}
                    className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-slate-100"
                >
                    <div className="flex flex-col p-6 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-slate-700 font-bold py-3 border-b border-slate-50 uppercase tracking-wide hover:text-sky-600 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                setIsModalOpen(true);
                            }}
                            className="premium-gradient text-white w-full py-4 rounded-xl font-extrabold text-sm tracking-widest mt-4 uppercase shadow-lg shadow-sky-100"
                        >
                            ENQUIRE NOW
                        </button>
                    </div>
                </motion.div>
            </motion.header>

            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
