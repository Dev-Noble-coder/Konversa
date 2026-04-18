"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HambergerMenu, CloseCircle } from 'iconsax-react';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/#howitworks' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Team', href: '/team' },
    { name: 'Pitch', href: '/pitch' },
  ];


  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl h-18 flex items-center">
        <div className="max-w-7xl px-6 mx-auto w-full flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-1 cursor-pointer group">
            <span className="text-xl font-bold text-[#E2E8F0] tracking-tight">
              Konversa<span className="text-[#14B8A6]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 ${
                    isActive(link.href) ? 'text-[#14B8A6]' : 'text-[#94A3B8] hover:text-[#14B8A6]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pl-4 border-l border-white/10">
              <Link href='/waitlist'>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-full border border-[#14B8A6]/30 text-[#E2E8F0] text-sm font-semibold hover:bg-[#14B8A6]/10 transition-all"
                >
                  Join Waitlist
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(true)} 
              className="text-[#E2E8F0] p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <HambergerMenu size="28" color='#E2E8F0' />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#020617]/60 backdrop-blur-md"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 h-full w-72 bg-[#0F172A] border-l border-white/5 shadow-2xl px-6 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex justify-between items-center mb-6 pt-2">
                <span className="text-xl font-bold text-[#E2E8F0]">
                  Konversa<span className="text-[#14B8A6]">.</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className=" p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <CloseCircle size="28" color='#14B8A6' variant="Bulk" />
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold transition-colors ${
                      isActive(link.href) ? 'text-[#14B8A6]' : 'text-[#E2E8F0] hover:text-[#14B8A6]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Sidebar Footer CTA */}
              <div className="mt-auto pb-5">
                <Link href="/waitlist" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-[#0F766E] text-[#E2E8F0] py-2.5 rounded-full font-medium text-lg shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                    JOIN WAITLIST
                  </button>
                </Link>
                <p className="text-center text-[#64748B] text-xs mt-6">
                  Ready to automate your <br/> Nigerian business?
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;