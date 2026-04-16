"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Sms, Global } from 'iconsax-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    twitter?: string;
    instagram?: string;
    email?: string;
  };
}

const team: TeamMember[] = [
  {
    name: "Favour Ayomide Adebayo",
    role: "CEO & Co-Founder",
    image: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776379270/IMG_8989_j6d98q.jpg",
    bio: "1st Place Squad Hackathon Winner. Visionary CEO driving Konversa's mission. Combining deep technical expertise with strategic leadership to revolutionize social commerce in Africa.",
    socials: { twitter: "#", instagram: "#", email: "adebayo@konversa.co" }
  },
  {
    name: "Covenant Joshua Adeosun",
    role: "CTO & Co-Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop", // placeholder
    bio: "1st Place Squad Hackathon Winner. Expert in type-safe Next.js architecture and high-performance state management. Engineering the robust 'Konversa' core for global scale.",
    socials: { twitter: "#", instagram: "#", email: "adeosun@konversa.co" }
  }
];





const TeamSection = () => {
  return (
    <section className="py-24 bg-[#020617] px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#14B8A6]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#0F766E]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#14B8A6] font-mono text-xs tracking-[0.3em] uppercase mb-4"
          >
            The Minds Behind Konversa
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#E2E8F0] mb-8"
          >
            Dedicated to your <br /> <span className="text-white italic">growth.</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We are a team of engineers, designers, and local market experts committed to solving the digital headaches of social commerce in Nigeria.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl bg-[#0F172A]/50 border border-white/5 p-4 transition-all duration-500 hover:border-[#14B8A6]/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                
                {/* Image Wrap */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#14B8A6] transition-colors">
                        <Global size="18" color="#fff" variant="Bold" />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a href={member.socials.instagram} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#14B8A6] transition-colors">
                        <Instagram size="18" color="#fff" variant="Bold" />
                      </a>
                    )}
                    {member.socials.email && (
                      <a href={`mailto:${member.socials.email}`} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#14B8A6] transition-colors">
                        <Sms size="18" color="#fff" variant="Bold" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#14B8A6] transition-colors">{member.name}</h4>
                  <p className="text-[#14B8A6] font-mono text-[10px] uppercase tracking-widest">{member.role}</p>
                  <p className="text-[#64748B] text-sm leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-lg bg-gradient-to-br from-[#0F172A] to-[#020617] border border-[#14B8A6]/20 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#14B8A6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to join our mission?</h4>
          <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto italic">
            "We are always looking for people who understand the hustle and the tech to match it."
          </p>
          <a href="mailto:careers@konversa.co">
            <button className="px-8 py-3 rounded-full bg-[#14B8A6] text-[#020617] font-bold hover:shadow-[0_0_20px_#14B8A6] transition-all">
              Apply Now
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
