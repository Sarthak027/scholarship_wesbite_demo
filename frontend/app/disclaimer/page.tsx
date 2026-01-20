import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-slate-dark relative overflow-hidden text-white pt-24 md:pt-32 pb-16 md:pb-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Terms of Service</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Please read these terms and conditions carefully before using our website.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <main className="container mx-auto px-4 md:px-6 py-16">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <Link href="/" className="inline-flex items-center gap-2 text-sky-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>

                    <div className="space-y-12 text-slate-600 leading-relaxed">

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                                General Information
                            </h2>
                            <p>
                                The information provided on ConfirmScholarship.com is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                                Professional Advice
                            </h2>
                            <p>
                                The content on ConfirmScholarship.com does not constitute professional advice. It is intended for informational purposes only and should not be considered as a substitute for advice from qualified professionals. Always seek the guidance of a qualified professional with any questions you may have regarding scholarships, education, or financial aid.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                                External Links
                            </h2>
                            <p>
                                Through this website, you may be able to link to other websites that are not under the control of ConfirmScholarship.com. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                                Limitation of Liability
                            </h2>
                            <p>
                                In no event will ConfirmScholarship.com be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                                Changes to Content
                            </h2>
                            <p>
                                ConfirmScholarship.com reserves the right to make additions, deletions, or modification to the contents on the website at any time without prior notice.
                            </p>
                        </section>

                        {/* Contact Section */}
                        <section className="bg-sky-50 p-8 rounded-2xl border border-sky-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Contact Us</h2>
                            <p className="mb-4 text-sm font-medium">If you have any questions about this disclaimer, please contact us at:</p>
                            <a href="mailto:info@confirmscholarship.com" className="text-sky-600 font-bold text-lg hover:underline">
                                info@confirmscholarship.com
                            </a>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
}
