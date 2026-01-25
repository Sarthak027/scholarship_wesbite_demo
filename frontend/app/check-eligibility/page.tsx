import { Metadata } from "next";
import EligibilityChecker from "@/components/home/EligibilityChecker";
import { CheckCircle2, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Check Your Scholarship Eligibility | Confirm Scholarship",
    description: "Calculate your scholarship amount based on your academic scores and entrance exam performance. Get up to ₹6 Lakh scholarship for MBA, B.Tech, BBA and more.",
};

const featureBadges = [
    { icon: CheckCircle2, text: "Guaranteed Placement Support" },
    { icon: Users, text: "50+ Global Campus Partners" },
    { icon: BookOpen, text: "Industry-Integrated Curriculum" }
];

export default function CheckEligibilityPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Header */}
            <section className="relative bg-gradient-to-b from-brand-deep-navy via-brand-navy to-brand-deep-navy pt-32 pb-40 overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-magenta/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Unlock Your <span className="text-yellow-400">Scholarship</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            Whether it's <span className="text-white font-bold">B.Tech, MBA, or BBA</span>, get up to{" "}
                            <span className="text-yellow-400 font-bold">₹6 Lakh</span> based on your merit.
                            <br />
                            Bridging the gap between your potential and your future career.
                        </p>

                        {/* Feature Badges - Uniform & Highlighted */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto sm:max-w-none">
                            {featureBadges.map((badge, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/40 px-6 py-3 rounded-full w-full sm:w-auto hover:bg-white/20 transition-all duration-300 shadow-lg"
                                >
                                    <badge.icon className="w-5 h-5 text-emerald-400 shrink-0" />
                                    <span className="text-white text-xs font-black uppercase tracking-[0.15em] leading-none">{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Curved Bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="#f8fafc"
                        />
                    </svg>
                </div>
            </section>

            {/* Eligibility Form Section */}
            <section className="relative -mt-24 pb-24">
                <div className="container mx-auto px-4">
                    <EligibilityChecker />
                </div>
            </section>
        </main>
    );
}
