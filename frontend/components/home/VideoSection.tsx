"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function VideoSection() {
    const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/1ZQFppefWGM?cc_load_policy=1");

    // Helper to convert any YouTube URL to embed format
    const formatYouTubeUrl = (url: string) => {
        if (!url) return "";

        // Extract video ID using regex for all common patterns
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?cc_load_policy=1&rel=0`;
        }

        // If it's already an embed URL but regex didn't match perfectly, just use it
        if (url.includes("/embed/")) {
            return url;
        }

        return url;
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.settings.get();
                if (response.success && response.data.youtubeVideoUrl) {
                    setVideoUrl(formatYouTubeUrl(response.data.youtubeVideoUrl));
                }
            } catch (error) {
                console.error("Failed to fetch video settings:", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-8">
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 aspect-video"
                >
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={videoUrl}
                        title="Confirm Scholarship Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}
