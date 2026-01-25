import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export default function Footer() {
    return (
        <footer className="bg-slate-dark text-white pt-10 md:pt-24 pb-8 overflow-hidden relative">
            {/* Background Decorative Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-navy via-brand-magenta to-brand-navy" />
            <div className="absolute -bottom-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-brand-magenta/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-20">
                    {/* Brand & About */}
                    <div className="space-y-4 md:space-y-8">
                        <Link href="/" className="inline-block">
                            <img
                                src={ASSETS.logos.footer}
                                alt="Confirm Scholarship"
                                className="h-10 md:h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-sm font-medium">
                            Empowering students across India with verified scholarships and genuine career guidance.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/confirmscholarship"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-magenta w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                                aria-label="Facebook"
                            >
                                <Facebook size={16} className="text-white" />
                            </a>
                            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="bg-brand-magenta w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                                    aria-label={Icon.name}
                                >
                                    <Icon size={16} className="text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-2 md:mt-0">
                        <h3 className="text-white font-bold text-xl mb-3 md:mb-6">Quick Links</h3>
                        <ul className="space-y-2 md:space-y-4 text-white text-base font-medium">
                            <li><Link href="/" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Home</Link></li>
                            <li><Link href="/scholarships" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Scholarships</Link></li>
                            <li><Link href="/online-courses" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Online Courses</Link></li>

                            <li><Link href="/blog" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Contact us</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="mt-2 md:mt-0">
                        <h3 className="text-white font-bold text-xl mb-3 md:mb-6">Policies</h3>
                        <ul className="space-y-2 md:space-y-4 text-white text-base font-medium">
                            <li><Link href="/disclaimer" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Disclaimer</Link></li>
                            <li><Link href="/help" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Help us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-brand-magenta hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="mt-2 md:mt-0">
                        <h3 className="text-white font-bold text-xl mb-3 md:mb-6">Subscribe For Our Newsletter</h3>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white text-slate-900 px-5 py-3.5 rounded-2xl focus:outline-none font-medium placeholder:text-slate-400"
                            />
                            <button className="w-full bg-brand-magenta text-white font-bold py-3.5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-95" type="button">
                                SUBSCRIBE NOW
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="pt-8 border-t border-white/10 text-center md:text-left">
                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                        &copy; {new Date().getFullYear()} PRO EDUXON LLP <span className="hidden md:inline mx-2">•</span> <br className="md:hidden" /> Crafted for Your Future
                    </p>
                </div>
            </div>
        </footer>
    );
}
