"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Setting5, 
  MessageSearch, 
  BoxTick, 
  StatusUp, 
  FingerScan, 
  GlobalSearch 
} from 'iconsax-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "Omnichannel Sync",
    description: "Unify your WhatsApp, Instagram, Telegram and TikTok DMs. Manage every conversation and order from a single, high-speed command center.",
    icon: <GlobalSearch size="32" variant="Bulk" color="#14B8A6" />,
  },
  {
    title: "AI Sales Agent",
    description: "A digital brain trained on your catalog. It handles pricing, product details, and stock inquiries instantly, 24/7.",
    icon: <MessageSearch size="32" variant="Bulk" color="#14B8A6" />,
  },
  {
    title: "Automated Escrow",
    description: "Secure payment links that protect you from fake alerts. Funds are verified and held safely until delivery is confirmed.",
    icon: <FingerScan size="32" variant="Bulk" color="#14B8A6" />,
  },
  {
    title: "Inventory Intelligence",
    description: "Update a product once, and it syncs across all social channels. Never oversell or lose track of stock levels again.",
    icon: <BoxTick size="32" variant="Bulk" color="#14B8A6" />,
  },
  {
    title: "Performance Analytics",
    description: "Track which social channel brings the most revenue. Get deep insights into customer behavior and peak sales hours.",
    icon: <StatusUp size="32" variant="Bulk" color="#14B8A6" />,
  },
  {
    title: "Workflow Automation",
    description: "Automate delivery dispatch notifications and customer follow-ups. Build a professional brand experience without the extra headcount.",
    icon: <Setting5 size="32" variant="Bulk" color="#14B8A6" />,
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-[#020617] px-6 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#14B8A6]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 mt-10 mb-10 sm:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[#14B8A6] font-mono text-xs tracking-[0.3em] uppercase mb-4">WHAT WE OFFER</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#E2E8F0] leading-tight">
              Everything you need to <span className="text-white italic">scale social commerce.</span>
            </h3>
          </div>
          <p className="text-[#94A3B8] max-w-sm text-sm md:text-base mb-2">
            Professional tools designed for the modern vendor who values time and trust.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="group p-8 rounded-lg bg-[#0F172A] border border-white/5 hover:border-[#14B8A6]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#1E293B] flex items-center justify-center mb-6 group-hover:bg-[#14B8A6]/10 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-[#E2E8F0] mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h4>
                <p className="text-[#94A3B8] text-sm leading-relaxed group-hover:text-[#CBD5E1] transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;