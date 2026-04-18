"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageTick, Location, ShieldTick, Translate } from 'iconsax-react';

interface FeatureCard {
  title: string;
  description: string;
  slang: string;
  interpretation: string;
  icon: React.ReactNode;
}

const features: FeatureCard[] = [
  {
    title: "Slang-Aware Engine",
    description: "Generic AI fails at Nigerian nuance. Konversa is trained on thousands of vendor chats to understand 'Abeg', 'How much last', and price bargaining.",
    slang: "“How much last? I wan buy plenty.”",
    interpretation: "Intent: Price Negotiation | Quantity: Bulk",
    icon: <Translate size="24" color="#14B8A6" variant="Bulk" />
  },
  {
    title: "National Logistics Intelligence",
    description: "Built-in intelligence for Nigerian landmarks. From Lagos to Abuja, we make delivery tracking seamless for social vendors.",
    slang: "“I dey side Ojuelegba, near the big bus stop.”",
    interpretation: "Coordinate: Surulere | Landmark: Transport Hub",
    icon: <Location size="24" color="#14B8A6" variant="Bulk" />
  },
  {
    title: "Payment Trust Layer",
    description: "Automated 'Fake Alert' detection and secure escrow. We turn messy chats into professional receipts and verified transaction logs.",
    slang: "“Aza sent. Send receipt make I deliver.”",
    interpretation: "Status: Awaiting Verification | Escrow: Locked",
    icon: <ShieldTick size="24" color="#14B8A6" variant="Bulk" />
  }
];

const TheLocalContext: React.FC = () => {
  return (
    <section className="relative py-10 sm:py-24 bg-[#020617] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-[#14B8A6]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-16 items-center">
          
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="lg:pl-10"
           >
            <h2 className="text-[#14B8A6] font-mono text-sm tracking-[0.3em] uppercase mb-4">Localized Intelligence</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-[#E2E8F0] mb-8 leading-tight">
              AI that speaks <br /> 
              <span className="text-white italic underline decoration-[#0F766E] decoration-4 underline-offset-8">the street.</span>
            </h3>
            <p className="text-[#94A3B8] text-sm sm:text-lg leading-relaxed mb-8">
              Generic AI doesn't understand the nuance of a Nigerian marketplace. Konversa knows thousands of real business conversations to identify order intent, location landmarks, and payment slang.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-lg bg-gradient-to-br from-[#1E293B] to-transparent border border-white/5"
              >
                <p className="text-3xl font-bold text-[#14B8A6] mb-1">98%</p>
                <p className="text-xs text-[#64748B] uppercase font-bold tracking-tighter">Slang Accuracy</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-lg bg-gradient-to-br from-[#1E293B] to-transparent border border-white/5"
              >
                <p className="text-3xl font-bold text-[#14B8A6] mb-1">24/7</p>
                <p className="text-xs text-[#64748B] uppercase font-bold tracking-tighter">Availability</p>
              </motion.div>
            </div>
          </motion.div>
       
          <div className="relative">
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-6 rounded-lg bg-[#0F172A] border border-white/5 relative group hover:border-[#14B8A6]/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#1E293B] group-hover:bg-[#14B8A6]/10 transition-colors">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-[#E2E8F0] font-bold mb-1">{f.title}</h4>
                      <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{f.description}</p>
                      
                      {/* Interpretation UI */}
                      <div className="space-y-2">
                        <div className="px-3 py-2 rounded-lg bg-[#020617] border border-white/5 flex items-center gap-2">
                          <MessageTick size="14" color="#64748B" />
                          <span className="text-xs font-mono text-[#64748B] italic">{f.slang}</span>
                        </div>
                        <div className="px-3 py-2 rounded-lg bg-[#14B8A6]/5 border border-[#14B8A6]/10 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
                          <span className="text-xs font-mono text-[#14B8A6]">{f.interpretation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

   
         

        </div>
      </div>
    </section>
  );
};

export default TheLocalContext;