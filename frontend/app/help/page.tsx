import Link from "next/link";
import { ArrowLeft, MessageCircle, Share2, PenTool, Heart } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-slate-dark relative overflow-hidden text-white pt-24 md:pt-32 pb-16 md:pb-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl opacity-30" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Help Us Grow</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Your assistance can help us improve and expand our services to reach more students in need.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <main className="container mx-auto px-4 md:px-6 py-16">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <Link href="/" className="inline-flex items-center gap-2 text-sky-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>

                    <p className="text-lg text-slate-500 font-medium mb-12">
                        At ConfirmScholarship.com, we are dedicated to providing valuable resources and support to students seeking scholarships and educational opportunities. Here’s how you can help.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Card */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MessageCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Provide Feedback</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                Your feedback is invaluable to us. Share your thoughts on how we can enhance our website, services, and resources. Whether you have suggestions for new features, notice any issues, or simply want to share your experience, we want to hear from you.
                            </p>
                        </div>

                        {/* Card */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Share2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Spread the Word</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                Help us reach more students by sharing ConfirmScholarship.com with your friends, family, and social networks. Follow us on our social media platforms and share our posts to raise awareness about the opportunities and resources we provide.
                            </p>
                        </div>

                        {/* Card */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <PenTool size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Contribute Content</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                Are you knowledgeable about scholarships, educational opportunities, or financial aid? Consider contributing articles, guides, or tips to our website. Your expertise can help guide students in their journey towards securing scholarships and educational success.
                            </p>
                        </div>

                        {/* Card */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Volunteer with Us</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                If you are passionate about education and want to make a difference, consider volunteering with us. We have various opportunities for you to get involved, from content creation to outreach efforts. Your time and skills can significantly impact students’ lives.
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <section className="bg-slate-800 text-white p-8 rounded-2xl text-center">
                        <h2 className="text-2xl font-bold mb-4">Ready to help?</h2>
                        <p className="mb-6 text-slate-300 font-medium">If you are interested in helping us in any way, please reach out to us.</p>
                        <a href="mailto:help@confirmscholarship.com" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-sky-50 transition-colors">
                            help@confirmscholarship.com
                        </a>
                    </section>

                </div>
            </main>
        </div>
    );
}
