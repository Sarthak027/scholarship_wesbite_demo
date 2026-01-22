"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Rocket, Eye, EyeOff, Sparkles } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await api.auth.login(username, password);
            localStorage.setItem("adminToken", data.token);
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.message || "Could not connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-magenta via-brand-magenta/90 to-brand-navy relative overflow-hidden">
                {/* Decorative wave pattern */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-navy/20 to-transparent">
                    <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-white/10" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="mb-8"
                    >
                        <div className="relative">
                            {/* Main Rocket Icon */}
                            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                                <Rocket className="text-white" size={64} />
                            </div>
                            {/* Sparkle Icons */}
                            <div className="absolute -top-2 -left-2">
                                <Sparkles className="text-white/80" size={20} />
                            </div>
                            <div className="absolute -top-2 -right-2">
                                <Sparkles className="text-white/80" size={20} />
                            </div>
                            <div className="absolute -bottom-2 -left-2">
                                <Sparkles className="text-white/80" size={20} />
                            </div>
                            <div className="absolute -bottom-2 -right-2">
                                <Sparkles className="text-white/80" size={20} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-black mb-4 tracking-wide">CONFIRM SCHOLARSHIP</h2>
                        <p className="text-white/90 text-lg font-medium max-w-md">
                            Empowering students across India with verified scholarships and genuine career guidance.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo - Only visible on small screens */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-magenta to-brand-navy rounded-xl mb-4">
                            <Rocket className="text-white" size={32} />
                        </div>
                        <h1 className="text-2xl font-black bg-gradient-to-r from-brand-magenta to-brand-navy bg-clip-text text-transparent">
                            Confirm Scholarship
                        </h1>
                    </div>

                    {/* Login Form */}
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Members Log In</h1>
                        <p className="text-slate-500 text-sm mb-8">Sign in to access the admin portal</p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Username Field */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border-b-2 border-slate-200 bg-transparent focus:border-brand-magenta outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 border-b-2 border-slate-200 bg-transparent focus:border-brand-magenta outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 rounded border-slate-300 text-brand-magenta focus:ring-brand-magenta focus:ring-offset-0"
                                />
                                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                                    Remember Me?
                                </label>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded"
                                >
                                    <p className="text-rose-700 text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-magenta hover:bg-brand-magenta/90 text-white font-bold py-3.5 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <span>Log In</span>
                                )}
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-center text-sm text-slate-500 mb-4">
                                Don't have an account?{" "}
                                <a href="#" className="text-brand-magenta font-semibold underline hover:text-brand-navy transition-colors">
                                    Contact Administrator
                                </a>
                            </p>
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                <span>Protected by secure authentication</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
