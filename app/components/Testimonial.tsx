"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star1, Verify } from 'iconsax-react';

interface TestimonialData {
  name: string;
  role: string;
  content: string;
  image?: string;
  size: 'small' | 'large';
}

const testimonials: TestimonialData[] = [
  {
    name: "Afolabi Funke",
    role: "Lagos Fashion Hub",
    content: "Konversa changed my business. I used to stay up until 2 AM responding to 'How much' on WhatsApp. Now, the AI handles prices while I focus on sewing. My sales doubled in the first month!",
    size: 'large',
  },
  {
    name: "Emeka Gadgets",
    role: "Abuja Tech Mart",
    content: "The automated payment verification is a lifesaver. No more fake alerts. If Konversa doesn't confirm it, we don't ship it.",
    size: 'small',
  },
  {
    name: "Tosin Adebayo",
    role: "P.H. Beauty Store",
    content: "Setting up my inventory was so easy. Now when people DM me on Instagram, they get an instant reply with a checkout link.",
    size: 'small',
  },
  {
    name: "Sola Logistics",
    role: "Delivery Partner",
    content: "The way this platform handles landmarks in Lagos is impressive. My riders find addresses faster because the AI translates 'beside the big bus stop' into actual useful data for us.",
    size: 'large',
  }
];

const Testimonial: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 bg-[#020617] px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14B8A6]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[#14B8A6] font-mono text-xs tracking-[0.3em] uppercase mb-4">Success Stories</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#E2E8F0]">
            Trusted by vendors <br /> across <span className="text-white italic underline decoration-[#0F766E]">Nigeria.</span>
          </h3>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-lg bg-[#0F172A] border border-white/5 flex flex-col justify-between group hover:border-[#14B8A6]/30 transition-all ${
                t.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star1 key={i} size="16" color="#14B8A6" variant="Bold" />
                  ))}
                </div>
                <p className="text-[#E2E8F0] text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center text-[#14B8A6] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-[#E2E8F0] font-bold text-sm">{t.name}</h4>
                      <Verify size="14" color="#14B8A6" variant="Bold" />
                    </div>
                    <p className="text-[#64748B] text-xs uppercase tracking-tighter">{t.role}</p>
                  </div>
                </div>
                
                {/* Visual Accent */}
                <div className="hidden group-hover:block transition-all">
                   <div className="px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[10px] text-[#14B8A6] font-bold uppercase">
                     Verified Pilot
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;