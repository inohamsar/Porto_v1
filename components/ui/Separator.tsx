"use client";

import { motion } from "framer-motion";

export default function Separator() {
  const duration = 15;
  
  // Shared transition untuk menjamin 100% sinkronisasi dengan ritme 1 napas perlahan
  const sharedDotTransition = { 
    duration: duration, 
    repeat: Infinity, 
    times: [0, 0.2, 0.21, 0.5, 0.79, 0.8, 1],
    ease: "easeInOut" as const
  };

  return (
    <div className="relative w-full h-[2px] flex items-center justify-center pointer-events-none z-0">
      {/* Background Rail Line */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Left Moving Dot */}
      <motion.div 
        initial={{ left: "0%", x: "-50%", opacity: 0 }}
        animate={{ 
          left: ["0%", "50%", "50%", "50%", "50%", "50%", "0%"],
          opacity: [0, 1, 1, 1, 1, 1, 0],
        }}
        transition={sharedDotTransition}
        className="absolute w-40 h-[4px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] z-0"
      />

      {/* Right Moving Dot */}
      <motion.div 
        initial={{ right: "0%", x: "50%", opacity: 0 }}
        animate={{ 
          right: ["0%", "50%", "50%", "50%", "50%", "50%", "0%"],
          opacity: [0, 1, 1, 1, 1, 1, 0],
        }}
        transition={sharedDotTransition}
        className="absolute w-40 h-[4px] bg-gradient-to-l from-transparent via-purple-400 to-transparent blur-[2px] z-0"
      />


    </div>
  );
}
