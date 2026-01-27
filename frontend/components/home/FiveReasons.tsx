"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck, Users, Zap, Building2, TrendingDown, Sparkles } from "lucide-react";

// ========== CONFIGURATION: 5 Reasons Data for Mobile ==========
const reasons = [
  {
    icon: FileCheck,
    title: "Verified & Genuine Scholarships",
    description: "Access 100% verified scholarships from trusted colleges and institutions.",
    color: "#06b6d4",
  },
  {
    icon: Users,
    title: "Expert Guidance at Every Step",
    description: "Our scholarship experts guide you personally at each step.",
    color: "#0ea5e9",
  },
  {
    icon: Zap,
    title: "Quick & Hassle - Free Process",
    description: "Apply for multiple scholarships through a simple, time saving process.",
    color: "#3b82f6",
  },
  {
    icon: Building2,
    title: "Trusted by Top Colleges & Universities",
    description: "Partnered with 250+ leading institutions ensuring better acceptance.",
    color: "#8b5cf6",
  },
  {
    icon: TrendingDown,
    title: "Reduce Your Education Cost",
    description: "Get scholarships ranging from 10% to 100%, lowering your tuition fees.",
    color: "#a855f7",
  },
];

export default function FiveReasons() {
  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 md:py-20 overflow-hidden">
      
      {/* ========== DESKTOP LAYOUT: Use Image ========== */}
      <div className="hidden lg:block relative w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <img 
            src="/images/5 reasons.jpeg" 
            alt="5 Reasons to Apply for Scholarships on Confirm Scholarship"
            className="w-full h-auto object-contain rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* ========== MOBILE/TABLET LAYOUT: Unique Card Design ========== */}
      <div className="lg:hidden container mx-auto px-4">
        
        {/* Mobile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          {/* Sparkles Icon */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-lg mb-4"
          >
            <Sparkles className="text-white w-7 h-7" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
            5 REASONS
          </h2>
          
          {/* Decorative Bars */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1.5 w-10 bg-cyan-400 rounded-full" />
            <div className="h-1.5 w-10 bg-blue-400 rounded-full" />
            <div className="h-1.5 w-10 bg-purple-500 rounded-full" />
          </div>
          
          <p className="text-slate-600 font-medium text-base">
            to apply for scholarships on
          </p>
          <p className="text-brand-magenta font-bold text-xl">
            Confirm Scholarship
          </p>
        </motion.div>

        {/* Mobile Cards - Alternating Layout */}
        <div className="space-y-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`flex items-start gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Icon Badge */}
                <div 
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="text-white w-8 h-8 stroke-[2.5]" />
                </div>

                {/* Card Content */}
                <div className={`flex-1 bg-white rounded-2xl p-5 shadow-lg border border-slate-100 ${isEven ? 'text-left' : 'text-right'}`}>
                  <div 
                    className={`w-8 h-1 rounded-full mb-3 ${isEven ? '' : 'ml-auto'}`}
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="text-slate-900 font-bold text-base mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-purple-50 px-6 py-3 rounded-full border-2 border-purple-200">
            <Sparkles className="text-purple-500 w-5 h-5" />
            <span className="text-slate-700 font-bold text-sm">
              Start Your Scholarship Journey Today!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
