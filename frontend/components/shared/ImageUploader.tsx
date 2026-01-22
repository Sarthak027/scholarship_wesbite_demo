"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { getAssetUrl } from "@/lib/assets";

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export default function ImageUploader({ value, onChange, label = "Image", className = "" }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await uploadImage(file);
    };

    const uploadImage = async (file: File) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("You must be logged in to upload images");
            return;
        }

        try {
            setUploading(true);
            const data = await api.upload.image(file, token);
            onChange(data.url);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            await uploadImage(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    return (
        <div className={className}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>

            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-slate-200">
                    <img
                        src={getAssetUrl(value)}
                        alt="Uploaded preview"
                        className="w-full h-48 object-cover bg-slate-50"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white/90 p-2 rounded-lg hover:bg-white text-slate-700 transition"
                            title="Replace image"
                        >
                            <Upload size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="bg-white/90 p-2 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-600 transition"
                            title="Remove image"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all ${dragging
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-300 hover:border-purple-400 hover:bg-slate-50'
                        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    {uploading ? (
                        <>
                            <Loader2 size={24} className="text-purple-600 animate-spin mb-2" />
                            <span className="text-xs text-slate-500 font-medium">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2 text-slate-400 group-hover:text-purple-500">
                                <ImageIcon size={20} />
                            </div>
                            <span className="text-sm font-medium text-slate-600">Click to upload or drag & drop</span>
                            <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                        </>
                    )}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}
