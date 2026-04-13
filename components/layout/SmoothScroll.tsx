"use client";

import { useEffect, ReactNode, createContext, useContext, useState } from "react";
import Lenis from "lenis";

import { useIsMobile } from "@/hooks/use-is-mobile";

const ScrollContext = createContext<Lenis | null>(null);

export const useScroll = () => useContext(ScrollContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Disable smooth scroll on mobile for better native touch experience
    if (isMobile) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [isMobile]);

  return (
    <ScrollContext.Provider value={lenis}>
      {children}
    </ScrollContext.Provider>
  );
}
