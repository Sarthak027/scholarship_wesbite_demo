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
        return <>{children}</>;
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
