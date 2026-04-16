"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shop, ArrowRight, TickCircle, Whatsapp, DirectInbox, Instagram, Facebook, ArrowLeft, Send2, VideoPlay  } from 'iconsax-react';
import Link from 'next/link';

const WaitlistPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

const socialPlatforms = [
    { id: 'whatsapp', label: 'WhatsApp', icon: <Whatsapp size="14" color='white' /> },
    { id: 'instagram', label: 'Instagram', icon: <Instagram size="14" color='white' /> },
    { id: 'telegram', label: 'Telegram', icon: <Send2 size="14" color='white' /> },
    { id: 'tiktok', label: 'TikTok', icon: <VideoPlay size="14" color='white' /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Back Button */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-[#64748B] hover:text-[#14B8A6] transition-colors group z-20">
        <ArrowLeft size="20" className="group-hover:-translate-x-1 transition-transform" color='#64748B' />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
      </Link>

      <div className="max-w-xl w-full relative z-10 py-20">
        {!submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 sm:p-8 rounded-lg bg-[#0F172A] border border-white/5 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Exclusive Pilot Access
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#E2E8F0] mb-4 tracking-tight">
                Secure your spot <br /> for the <span className="italic text-white">Ekiti Pilot.</span>
              </h1>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Join vendors in Ekiti moving their sales to autopilot. We're launching in batches to ensure every vendor gets 1-on-1 setup support.
              </p>
            </div>

            {/* Waitlist Form */}

<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Name Input */}
  <div className="relative col-span-1">
    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size="18" color='white' />
    <input 
      required
      type="text" 
      placeholder="Full Name" 
      className="w-full bg-[#1E293B] border border-white/5 rounded-lg py-3 pl-12 pr-4 text-[#E2E8F0] placeholder:text-[#64748B] outline-none focus:border-[#14B8A6]/50 transition-all text-sm"
    />
  </div>

  {/* Business Name Input */}
  <div className="relative col-span-1">
    <Shop className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size="18" color='white' />
    <input 
      required
      type="text" 
      placeholder="Business Name" 
      className="w-full bg-[#1E293B] border border-white/5 rounded-lg py-3 pl-12 pr-4 text-[#E2E8F0] placeholder:text-[#64748B] outline-none focus:border-[#14B8A6]/50 transition-all text-sm"
    />
  </div>

  {/* Email Input */}
  <div className="relative col-span-1">
    <DirectInbox className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size="18" color='white' />
    <input 
      type="email" 
      placeholder="Email Address" 
      className="w-full bg-[#1E293B] border border-white/5 rounded-lg py-3 pl-12 pr-4 text-[#E2E8F0] placeholder:text-[#64748B] outline-none focus:border-[#14B8A6]/50 transition-all text-sm"
    />
  </div>

  {/* WhatsApp Input */}
  <div className="relative col-span-1">
    <Whatsapp className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size="18" color='white' />
    <input 
      type="text" 
      placeholder="WhatsApp Number" 
      className="w-full bg-[#1E293B] border border-white/5 rounded-lg py-3 pl-12 pr-4 text-[#E2E8F0] placeholder:text-[#64748B] outline-none focus:border-[#14B8A6]/50 transition-all text-sm"
    />
  </div>

  {/* Social Channels Selection - FIXED COL SPAN */}
  <div className="col-span-1 sm:col-span-2 mt-2">
    <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-widest mb-3">Which Platform Do You Use ?</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {socialPlatforms.map((platform) => {
        const isSelected = selectedPlatforms.includes(platform.id);
        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => togglePlatform(platform.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
              isSelected 
                ? 'bg-[#14B8A6]/10 border-[#14B8A6]' 
                : 'bg-[#1E293B] border-white/5 hover:border-white/20'
            }`}
          >
            <span className={`${isSelected ? 'text-[#14B8A6]' : 'text-[#E2E8F0]'} text-[10px] sm:text-xs flex items-center gap-1.5 font-medium whitespace-nowrap`}>
              {platform.icon}
              {platform.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>

  {/* Submit Button - FIXED COL SPAN */}
  <button 
    type="submit"
    className="w-full bg-[#0F766E] text-[#E2E8F0] font-black py-3 rounded-lg transition-all flex items-center justify-center gap-2 group mt-4 col-span-1 sm:col-span-2"
  >
    Join the Waitlist
    <ArrowRight size="18" color='white' className="group-hover:translate-x-1 transition-transform" />
  </button>
</form>

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-center items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F172A] bg-[#1E293B]" />
                ))}
              </div>
              <p className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">
                +142 vendors already in line
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-5 sm:p-12 rounded-lg bg-[#0F172A] border border-[#14B8A6]/30"
          >
            <div className="w-20 h-20 bg-[#14B8A6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TickCircle size="48" color="#14B8A6" variant="Bold" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">You're on the list!</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              Thanks for joining the Konversa Pilot. We'll reach out to your business soon to begin your automated sales journey.
            </p>
            <Link 
              href="/"
              className="mt-8 inline-block text-[#14B8A6] font-bold text-sm hover:underline"
            >
              Back to Home
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WaitlistPage;