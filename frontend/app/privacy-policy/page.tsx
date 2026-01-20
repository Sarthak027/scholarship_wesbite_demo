import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-slate-dark relative overflow-hidden text-white pt-32 pb-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl opacity-30" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Privacy Policy</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
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
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center"><Eye size={20} /></span>
                                Information We Collect
                            </h2>
                            <div className="space-y-4 pl-4 border-l-2 border-slate-100">
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">Personal Information</h3>
                                    <p>When you register on our website, subscribe to our newsletter, or fill out a form, we may collect personal information such as your name, email address, phone number, and other relevant details.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">Non-Personal Information</h3>
                                    <p>We may also collect non-personal information such as browser type, device type, IP address, and browsing behavior to help us understand how our visitors use our website.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center"><Globe size={20} /></span>
                                How We Use Your Information
                            </h2>
                            <ul className="list-disc list-outside ml-6 space-y-2 marker:text-sky-500">
                                <li><strong className="text-slate-800">To Improve Our Website:</strong> We continually strive to improve our website offerings based on the information and feedback we receive from you.</li>
                                <li><strong className="text-slate-800">To Personalize Your Experience:</strong> Your information helps us to better respond to your individual needs.</li>
                                <li><strong className="text-slate-800">To Process Transactions:</strong> Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested.</li>
                                <li><strong className="text-slate-800">To Send Periodic Emails:</strong> The email address you provide may be used to send you information, respond to inquiries, and/or other requests or questions.</li>
                            </ul>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center"><Shield size={20} /></span>
                                How We Protect Your Information
                            </h2>
                            <p>
                                We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. These measures include encryption, firewalls, and secure servers.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center"><Lock size={20} /></span>
                                Cookies
                            </h2>
                            <p className="mb-4">
                                Our website uses cookies to enhance user experience. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information.
                            </p>
                            <p>
                                You can choose to disable cookies through your browser settings. However, disabling cookies may affect your ability to use certain features on our website.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Third-Party Disclosure</h2>
                            <p>
                                We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Third-Party Links</h2>
                            <p>
                                Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
                            </p>
                        </section>

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Changes to Our Privacy Policy</h2>
                            <p>
                                ConfirmScholarship.com reserves the right to update or change our Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        {/* Contact Section */}
                        <section className="bg-sky-50 p-8 rounded-2xl border border-sky-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Contact Us</h2>
                            <p className="mb-4 text-sm font-medium">If you have any questions about this Privacy Policy, please contact us at:</p>
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
