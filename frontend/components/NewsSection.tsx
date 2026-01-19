"use client";

import Link from "next/link";

const newsOutlets = [
    { name: "Forbes India", logoUrl: "/Forbes India.png" },
    { name: "Dailyhunt", logoUrl: "/Dailyhunt.png" },
    { name: "Republic NewsIndia", logoUrl: "/Republic NewsIndia.png" },
    { name: "Hindustan Times", logoUrl: "/Hindustan Times.png" },
];

export default function NewsSection() {
    return (
        <section className="py-24 bg-slate-light/50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-dark mb-6 leading-tight">
                    We Are Featured In <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">The News!</span>
                </h2>
                <p className="text-gray-600 font-medium max-w-2xl mx-auto mb-12">
                    Empowering students across India with verified scholarships and genuine career guidance.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
                    {newsOutlets.map((outlet) => (
                        <div
                            key={outlet.name}
                            className="bg-white/80 backdrop-blur-sm px-8 py-8 rounded-2xl soft-shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full flex items-center justify-center h-32 border border-slate-100 group"
                        >
                            {/* Logo fallback */}
                            <img
                                src={outlet.logoUrl}
                                alt={outlet.name}
                                className="max-h-16 max-w-[90%] object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <span className="hidden font-serif text-xl font-bold text-gray-800">{outlet.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
