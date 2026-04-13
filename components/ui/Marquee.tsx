"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js", "React", "TypeScript", "Motion", "Three.js", "Figma", "Tailwind", "Google Ads", "Meta Ads", "SEO", "CRO", "Branding"
];

export default function Marquee() {
  return (
    <section className="relative z-10 bg-black pt-40 pb-20 overflow-hidden">
      <div className="flex overflow-hidden whitespace-nowrap gap-12 border-y border-white/10 py-10">
        <motion.div 
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-12 text-6xl md:text-9xl font-syne font-black uppercase tracking-tighter items-center"
        >
          {/* Double the list for seamless looping */}
          {[...skills, ...skills].map((skill, i) => (
            <div key={i} className="flex items-center gap-12">
               <span>{skill}</span>
               <div className="w-10 h-10 md:w-20 md:h-20 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 md:w-8 md:h-8 bg-white rounded-full" />
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
