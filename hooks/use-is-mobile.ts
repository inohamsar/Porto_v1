"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if the user is on a mobile device based on a breakpoint.
 * Handles hydration to avoid SSR mismatch.
 */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    const onChange = () => {
      setIsMobile(mql.matches);
    };

    mql.addEventListener("change", onChange);

    // Initial check — required because window is not available during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isMobile;
}
