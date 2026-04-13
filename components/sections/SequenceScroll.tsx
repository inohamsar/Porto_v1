"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";

import { useLoading } from "@/context/LoadingContext";

// Helper: compute fade-in/out opacity from progress
function computeOpacity(progress: number, fadeIn: number, peak: number, fadeOut: number): number {
  if (progress < fadeIn) return 0;
  if (progress < peak) return (progress - fadeIn) / (peak - fadeIn);
  if (progress < fadeOut) return 1 - (progress - peak) / (fadeOut - peak);
  return 0;
}

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const totalFrames = 192;
  const { updateProgress, setLoaded } = useLoading();

  // Track scroll progress through the 500vh container (for canvas frames)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, totalFrames]);

  // Manual scroll tracking for text overlays (bypasses Lenis issues)
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = containerHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      // How far we've scrolled into the container
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/sequence/sequentially-${frameNum}.webp`;
      img.onload = () => {
        loadedCount++;
        const currentProgress = (loadedCount / totalFrames) * 100;
        updateProgress(currentProgress);

        if (loadedCount === totalFrames) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        const currentProgress = (loadedCount / totalFrames) * 100;
        updateProgress(currentProgress);
        if (loadedCount === totalFrames) setLoaded(true);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [updateProgress, setLoaded, totalFrames]);

  // Handle Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (idx: number) => {
      const currentImage = images[Math.floor(idx) - 1];
      if (!currentImage) return;

      const zoomFactor = isMobile ? 1 : 1.0;
      const scale = Math.max(canvas.width / currentImage.width, canvas.height / currentImage.height) * zoomFactor;
      const x = (canvas.width / 2) - (currentImage.width / 2) * scale;
      const y = (canvas.height / 2) - (currentImage.height / 2) * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(currentImage, x, y, currentImage.width * scale, currentImage.height * scale);
    };

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(frameIndex.get());
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    const unsubscribe = frameIndex.on("change", (latest) => {
      render(latest);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [images, frameIndex, isMobile]);

  // Compute overlay opacities from manual progress
  const op1a = computeOpacity(progress, 0.01, 0.08, 0.24); // Name
  const op1b = computeOpacity(progress, 0.10, 0.18, 0.24); // Roles

  // Overlay 2: Tagline (Staggered)
  const op2a = computeOpacity(progress, 0.25, 0.30, 0.45);
  const op2c = computeOpacity(progress, 0.32, 0.40, 0.45);

  // Overlay 3: Philosophy (Staggered)
  const op3a = computeOpacity(progress, 0.50, 0.55, 0.70);
  const op3b = computeOpacity(progress, 0.55, 0.60, 0.70);

  const op4 = computeOpacity(progress, 0.72, 0.78, 0.98);
  // Separate progressive Y for button (slide up synchronized with op4 from 0.72 to 0.78)
  const y4Progress = (progress < 0.72) ? 0 : (progress > 0.78) ? 1 : (progress - 0.72) / (0.78 - 0.72);
  const y4 = 40 * (1 - y4Progress);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />

        {/* Overlay 1: Name & Roles (Staggered) */}
        <div className="absolute inset-0 z-30 flex items-end pointer-events-none px-6 lg:px-container pb-16 md:pb-12">
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-8 md:gap-4 lg:gap-4">

              {/* Left Column: Name (starts first) */}
              <div style={{ opacity: op1a, transition: "opacity 0.2s ease" }}>
                <h2 className="text-[clamp(1.5rem,10vw,2.2rem)] md:text-[clamp(2.5rem,6vw,3.5rem)] lg:text-[clamp(3.5rem,4vw,5.5rem)] font-syne uppercase tracking-tighter leading-[0.95] break-words whitespace-normal">
                  Ino<br />Hamsar
                </h2>
              </div>

              {/* Right Block: Roles (starts after) */}
              <div
                style={{ opacity: op1b, transition: "opacity 0.3s ease" }}
                className="flex flex-col items-start md:items-end lg:items-start text-left md:text-right lg:text-left"
              >
                <h3 className="text-[clamp(1.1rem,6vw,1.5rem)] md:text-[clamp(1.8rem,4vw,2.4rem)] lg:text-[clamp(2.2rem,3vw,3rem)] font-syne uppercase tracking-tighter leading-[0.85] whitespace-normal">
                  as a
                </h3>
                <div className="mt-2 md:mt-4">
                  <p className="text-[clamp(0.7rem,3vw,0.9rem)] md:text-[clamp(0.9rem,2vw,1.3rem)] lg:text-[clamp(1.1rem,1.5vw,1.5rem)] font-manrope font-light uppercase tracking-[0.4em] text-white/70 whitespace-normal">
                    Software Developer
                  </p>
                  <p className="text-[clamp(0.7rem,3vw,0.9rem)] md:text-[clamp(0.9rem,2vw,1.3rem)] lg:text-[clamp(1.1rem,1.5vw,1.5rem)] font-manrope font-light mt-1 uppercase tracking-[0.4em] text-white/70 whitespace-normal">
                    AI Solution Architect
                  </p>
                  <p className="text-[clamp(0.7rem,3vw,0.9rem)] md:text-[clamp(0.9rem,2vw,1.3rem)] lg:text-[clamp(1.1rem,1.5vw,1.5rem)] font-manrope font-light mt-1 uppercase tracking-[0.4em] text-white/70 whitespace-normal">
                    Digital Advertiser
                  </p>
                  <p className="text-[clamp(0.7rem,3vw,0.9rem)] md:text-[clamp(0.9rem,2vw,1.3rem)] lg:text-[clamp(1.1rem,1.5vw,1.5rem)] font-manrope font-light mt-1 uppercase tracking-[0.4em] text-white/70 whitespace-normal">
                    Cloud & Network Infrastructure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay 2: Tagline (Spread Layout Refined) */}
        <div className="absolute inset-0 z-30 flex items-end pointer-events-none px-6 lg:px-container pb-16 md:pb-24">
          <div className="w-full flex flex-col gap-12 md:gap-4">
            <span
              style={{ opacity: op2a, transition: "opacity 0.2s ease" }}
              className="text-[clamp(0.75rem,4vw,1.2rem)] md:text-[clamp(1.2rem,3vw,1.6rem)] lg:text-[clamp(1.5rem,2.5vw,2.2rem)] font-syne uppercase leading-tight self-start break-words whitespace-normal"
            >
              No system <br /> no stability
            </span>
            <span
              style={{ opacity: op2c, transition: "opacity 0.2s ease" }}
              className="text-[clamp(0.75rem,4vw,1.1rem)] md:text-[clamp(1.2rem,3vw,1.6rem)] lg:text-[clamp(1.5rem,2.5vw,2.2rem)] font-syne uppercase leading-tight self-end text-right break-words whitespace-normal"
            >
              Build a system<br />secure your<br />business&apos;s future
            </span>
          </div>
        </div>

        {/* Overlay 3: Philosophy (Spread Layout) */}
        <div className="absolute inset-0 z-30 flex items-end pointer-events-none px-6 lg:px-container pb-16 md:pb-24">
          <div className="w-full flex flex-col gap-12 md:gap-4">
            <span
              style={{ opacity: op3a, transition: "opacity 0.2s ease" }}
              className="text-[clamp(0.75rem,4vw,1.1rem)] md:text-[clamp(1.2rem,3vw,1.6rem)] lg:text-[clamp(1.8rem,3vw,2.5rem)] font-syne uppercase leading-tight self-start text-left break-words whitespace-normal"
            >
              Without AI<br /> you&apos;re history
            </span>
            <span
              style={{ opacity: op3b, transition: "opacity 0.2s ease" }}
              className="text-[clamp(0.75rem,4vw,1.1rem)] md:text-[clamp(1.2rem,3vw,1.6rem)] lg:text-[clamp(1.8rem,3vw,2.5rem)] font-syne uppercase leading-tight self-end text-right break-words whitespace-normal"
            >
              Evolve your<br /> business<br /> with AI
            </span>
          </div>
        </div>

        {/* Overlay 4: CTA */}
        <div
          style={{ opacity: op4, transition: "opacity 0.1s ease" }}
          className={`absolute inset-0 z-30 flex items-center justify-center px-10 text-center ${op4 > 0.1 ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="translate-y-58 md:translate-y-0">
            <h2 className="text-[1.9rem] md:text-5xl lg:text-7xl font-syne uppercase tracking-tighter leading-none">
              Ready to Build<br />Something?
            </h2>
            <motion.a
              href="#contact"
              style={{ y: y4, opacity: y4Progress }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group mt-8 inline-flex items-center gap-3 px-8 md:px-6 lg:px-12 py-3.5 md:py-4 lg:py-5 bg-white text-black rounded-full font-syne text-sm md:text-base lg:text-lg uppercase tracking-widest transition-all duration-500 pointer-events-auto cursor-pointer overflow-hidden relative"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-[-10px]">
                Start Project
              </span>
              <div className="absolute right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                <ArrowRight className="w-6 h-6" />
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
