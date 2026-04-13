"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface RevealHeadingProps {
  text: string;
  className?: string;
  direction?: "bottom" | "left" | "right";
  noPadding?: boolean;
}

export default function RevealHeading({ text, className, direction = "bottom", noPadding = false }: RevealHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
    hidden: {
      opacity: 0,
      y: direction === "bottom" ? 100 : 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      rotate: direction === "bottom" ? 5 : 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap gap-x-[0.3em] ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className={`inline-block overflow-hidden ${noPadding ? "" : "py-1"}`}>
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
