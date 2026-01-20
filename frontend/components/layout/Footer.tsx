import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, GraduationCap } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export default function Footer() {
    return (
        <footer className="bg-slate-dark text-white pt-24 pb-8 overflow-hidden relative">
            {/* Background Decorative Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand & About */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block">
                            <img
                                src={ASSETS.logos.footer}
                                alt="Confirm Scholarship"
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                            Empowering students across India with verified scholarships and genuine career guidance. Giving wings to your professional dreams.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-sky-600 hover:scale-110 transition-all duration-300 group"
                                >
                                    <Icon size={18} className="text-slate-300 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Navigation</h3>
                        <ul className="space-y-4 text-slate-400 text-sm font-bold">
                            <li><Link href="/" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> Home</Link></li>
                            <li><Link href="/scholarships" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> Scholarships</Link></li>
                            <li><Link href="/about" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Resources</h3>
                        <ul className="space-y-4 text-slate-400 text-sm font-bold">
                            <li><Link href="/disclaimer" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> Disclaimer</Link></li>
                            <li><Link href="/help" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> Help Center</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-sky-500 transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-sky-500 group-hover:w-3 transition-all"></span> Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Newsletter</h3>
                        <p className="text-slate-400 text-xs mb-6 font-medium leading-relaxed">Stay updated with latest scholarship alerts and educational news.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all font-medium text-sm placeholder:text-slate-600"
                            />
                            <button className="premium-gradient text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-sky-900/20 hover:shadow-sky-600/20 hover:-translate-y-0.5" type="button">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest text-slate-500 uppercase">
                    <p>&copy; {new Date().getFullYear()} PRO EDUXON LLP</p>
                    <p className="flex items-center gap-2">Crafted for <span className="text-sky-600">Your Future</span></p>
                </div>
            </div>
        </footer>
    );
}
