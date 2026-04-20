"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logoUrl: string;
}

const partners: Partner[] = [
  { 
    name: "Ekiti State Govt", 
    logoUrl: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776356691/ekiti-logo_a7xji4.png"
  },
  { 
    name: "IESF", 
    logoUrl: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776356689/iesf_logo_v9hegf.png" 
  },
  { 
    name: "MISDE", 
    logoUrl: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776357182/MISDE_tsekty.png"
  },
  {
    name: "First Bank Nigeria",
    logoUrl: "https://www.firstbanknigeria.com/wp-content/uploads/2020/01/First-Bank.svg"
  },
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-[#020617] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Brand/Trust Statement */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 text-center lg:text-left"
          >
            <h2 className="text-[#64748B] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">
              Our Partners
            </h2>
            <p className="text-[#E2E8F0] text-base md:text-lg font-medium leading-relaxed">
              Powering the next generation of <span className="text-[#14B8A6]">Vendors</span>.
            </p>
          </motion.div>

          {/* Logo Display */}
          <div className="w-full lg:w-2/3 flex flex-wrap items-center justify-center lg:justify-end gap-12 md:gap-20">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // Only scale on large screens
                whileHover={{ scale: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 1.05 : 1 }}
                className="group relative flex flex-col items-center gap-4"
              >
                <div className="h-14 md:h-20 w-auto relative">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name}
                    className="h-full w-auto object-contain transition-all duration-500 
                      grayscale-0 opacity-100 
                      lg:grayscale lg:opacity-40 lg:group-hover:grayscale-0 lg:group-hover:opacity-100"
                  />
                </div>
                
                {/* Label: Visible by default on mobile/tab, hidden-until-hover on large screens */}
                <div className="lg:absolute lg:-bottom-8 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-[#14B8A6] tracking-widest uppercase">
                    {partner.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Partners;