"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { DirectboxSend, Profile2User, CardTick1, Flash } from 'iconsax-react';

interface Step {
  number: string;
  tag: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  position: 'left' | 'right';
}

const steps: Step[] = [
  {
    number: "01",
    tag: "QUICK START",
    title: "Sign Up in Seconds",
    desc: "Visit our website and create your business account using Google or email. No complex forms, just the essentials to get you selling.",
    icon: <Profile2User size="20" variant="Bulk" color="#14B8A6" />,
    position: "left"
  },
  {
    number: "02",
    tag: "CHANNEL SYNC",
    title: "Link Socials to Agent",
    desc: "Connect our intelligent agent to your Telegram, WhatsApp, TikTok or Instagram. We meet your customers where they already are.",
    icon: <DirectboxSend size="20" variant="Bulk" color="#14B8A6" />,
    position: "right"
  },
  {
    number: "03",
    tag: "PRODUCT CONTROL",
    title: "Upload & AI Captions",
    desc: "Upload images, get AI-assisted captions, and control everything. Toggle availability and manage stock with one dashboard.",
    icon: <CardTick1 size="20" variant="Bulk" color="#14B8A6" />,
    position: "left"
  },
  {
    number: "04",
    tag: "AUTOMATION",
    title: "We Handle the Rest",
    desc: "Your product is live! Konversa now monitors your socials, answering 'How much?' and processing orders while you focus on scaling.",
    icon: <Flash size="20" variant="Bulk" color="#14B8A6" />,
    position: "right"
  }
];

const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-16 md:py-20 bg-[#020617] overflow-hidden" id='howitworks'>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-40"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-[#E2E8F0] mb-3">
            The Konversa <span className='underline decoration-[#0F766E]'>Workflow</span>
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base max-w-md mx-auto">
            Three interdependent layers, One integrated selling philosophy.
          </p>
        </motion.div>

        <div className="relative">
          {/* THE CENTER LINE (Background Track) - Fixed Middle for Mobile/Large */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1px] bg-white/10" />
          
          {/* THE PROGRESS LINE */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px]">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 w-full h-full bg-gradient-to-b from-[#14B8A6] to-[#0F766E] origin-top shadow-[0_0_15px_rgba(20,184,166,0.5)]"
            />
          </div>

          {/* THE STEPS */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <StepItem 
                key={index} 
                step={step} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepItemProps {
  step: Step;
}

const StepItem: React.FC<StepItemProps> = ({ step }) => {
  const isLeft = step.position === "left";

  return (
    <div className={`relative flex items-center justify-between w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      
      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-[45%] md:w-[42%] space-y-2 md:space-y-4 ${isLeft ? 'text-left' : 'text-right'}`}
      >
        <div className={`flex items-center gap-2 ${isLeft ? 'justify-start' : 'justify-end'}`}>
          <span className="text-[10px] font-mono font-bold text-[#64748B] tracking-widest">
            {step.number} // {step.tag}
          </span>
        </div>
        <h3 className="text-sm md:text-4xl font-bold text-[#E2E8F0] tracking-tight leading-tight">
          {step.title}
        </h3>
        <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed">
          {step.desc}
        </p>
        
        {/* Status Box - Optimized for smaller font on Mobile */}
        <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'} mt-3 md:mt-6`}>
          <div className="px-2 py-1.5 md:px-4 md:py-3 rounded-md bg-[#0F172A] border border-white/5 flex items-center gap-2 md:gap-4 group">
            <div className="w-6 h-6 md:w-10 md:h-10 rounded bg-[#1E293B] flex items-center justify-center group-hover:bg-[#14B8A6]/20 transition-colors">
              {step.icon}
            </div>
            <div className="text-left">
              <p className="text-[9px] md:text-[10px] text-[#64748B] font-bold uppercase tracking-tighter">Status</p>
              <p className="text-xs text-[#E2E8F0] font-medium whitespace-nowrap">Ekiti Pilot Ready</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center Indicator (Dot) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#020617] border border-[#14B8A6] z-20 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
          className="w-1 md:w-2 h-1 md:h-2 rounded-full bg-[#14B8A6] shadow-[0_0_8px_#14B8A6]"
        />
      </div>

      {/* Spacer to maintain the structure */}
      <div className="w-[45%] md:w-[42%]" />
    </div>
  );
};

export default HowItWorks;