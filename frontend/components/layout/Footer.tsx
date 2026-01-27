import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export default function Footer() {
    return (
        <footer className="bg-slate-dark text-white pt-6 md:pt-12 pb-4 md:pb-6 overflow-hidden relative">
            {/* Background Decorative Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-navy via-brand-magenta to-brand-navy" />
            <div className="absolute -bottom-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-brand-magenta/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Mobile Layout */}
                <div className="lg:hidden space-y-6">
                    {/* Logo & Tagline */}
                    <div className="space-y-3">
                        <Link href="/" className="inline-block">
                            <img
                                src={ASSETS.logos.footer}
                                alt="Confirm Scholarship"
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-white text-sm leading-relaxed font-medium">
                            With ConfirmScholarship, give Wings to Your Dream. We strive to bring you closer to your Dream.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://www.facebook.com/confirmscholarship"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-magenta w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} className="text-white" />
                            </a>
                            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="bg-brand-magenta w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                                    aria-label={Icon.name}
                                >
                                    <Icon size={18} className="text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-white text-sm font-medium">
                            <li><Link href="/" className="hover:text-brand-magenta transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-brand-magenta transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-magenta transition-colors">Contact us</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3">Policies</h3>
                        <ul className="space-y-2 text-white text-sm font-medium">
                            <li><Link href="/disclaimer" className="hover:text-brand-magenta transition-colors">Disclaimer</Link></li>
                            <li><Link href="/help" className="hover:text-brand-magenta transition-colors">Help us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-brand-magenta transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3">Subscribe For Our Newsletter</h3>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white text-slate-900 px-4 py-3 rounded-xl focus:outline-none font-medium placeholder:text-slate-400 text-sm"
                            />
                            <button className="w-full bg-brand-magenta text-white font-bold py-3 rounded-xl uppercase tracking-widest text-sm transition-all shadow-lg hover:opacity-90" type="button">
                                SUBSCRIBE NOW
                            </button>
                        </form>
                    </div>

                    {/* Copyright */}
                    <div className="pt-4 border-t border-white/10 text-center">
                        <p className="text-xs text-white/60 font-medium">
                            © Copyright {new Date().getFullYear()} PRO EDUXON LLP
                        </p>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-4 gap-8 mb-10">
                    {/* Brand & About */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <img
                                src={ASSETS.logos.footer}
                                alt="Confirm Scholarship"
                                className="h-12 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-medium">
                            Empowering students across India with verified scholarships and genuine career guidance.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/confirmscholarship"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-magenta w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                                aria-label="Facebook"
                            >
                                <Facebook size={14} className="text-white" />
                            </a>
                            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="bg-brand-magenta w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                                    aria-label={Icon.name}
                                >
                                    <Icon size={14} className="text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-0">
                        <h3 className="text-brand-magenta font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-white text-sm font-medium leading-snug">
                            <li><Link href="/" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Home</Link></li>
                            <li><Link href="/scholarships" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Scholarships</Link></li>
                            <li><Link href="/online-courses" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Online Courses</Link></li>
                            <li><Link href="/blog" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Contact us</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="mt-0">
                        <h3 className="text-brand-magenta font-bold text-lg mb-4">Policies</h3>
                        <ul className="space-y-2 text-white text-sm font-medium leading-snug">
                            <li><Link href="/disclaimer" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Disclaimer</Link></li>
                            <li><Link href="/help" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Help us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="mt-0">
                        <h3 className="text-brand-magenta font-bold text-lg mb-4">Subscribe For Our Newsletter</h3>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white text-slate-900 px-4 py-2.5 rounded-xl focus:outline-none font-medium placeholder:text-slate-400 text-sm"
                            />
                            <button className="w-full bg-brand-magenta text-white font-bold py-2.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-95" type="button">
                                SUBSCRIBE NOW
                            </button>
                        </form>
                    </div>
                </div>

                {/* Desktop Bottom Line */}
                <div className="hidden lg:block pt-6 border-t border-white/10 text-center md:text-left">
                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                        &copy; {new Date().getFullYear()} PRO EDUXON LLP <span className="mx-2">•</span> Crafted for Your Future
                    </p>
                </div>
            </div>
        </footer>
    );
}
