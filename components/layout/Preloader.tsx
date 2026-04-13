"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "./SmoothScroll";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const lenis = useScroll();

  useEffect(() => {
    if (!complete) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      lenis?.start();
    };
  }, [complete, lenis]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setComplete(true), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
        >
          <div className="relative w-[300px] md:w-[500px]">
            <div className="flex justify-between items-end mb-4">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl font-syne uppercase tracking-tighter"
                >
                  InoHamsar
                </motion.h2>
              </div>
              <div className="text-2xl md:text-4xl font-syne">{Math.min(progress, 100)}%</div>
            </div>

            <div className="h-[2px] w-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-white"
              />
            </div>

            <div className="mt-8 flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs tracking-[0.2em] font-manrope uppercase opacity-50 transition-all duration-300"
              >
                Software Developer & AI Engineer
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
