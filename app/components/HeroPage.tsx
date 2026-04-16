"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flash } from 'iconsax-react';
import Link from 'next/link';

const HeroPage = () => {
    return (
        <section className="relative min-h-screen pt-40 pb-20 px-6 flex flex-col items-center bg-[#020617] overflow-hidden">
            {/* Background Radial Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[#0F766E]/10 blur-[120px] rounded-full pointer-events-none"
            />

            {/* Changed to max-w-7xl to match wide Navbars */}
            <div className="max-w-7xl w-full mx-auto text-center z-10">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-white/10 mb-8"
                >
                    <Flash size="14" color="#14B8A6" variant="Bold" />
                    <span className="text-xs font-semibold text-[#14B8A6] uppercase tracking-widest">
                        AI-Powered Command Center
                    </span>
                </motion.div>

                {/* Headline with Emphasis Highlight */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold text-[#E2E8F0] mb-6 leading-[1.1] tracking-tight"
                >
                    Your Social Sales <br />
                    <span className="relative inline-block mt-2">
                        On
                        <span className="relative underline decoration-[#0F766E] z-10 px-4 py-1 italic bg-gradient-to-r from-[#14B8A6] to-[#0F766E] bg-clip-text text-transparent">
                            Autopilot.
                        </span>

                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-[#94A3B8] text-lg  max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Konversa centralizes your WhatsApp, IG, and TikTok sales into one dashboard.
                    Respond faster, track orders, and build trust, <span className="text-[#E2E8F0] font-semibold">all in one place.</span>
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-center gap-4 mb-16 sm:mb-24 "
                >
                    <Link href='/waitlist'>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-2.5 rounded-full bg-[#0F766E] hover:bg-[#115E59] text-white font-bold justify-center flex items-center gap-2 transition-all shadow-xl shadow-teal-900/20 group w-full md:w-auto"
                        >
                            Start Free Pilot
                            <ArrowRight size="18" className="group-hover:translate-x-1 transition-transform " color='white' />
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-2.5 rounded-full bg-transparent border border-[#334155] text-[#E2E8F0] font-bold hover:bg-[#334155]/20 transition-all w-full md:w-auto"
                    >
                        Watch Demo
                    </motion.button>
                </motion.div>

                {/* Dashboard Preview - Responsive Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="w-full max-w-7xl mx-auto "
                >
                    <div className="p-1.5 md:p-2 rounded-lg bg-linear-to-b from-[#334155]/50 to-transparent border border-white/10 shadow-[0_20px_50px_rgba(15,118,110,0.15)]">
                        <div className="rounded-xl overflow-hidden bg-[#0F172A] border border-white/5 flex flex-col min-h-[300px] md:aspect-video">

                            {/* UI Top Bar */}
                            <div className="h-10 md:h-12 border-b border-white/5 bg-[#1E293B]/30 flex items-center px-4 md:px-6 justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/40" />
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/40" />
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/40" />
                                </div>
                                {/* Simplified URL bar for mobile */}
                                <div className="h-4 md:h-5 w-24 md:w-40 bg-[#1E293B] rounded-full" />
                                <div className="w-5 h-5 md:w-6 md:h-6 bg-[#1E293B] rounded-md" />
                            </div>

                            {/* Main App Workspace - Responsive Grid */}
                            <div className="flex-1 p-4 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 text-left">

                                {/* Sidebar - Horizontal on Mobile, Vertical on Desktop */}
                                <div className="flex md:flex-col md:col-span-3 gap-2 md:space-y-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-6 md:h-8 min-w-[80px] md:w-full bg-[#1E293B]/60 rounded-lg flex-shrink-0" />
                                    ))}
                                    {/* Hide extra items on mobile to save space */}
                                    <div className="hidden md:block h-8 w-full bg-[#1E293B]/60 rounded-lg" />
                                    <div className="hidden md:block h-8 w-full bg-[#1E293B]/60 rounded-lg" />
                                </div>

                                {/* Main Content Area */}
                                <div className="flex-1 md:col-span-9 bg-[#1E293B]/10 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center p-6 md:p-10 text-center">
                                    <span className="text-lg md:text-xl font-bold text-[#E2E8F0] tracking-tight">
                                        Konversa<span className="text-[#14B8A6]">.</span>
                                    </span>
                                    <p className="text-[10px] text-gray-400 md:text-xs font-mono tracking-widest uppercase opacity-50 mt-1">
                                        Omnichannel_Sync_Active
                                    </p>

                                    {/* Mobile-only "activity" lines to make it look like an app */}
                                    <div className="mt-6 w-full space-y-2 md:hidden">
                                        <div className="h-2 w-3/4 bg-white/5 rounded mx-auto" />
                                        <div className="h-2 w-1/2 bg-white/5 rounded mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroPage;