"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flash, 
  Monitor, 
  TrendUp, 
  Location, 
  ShieldSearch, 
  Global, 
  LampCharge, 
  StatusUp,
  ArrowRight,
  MessageText1,
  Lock1
} from 'iconsax-react';
import Link from 'next/link';

const PitchPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      id: "problem",
      title: "The Problem",
      subtitle: "The Fragmented Trust Gap",
      description: "With over 90 Million WhatsApp users in Nigeria, social selling is the primary digital livelihood. However, vendors lose up to 40% of revenue due to a lack of structured consumer protection and a massive 'Trust Gap' when transactions fail in informal DMs.",
      icon: <MessageText1 size="32" variant="Bold" color="#F87171" />,
      points: [
        "No structured accountability in DM trades",
        "Fragmented ops across WhatsApp & Instagram",
        "Manual tracking in a high-speed mobile market",
        "High friction due to unverified trust layers"
      ],
      imageLabel: "Visualizing DM-Based Commerce Chaos"
    },
    {
      id: "solution",
      title: "The Solution",
      subtitle: "The Automated Trust Engine",
      description: "Konversa bridges the Nigerian Trust Gap by centralizing WhatsApp, TikTok, Telegram and Instagram into one high-speed dashboard. Our integrated Escrow Sync and AI-led automation turn informal chats into professional, protected transactions.",
      icon: <LampCharge size="32" variant="Bold" color="#14B8A6" />,
      points: [
        "One-click social-to-dashboard sync",
        "Localized AI for Nigerian market nuances",
        "Integrated Escrow for guaranteed protection",
        "Professional digital portfolio for SMEs"
      ],
      imageLabel: "Konversa Verified Transaction Flow"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#E2E8F0] overflow-hidden selection:bg-[#14B8A6]/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#14B8A6]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F766E]/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 pt-24 pb-20">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold uppercase tracking-[0.3em] mb-8">
              The Future of Social Commerce
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              Scaling Social Selling <br/> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#0F766E]">Autopilot.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#94A3B8] leading-relaxed mb-12 max-w-2xl mx-auto">
              Konversa is the operating system for the next generation of Nigerian vendors, bridging the gap between social engagement and professional commerce.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/waitlist">
                <button className="px-8 py-3 bg-[#14B8A6] text-white font-bold rounded-full shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:scale-105 transition-transform flex items-center gap-2">
                  Get Pilot Access <ArrowRight size="20"  color='white'/>
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* CORE PITCH SECTIONS */}
        {sections.map((section, idx) => (
          <section key={section.id} className="max-w-7xl mx-auto px-6 mb-32">
            <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              <motion.div {...fadeIn} className="flex-1 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-[#14B8A6] uppercase tracking-widest">{section.title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold">{section.subtitle}</h3>
                  </div>
                </div>
                <p className="text-lg text-[#94A3B8] leading-relaxed">
                  {section.description}
                </p>
                <ul className="space-y-4">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3 text-[#E2E8F0]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                {...fadeIn}
                className="flex-1 w-full aspect-video rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/5 p-1 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#14B8A6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-full h-full rounded-[1.4rem] bg-[#020617] flex items-center justify-center border border-white/5 flex-col gap-4 text-center px-10">
                   <Monitor size="48" className="text-[#14B8A6]/20" variant="Bulk" />
                   <p className="text-[#64748B] text-sm font-medium tracking-widest uppercase">{section.imageLabel}</p>
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* MARKET OPPORTUNITY */}
        <section className="bg-white/[0.02] border-y border-white/5 py-32 mb-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn} className="space-y-8">
                <h2 className="text-sm font-black text-[#14B8A6] uppercase tracking-widest">The Nigerian Opportunity</h2>
                <h3 className="text-4xl md:text-5xl font-bold leading-tight">A <span className="text-white">$2.04B+</span> Market <br/> Growing on Autopilot.</h3>
                <p className="text-lg text-[#94A3B8] leading-relaxed">
                  Nigeria's social commerce market is a rapidly expanding, mobile-first ecosystem. Driven by 90M+ WhatsApp users and 47M+ social shoppers, it is projected to grow by 24% annually transitioning from informal DM trades to a structured $2B+ economy.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">24%</p>
                    <p className="text-xs text-[#64748B] uppercase font-bold tracking-widest">Annual Growth Reach</p>
                  </div>
                  <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">47M+</p>
                    <p className="text-xs text-[#64748B] uppercase font-bold tracking-widest">Active Social Shoppers</p>
                  </div>
                </div>
              </motion.div>
              <div className="relative aspect-square max-w-md mx-auto">
                 <div className="absolute inset-0 bg-[#14B8A6]/20 blur-[100px] animate-pulse" />
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className="w-full h-full rounded-full border border-dashed border-[#14B8A6]/30 flex items-center justify-center"
                 >
                    <Global size="120" variant="Bulk" color="#14B8A6" />
                 </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE LOOK TO ACHIEVE */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-sm font-black text-[#14B8A6] uppercase tracking-widest mb-4">Our Vision</h2>
            <h3 className="text-4xl md:text-5xl font-bold">The Konversa Roadmap</h3>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Trust Standard", 
                desc: "Become the universally recognized trust layer for social selling in Nigeria.",
                icon: <Lock1 size="32" variant="Bulk" color="#22D3EE" />
              },
              { 
                title: "One-Click Ops", 
                desc: "Reduce vendor operational time by 80% through deep AI integration.",
                icon: <Flash size="32" variant="Bulk" color="#FBBF24" />
              },
              { 
                title: "Logistics Sync", 
                desc: "Create a seamless bridge between online checkout and physical delivery.",
                icon: <StatusUp size="32" variant="Bulk" color="#34D399" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-lg bg-[#0F172A] border border-white/5 hover:border-[#14B8A6]/30 transition-all group"
              >
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PILOT MARKET: NIGERIA */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <motion.div 
            {...fadeIn}
            className="rounded-lg bg-gradient-to-br from-[#14B8A6]/10 to-transparent border border-[#14B8A6]/20 p-8 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Global size="160" variant="Bulk" className="text-[#14B8A6]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
                  <Location size="20" variant="Bold" />
                </div>
                <h4 className="text-[#14B8A6] font-bold uppercase tracking-widest text-sm">Pilot Phase: Mobile-First Nigeria</h4>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Why Nigeria? <br/> The Ultimate Growth Market.</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-[#94A3B8] leading-relaxed">
                    Nigeria represents a high-potential, mobile-first market with a massive population of digital entrepreneurs. Our launch strategy focuses on major commerce hubs where we refine our AI's understanding of diverse delivery landmarks and regional business slang.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Lagos","Abuja", "P.H.", "and more"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#E2E8F0] uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <ShieldSearch size="24" color="#14B8A6" className="shrink-0" />
                    <div>
                      <p className="font-bold text-white mb-1">National Trust Layer</p>
                      <p className="text-sm text-[#94A3B8]">Building trust in a nationwide ecosystem that values security and personal relationships.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <StatusUp size="24" color="#14B8A6" className="shrink-0" />
                    <div>
                      <p className="font-bold text-white mb-1">Infrastructure Readiness</p>
                      <p className="text-sm text-[#94A3B8]">Testing our logistics bridge across major urban tech hubs and marketplace clusters.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* THANK YOU SECTION */}
        <section className="max-w-7xl mx-auto px-6 text-center  relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              Thank <span className="text-[#14B8A6]">You.</span>
            </h2>
            <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We're building more than a platform; we're building the infrastructure for the next generation of Nigerian commerce. We'd love to have you part of this journey.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link href="/waitlist">
                  <button className="px-10 py-3 bg-[#14B8A6] text-white font-bold rounded-full shadow-[0_0_40px_rgba(20,184,166,0.4)] hover:scale-105 transition-transform">
                    Join the Movement
                  </button>
               </Link>
               <Link href="/">
                  <p className="text-[#64748B] hover:text-[#14B8A6] font-bold cursor-pointer transition-colors">
                    Back to Home
                  </p>
               </Link>
            </div>
          </motion.div>
          
          {/* Decorative Finish */}
          <div className="mt-32 w-12 h-12 rounded-full border border-[#14B8A6]/20 flex items-center justify-center mx-auto opacity-50">
             <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-ping" />
          </div>
        </section>

      </main>
    </div>
  );
};

export default PitchPage;
