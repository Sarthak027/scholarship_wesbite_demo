"use client";

import Link from "next/link";
import { SearchCheck } from "lucide-react";

export default function RequestCheckBanner() {
    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-brand-navy to-indigo-900 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-magenta/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                    <div className="relative z-10 max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 mx-auto md:mx-0">
                            <SearchCheck size={14} />
                            <span>Scholarship Assistance</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                            Didn’t Find Your Scholarship?
                        </h2>
                        <p className="text-indigo-100 text-base md:text-lg font-medium max-w-xl">
                            Don't worry! We can help you find hidden opportunities. Request a custom manual check for your preferred college.
                        </p>
                    </div>

                    <div className="relative z-10 flex-shrink-0">
                        <Link
                            href="/request-check"
                            className="inline-flex items-center justify-center bg-white text-brand-navy hover:bg-indigo-50 font-bold py-4 px-8 rounded-xl shadow-xl transition-all transform hover:scale-105 active:scale-95 text-sm md:text-base uppercase tracking-wider"
                        >
                            Request a Check
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
