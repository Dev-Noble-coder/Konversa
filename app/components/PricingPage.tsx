"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TickCircle } from 'iconsax-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: "The Free Tier",
    price: "Free",
    description: "Perfect for new starters to get a feel for the platform.",
    features: [
      "Limited product uploads",
      "Basic inventory tracking",
      "1 Social Channel Sync",
      "Manual order logging",
    ],
    isPopular: false,
    cta: "Get Started",
  },
  {
    name: "Starter Plan",
    price: "₦5,000",
    description: "Designed for growing shops ready to automate and scale.",
    features: [
      "AI Auto-replies",
      "Full Order Management",
      "Post across multiple platforms",
      "Telegram & WhatsApp Sync",
      "Standard Logistics Support",
    ],
    isPopular: true,
    cta: "Join the Pilot",
  },
  {
    name: "Growth Plan",
    price: "₦15,000",
    description: "For 'Power Sellers' needing advanced analytics and CRM tools.",
    features: [
      "Advanced AI features",
      "Detailed Sales Analytics",
      "CRM (Manage repeat customers)",
      "Logistics Partner Commissions",
      "Priority 24/7 Support",
    ],
    isPopular: false,
    cta: "Scale Your Business",
  },
];

const PricingPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 bg-[#020617] px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#14B8A6]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header & Toggle */}
        <div className="text-center mb-20">
          <h2 className="text-[#14B8A6] font-mono text-xs tracking-[0.3em] uppercase mb-4">Pricing Plans</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-[#E2E8F0] mb-8">
            Simple, transparent <br /> <span className="text-white italic">investment.</span>
          </h3>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-[#E2E8F0]' : 'text-[#64748B]'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-[#1E293B] p-1 flex items-center relative transition-colors"
            >
              <motion.div 
                animate={{ x: isYearly ? 24 : 0 }}
                className="w-4 h-4 rounded-full bg-[#14B8A6] shadow-[0_0_10px_#14B8A6]"
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-[#E2E8F0]' : 'text-[#64748B]'}`}>Yearly <span className="text-[#14B8A6] text-[10px] font-bold ml-1">(SAVE 20%)</span></span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-lg border transition-all duration-300 flex flex-col ${
                tier.isPopular 
                ? 'bg-[#0F172A] border-[#14B8A6]/50 shadow-[0_0_30px_rgba(20,184,166,0.1)] scale-105 z-10' 
                : 'bg-[#0F172A]/50 border-white/5 hover:border-white/10'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#14B8A6] text-[#020617] text-[10px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-[#94A3B8] font-bold text-sm uppercase tracking-widest mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#E2E8F0]">{tier.price}</span>
                  {tier.price !== "Free" && (
                    <span className="text-[#64748B] text-sm">/month</span>
                  )}
                </div>
                <p className="mt-4 text-[#94A3B8] text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    <TickCircle size="18" color={tier.isPopular ? "#14B8A6" : "#64748B"} variant="Bold" />
                    <span className="text-[#E2E8F0] text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-full font-bold transition-all ${
                tier.isPopular 
                ? 'bg-[#14B8A6] text-[#020617] hover:bg-[#0F766E]' 
                : 'bg-[#1E293B] text-[#E2E8F0] hover:bg-[#2D3748]'
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Platform Fees / Footnote */}
        <div className="mt-16 p-6 rounded-xl bg-[#0F172A]/30 border border-white/5 text-center">
            <h5 className="text-[#E2E8F0] font-bold text-sm uppercase tracking-widest mb-4">Transparent Platform Fees</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-1">
                    <p className="text-[#14B8A6] font-bold text-lg">1.0% – 2.5%</p>
                    <p className="text-[#94A3B8] text-xs">Transaction fee on successful secure payments.</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[#14B8A6] font-bold text-lg">₦200 – ₦500</p>
                    <p className="text-[#94A3B8] text-xs">Flat Escrow "Trust Fee" for buyer protection.</p>
                </div>
            </div>
          <p className="mt-8 text-[#64748B] text-xs">
            *Pilot prices are fixed for the first 100 vendors. No hidden charges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;