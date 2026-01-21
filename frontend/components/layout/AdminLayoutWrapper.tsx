"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import Link from "next/link";
import Preloader from "../shared/Preloader";
import { motion } from "framer-motion";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) {
        return (
            <>
                <header className="bg-white border-b border-slate-100 py-4 px-8 sticky top-0 z-50">
                    <div className="flex items-center">
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-200">
                                C
                            </div>
                            <span className="text-xl font-black text-slate-dark tracking-tighter">
                                CONFIRM<span className="text-sky-600">SCHOLARSHIP</span>
                                <span className="ml-2 px-2 py-0.5 bg-slate-100 text-[10px] text-slate-500 rounded-md align-middle uppercase">Admin</span>
                            </span>
                        </Link>
                    </div>
                </header>
                <main className="min-h-screen bg-slate-50/50">
                    {children}
                </main>
            </>
        );
    }

    return (
        <>
            <Preloader />
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="min-h-screen"
            >
                {children}
            </motion.main>
            <Footer />
        </>
    );
}
