"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award, ShieldCheck, Database, Cloud, Network, Cpu } from "lucide-react";
import RevealHeading from "../motion/RevealHeading";
import Separator from "../ui/Separator";

const certifications = [
  {
    title: "Azure AI Engineer Associate",
    issuer: "Microsoft Certified",
    icon: Cpu,
    color: "#0078d4",
    image: "/certifications/Azure_AI.webp"
  },
  {
    title: "Database Engineer",
    issuer: "Google Cloud",
    icon: Database,
    color: "#4285f4",
    image: "/certifications/google cloud.webp"
  },
  {
    title: "Cloud Certification",
    issuer: "Alibaba Cloud",
    icon: Cloud,
    color: "#ff6a00",
    image: "/certifications/AlibabA.webp"
  },
  {
    title: "Cisco CCNA",
    issuer: "Network Engineering",
    icon: Network,
    color: "#00bceb",
    image: "/certifications/ccna.webp"
  },
  {
    title: "Fortinet NSE 3",
    issuer: "Network Security",
    icon: ShieldCheck,
    color: "#c3002f",
    image: "/certifications/NSE.webp"
  },
  {
    title: "RAG AI & Javascript",
    issuer: "AI & Dev Specialization",
    icon: Award,
    color: "#f7df1e",
    image: "/certifications/Rag_ai_java.webp"
  },
];

export default function Certifications() {
  const descriptionRef = useRef(null);
  const isDescriptionInView = useInView(descriptionRef, { once: false, amount: 0.5 });
  const descriptionText = "Global recognition in Cloud Computing, AI Engineering, and Network Security.";
  const words = descriptionText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      },
    },
  };

  const wordVariants = {
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
      x: -20,
      transition: {
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <section id="certifications" className="relative z-10 bg-black py-12 md:py-24 lg:py-40 px-6 md:px-12 lg:px-container overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 mb-12 md:mb-24">
        <RevealHeading
          text="Certifications"
          className="text-[1.6rem] md:text-5xl lg:text-8xl font-syne uppercase tracking-tighter"
        />
        <motion.div
          ref={descriptionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isDescriptionInView ? "visible" : "hidden"}
          className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-2 max-w-4xl"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="text-xl md:text-2xl lg:text-3xl font-manrope leading-snug text-white/70 hover:text-white transition-colors cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{
              opacity: 0,
              y: 100,
              rotateX: 15,
              rotateY: -10,
              scale: 0.8,
              filter: "blur(10px)"
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              filter: "blur(0px)"
            }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
              duration: 1.2,
              delay: i * 0.15,
              ease: [0.2, 0.65, 0.3, 0.9] as const,
            }}
            className="group relative pt-7 pb-10 px-10 min-h-[320px] flex flex-col justify-between border border-white/10 rounded-3xl bg-white/5 hover:bg-white/80 hover:text-black transition-colors duration-500 overflow-hidden"
            style={{ perspective: "1200px" }}
          >
            {/* Background Image (Option A: Subtle Overlay) */}
            {cert.image && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  priority={i === 0}
                  className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
                />
                {/* Overlay to maintain legibility */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            )}

            <div className="relative z-10 w-full h-full flex flex-col">
              <div className="flex items-center justify-between mb-auto">
                <div className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                  <cert.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] group-hover:opacity-0 transition-opacity duration-500 text-right">{cert.issuer}</span>
              </div>

              <div className="mt-12">
                <h3 className="text-xl md:text-xl lg:text-2xl !font-plus-jakarta uppercase tracking-tight leading-tight max-w-[90%] opacity-40 group-hover:opacity-0 transition-opacity duration-500 whitespace-pre-line">{cert.title}</h3>
              </div>
            </div>

            {/* Ambient Background Glow */}
            <div
              className="absolute -bottom-12 -right-12 w-32 h-32 blur-[100px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
              style={{ background: cert.color }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Section Separator (Animated Breathing) */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <Separator />
      </div>
    </section>
  );
}
