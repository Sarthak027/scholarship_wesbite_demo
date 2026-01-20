"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:5005/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                router.push("/admin/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Could not connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200 p-8 border border-slate-100"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Portal</h1>
                    <p className="text-slate-500">Sign in to manage ConfirmScholarship</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-rose-500 text-sm font-medium bg-rose-50 p-3 rounded-lg border border-rose-100">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sky-primary hover:bg-sky-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-100 transition-all disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "SIGN IN"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
