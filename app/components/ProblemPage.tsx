"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageRemove, Timer1, Bill, Danger } from 'iconsax-react';
import Link from 'next/link';

const ProblemPage = () => {
  const problems = [
    {
      title: "The Response Gap",
      desc: "Customers expect instant replies. A 30-minute delay in replying to a 'How much?' message often means the customer has moved on to another vendor.",
      icon: <Timer1 size="32" color="#14B8A6" variant="Bulk" />,
    },
    {
      title: "Fragmented Workflow",
      desc: "Manually uploading the same product photo, description, and price across WhatsApp, Instagram, and Telegram is slow and leads to pricing mistakes.",
      icon: <MessageRemove size="32" color="#14B8A6" variant="Bulk" />,
    },
    {
      title: "Order Leakage & Chaos",
      desc: "Orders get buried in long chat histories. Relying on paper notebooks or screenshots to track payments and deliveries is a recipe for missed sales.",
      icon: <Bill size="32" color="#14B8A6" variant="Bulk" />,
    },
    {
      title: "The Trust Deficit",
      desc: "Online fraud is a major fear. Buyers are scared of 'What I ordered vs. What I got', and sellers are tired of falling for fake credit alerts.",
      icon: <Danger size="32" color="#14B8A6" variant="Bulk" />,
    }
  ];

  return (
    <section id="features" className="sm:py-24 px-6 max-w-7xl mx-auto bg-[#020617] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0F766E]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#14B8A6] font-semibold tracking-widest uppercase text-sm mb-4"
          >
            The Struggle is Real
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#E2E8F0] max-w-3xl mx-auto leading-tight"
          >
            Stop losing money to <span className="italic text-white underline decoration-[#0F766E]">manual processes.</span>
          </motion.h3>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-lg bg-[#0F172A] border border-white/5 hover:border-[#14B8A6]/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#1E293B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {problem.icon}
              </div>
              <h4 className="text-xl font-bold text-[#E2E8F0] mb-4">
                {problem.title}
              </h4>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Solution Bridge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-lg bg-[#1E293B]/30 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <h4 className="text-2xl font-bold text-[#E2E8F0] mb-2">Ready to switch to professional selling?</h4>
            <p className="text-[#94A3B8] text-sm">Join the pilot program in Ekiti and let Konversa handle the stress while you focus on scaling.</p>
          </div>
          <Link href="/waitlist">
            <button className="whitespace-nowrap px-8 py-2.5 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] font-bold hover:bg-[#14B8A6] hover:text-[#020617] transition-all w-full sm:w-auto">
              Join the Waitlist
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemPage;