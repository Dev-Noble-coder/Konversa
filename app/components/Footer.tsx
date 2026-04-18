"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Whatsapp, Sms, ShieldTick } from 'iconsax-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/#features", isPage: false },
        { name: "How it Works", href: "/#howitworks", isPage: false },
        { name: "Waitlist", href: "/waitlist", isPage: true },
        { name: "Pilot Program", href: "/waitlist", isPage: true },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Meet the Team", href: "/team", isPage: true },
        { name: "About Us", href: "/#", isPage: false },
        { name: "Pitch Deck", href: "/pitch", isPage: true },
        { name: "Privacy Policy", href: "/#", isPage: false },
        { name: "Terms of Service", href: "/#", isPage: false },
      ]
    },

    {
      title: "Social",
      links: [
        { name: "WhatsApp Business", href: "#", isPage: false },
        { name: "Instagram", href: "#", isPage: false },
        { name: "Telegram", href: "#", isPage: false },
        { name: "Twitter (X)", href: "#", isPage: false },
      ]
    }
  ];

  return (
    <footer className="bg-[#020617] pt-12 sm:pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#14B8A6]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#E2E8F0] tracking-tight">
            Konversa<span className="text-[#14B8A6]">.</span>
          </span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              Empowering vendors with AI-driven social commerce. Automate your sales, build trust, and scale your business on autopilot.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#14B8A6]/20 transition-colors cursor-pointer group">
                <Whatsapp size="20" color="#94A3B8" className="group-hover:text-[#14B8A6] transition-colors" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#14B8A6]/20 transition-colors cursor-pointer group">
                <Instagram size="20" color="#94A3B8" className="group-hover:text-[#14B8A6] transition-colors" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#14B8A6]/20 transition-colors cursor-pointer group">
                <Sms size="20" color="#94A3B8" className="group-hover:text-[#14B8A6] transition-colors" />
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-6">
              <h4 className="text-white font-bold text-sm tracking-widest uppercase">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-[#64748B] hover:text-[#14B8A6] text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#64748B] text-xs">
            © {currentYear} Konversa AI. All rights reserved. Built for the Nigeria Pilot.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/5 border border-[#14B8A6]/10">
              <ShieldTick size="14" color="#14B8A6" variant="Bold" />
              <span className="text-[10px] text-[#14B8A6] font-bold uppercase tracking-tighter">Secure Pilot Phase</span>
            </div>
            <span className="text-[#64748B] text-xs cursor-pointer hover:text-[#14B8A6] transition-colors">Privacy</span>
            <span className="text-[#64748B] text-xs cursor-pointer hover:text-[#14B8A6] transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;