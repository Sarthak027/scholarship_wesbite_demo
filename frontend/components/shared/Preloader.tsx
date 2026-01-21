"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            // Add a slight artificial delay for the animation to finish gracefully
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                >
                    <div className="relative">
                        {/* Outer Glow */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-brand-magenta/20 blur-3xl rounded-full"
                        />

                        {/* Loading Logo/Icon */}
                        <div className="flex flex-col items-center gap-6 relative z-10">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-16 h-16 bg-brand-magenta rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-brand-magenta/40">
                                    C
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-brand-navy tracking-tighter leading-none">
                                        CONFIRM
                                    </span>
                                    <span className="text-brand-magenta font-black text-sm tracking-[0.2em] leading-none mt-1">
                                        SCHOLARSHIP
                                    </span>
                                </div>
                            </motion.div>

                            {/* Progress Bar */}
                            <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="w-full h-full bg-gradient-to-r from-brand-magenta to-brand-navy"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
