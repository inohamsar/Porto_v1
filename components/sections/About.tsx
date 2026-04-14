"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import RevealHeading from "../motion/RevealHeading";
import Separator from "../ui/Separator";
import TypingBadge from "../motion/TypingBadge";

const text = "Menghadirkan transformasi digital melalui pengembangan sistem yang ditenagai oleh AI untuk menciptakan standar baru dalam efisiensi bisnis. Saya berfokus pada pembangunan ekosistem digital yang mampu beradaptasi dengan kebutuhan masa kini, menggunakan asisten AI dan sistem cerdas lainnya untuk mempercepat alur kerja dan meningkatkan profitabilitas. Setiap sistem yang saya bangun adalah investasi strategis untuk memastikan bisnis Anda berjalan lebih produktif dan kompetitif.";

export default function About() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const isGridInView = useInView(gridRef, { once: false, amount: 0.2 });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      },
    },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
    hidden: {
      opacity: 0,
      x: -60,
      transition: {
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <section id="about" className="relative z-30 bg-black py-12 md:py-24 lg:py-32 px-6 md:px-12 lg:px-container overflow-x-clip">
      {/* Top Section Separator (Animated Breathing) */}
      <div className="absolute top-0 left-0 w-full h-px">
        <Separator />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center mb-6 md:mb-12">
        <div className="relative z-10 flex flex-col gap-6">
          <RevealHeading
            text="Profile"
            className="text-4xl md:text-6xl lg:text-8xl font-syne uppercase tracking-tighter"
          />
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-justify max-w-4xl"
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block">
                <motion.span
                  variants={child}
                  className="text-xl md:text-2xl lg:text-3xl font-manrope leading-snug text-white/70 hover:text-white transition-colors"
                >
                  {word}
                </motion.span>
                <span className="inline-block w-[0.3em]">&nbsp;</span>
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: isInView ? 0.6 : 0 }}
          className="absolute lg:relative z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 aspect-square w-full max-w-[420px] md:max-w-[530px] mx-auto lg:ml-auto"
        >
          <div
            className="relative w-full h-full z-10 blur-[8px] lg:blur-none opacity-40 lg:opacity-100"
            style={{
              WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 70%)",
              maskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 70%)"
            }}
          >
            <Image
              src="/img/world.webp"
              alt="World Network"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-12">

        <motion.div
          ref={gridRef}
          variants={gridContainerVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-x-12 md:gap-y-6 lg:gap-12"
        >
          {/* Software Engineering */}
          <motion.div
            variants={gridItemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col gap-4 group border-l-2 border-transparent hover:border-cyan-500/50 px-6 md:pl-6 md:pr-0 transition-all duration-500 hover:bg-white/[0.02] py-4 rounded-r-xl"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
              </span>
              <TypingBadge
                text="Software Engineering"
                trigger={isGridInView}
                startDelay={0.5}
                className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-cyan-400/80 font-plus-jakarta font-bold"
              />
            </div>
            <p className="font-plus-jakarta text-xl font-medium text-white/90 group-hover:text-white transition-colors">
              Monorepo, Next.js, Scalable Infrastructure, Performance Optimization
            </p>
          </motion.div>

          {/* AI Engineering */}
          <motion.div
            variants={gridItemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col gap-4 group border-l-2 border-transparent hover:border-purple-500/50 px-6 md:pl-6 md:pr-0 transition-all duration-500 hover:bg-white/[0.02] py-4 rounded-r-xl"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_10px_rgba(192,132,252,0.8)]"></span>
              </span>
              <TypingBadge
                text="AI Engineering"
                trigger={isGridInView}
                startDelay={0.7}
                className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-purple-400/80 font-plus-jakarta font-bold"
              />
            </div>
            <p className="font-plus-jakarta text-xl font-medium text-white/90 group-hover:text-white transition-colors">
              LLM Integration, Custom AI Agents, RAG Pipelines, Neural Networks
            </p>
          </motion.div>

          {/* Digital Advertising */}
          <motion.div
            variants={gridItemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col gap-4 group border-l-2 border-transparent hover:border-emerald-500/50 px-6 md:pl-6 md:pr-0 transition-all duration-500 hover:bg-white/[0.02] py-4 rounded-r-xl"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
              </span>
              <TypingBadge
                text="Digital Advertising"
                trigger={isGridInView}
                startDelay={0.9}
                className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-emerald-400/80 font-plus-jakarta font-bold"
              />
            </div>
            <p className="font-plus-jakarta text-xl font-medium text-white/90 group-hover:text-white transition-colors">
              Meta Ads Specialist, High-Accuracy Tracking Systems, Profit Oriented
            </p>
          </motion.div>

          {/* Security & Cloud */}
          <motion.div
            variants={gridItemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col gap-4 group border-l-2 border-transparent hover:border-rose-500/50 px-6 md:pl-6 md:pr-0 transition-all duration-500 hover:bg-white/[0.02] py-4 rounded-r-xl"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_10px_rgba(251,113,133,0.8)]"></span>
              </span>
              <TypingBadge
                text="Security & Cloud"
                trigger={isGridInView}
                startDelay={1.1}
                className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-rose-400/80 font-plus-jakarta font-bold"
              />
            </div>
            <p className="font-plus-jakarta text-xl font-medium text-white/90 group-hover:text-white transition-colors">
              Microsoft Azure AI, Google Cloud, Alibaba Cloud, Cisco CCNA
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section Separator (Animated Breathing) */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <Separator />
      </div>
    </section>
  );
}
