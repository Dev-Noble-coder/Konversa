"use client";
import React from 'react';
import { CloseCircle, TickCircle, InfoCircle } from 'iconsax-react';
import { motion } from 'framer-motion';

interface ComparisonRow {
  feature: string;
  manual: string;
  konversa: string;
  isPositive: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Response Time",
    manual: "30 mins - 4 hours",
    konversa: "Instant (Sub-second)",
    isPositive: true,
  },
  {
    feature: "Order Tracking",
    manual: "Scattered in DM chats",
    konversa: "Centralized Dashboard",
    isPositive: true,
  },
  {
    feature: "Payment Verification",
    manual: "Manual 'Fake Alert' checks",
    konversa: "Automated Escrow Sync",
    isPositive: true,
  },
  {
    feature: "Inventory Sync",
    manual: "Manual status updates",
    konversa: "Real-time Omnichannel",
    isPositive: true,
  },
  {
    feature: "Customer Trust",
    manual: "Low (Unverified sellers)",
    konversa: "High (Verified Pilot)",
    isPositive: true,
  },
];

const TheComparisonTable: React.FC = () => {
  return (
    <section className="py-16 bg-[#020617] px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#E2E8F0] mb-4 tracking-tight">
            Why vendors choose <span className="text-[#14B8A6] underline decoration-[#0F766E]">Konversa</span>
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base">The difference between a side-hustle and a scalable business.</p>
        </motion.div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0F172A]/50 backdrop-blur-sm shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 md:p-6 text-[#64748B] text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Feature</th>
                <th className="p-4 md:p-6 text-[#64748B] text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Manual Selling</th>
                <th className="p-4 md:p-6 text-[#14B8A6] text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[#14B8A6]/5 whitespace-nowrap">
                   <div className="flex items-center gap-2">
                     Konversa Experience
                     <InfoCircle size="14" variant="Bold" />
                   </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                >
                  {/* Feature Name */}
                  <td className="p-4 md:p-6 text-[#E2E8F0] font-bold text-xs md:text-base whitespace-nowrap">
                    {row.feature}
                  </td>
                  
                  {/* Manual Column */}
                  <td className="p-4 md:p-6 text-[#64748B] text-xs md:text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CloseCircle size="16" color="#64748B" variant="Outline" opacity={0.5} />
                      {row.manual}
                    </div>
                  </td>

                  {/* Konversa Column (Highlighted) */}
                  <td className="p-4 md:p-6 text-[#E2E8F0] text-xs md:text-sm font-semibold bg-[#14B8A6]/5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <TickCircle size="18" color="#14B8A6" variant="Bold" />
                      {row.konversa}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Instruction */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[#64748B] md:hidden">
          <div className="w-8 h-[1px] bg-white/10" />
          <p className="text-[10px] uppercase font-bold tracking-widest">
            Swipe to compare
          </p>
          <div className="w-8 h-[1px] bg-white/10" />
        </div>
      </div>
    </section>
  );
};

export default TheComparisonTable;