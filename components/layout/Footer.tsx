"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black pt-3 pb-6 md:pt-10 lg:pt-20 md:pb-8 lg:pb-10 overflow-hidden">

      <div className="px-6 md:px-12 lg:px-container mt-0 md:mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[9px] lg:text-[10px] uppercase font-manrope tracking-[0.4em] text-white/20 text-center">
        <span>© {currentYear} INOHAMSAR. All Rights Reserved.</span>
        <span className="hidden md:inline">Crafted with passion in Indonesia.</span>
        <div className="hidden lg:flex gap-4">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms of Use</span>
        </div>
      </div>
    </footer>
  );
}
