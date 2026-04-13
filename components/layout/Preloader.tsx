"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import { useScroll } from "./SmoothScroll";

export default function Preloader() {
  const [visualProgress, setVisualProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const lenis = useScroll();
  const { progress: realProgress, isLoaded } = useLoading();

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

  // Visual progress logic: combines real progress with smooth fake increments
  useEffect(() => {
    const timer = setInterval(() => {
      setVisualProgress((prev) => {
        // We want the visual progress to be "capped" by real progress,
        // but it can be slightly behind to look smoother.
        if (prev < realProgress) {
          const diff = realProgress - prev;
          const increment = Math.max(1, Math.floor(diff * 0.1));
          return Math.min(prev + increment, 100);
        }

        if (prev >= 100 && isLoaded) {
          clearInterval(timer);
          setTimeout(() => setComplete(true), 800);
          return 100;
        }

        // Even if we don't have real progress yet, let it crawl up to 90%
        if (prev < 90) {
          return prev + 1;
        }

        return prev;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [realProgress, isLoaded]);

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
              <div className="text-2xl md:text-4xl font-syne">{Math.min(visualProgress, 100)}%</div>
            </div>

            <div className="h-[2px] w-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${visualProgress}%` }}
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
