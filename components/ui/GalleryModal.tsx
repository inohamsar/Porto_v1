"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useScroll } from "../layout/SmoothScroll";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function GalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastPinchDistance = useRef<number | null>(null);
  const lenis = useScroll();

  const resetZoom = useCallback(() => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // Clamp pan offset so the image never leaves the visible area
  const clampPan = useCallback((x: number, y: number, scale: number) => {
    const container = imageContainerRef.current;
    if (!container || scale <= 1) return { x: 0, y: 0 };

    const rect = container.getBoundingClientRect();
    const maxX = (rect.width * (scale - 1)) / 2;
    const maxY = (rect.height * (scale - 1)) / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentIndex(initialIndex);
      resetZoom();
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("gallery-open");
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("gallery-open");
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex, lenis, resetZoom]);

  // --- Desktop: Scroll Wheel Zoom ---
  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      setZoomScale((prev) => {
        const next = Math.min(Math.max(prev + delta, 1), 4);
        if (next === 1) {
          setPanOffset({ x: 0, y: 0 });
        }
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  // --- Desktop: Mouse Drag to Pan ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanning || zoomScale <= 1) return;
      const rawX = e.clientX - panStart.x;
      const rawY = e.clientY - panStart.y;
      setPanOffset(clampPan(rawX, rawY, zoomScale));
    },
    [isPanning, zoomScale, panStart, clampPan]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (isPanning) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPanning, handleMouseMove, handleMouseUp]);

  // --- Mobile: Pinch-to-Zoom ---
  useEffect(() => {
    if (!isOpen) return;
    const container = modalRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDistance.current = Math.hypot(dx, dy);
      } else if (e.touches.length === 1 && zoomScale > 1) {
        // Start panning with one finger when zoomed
        setIsPanning(true);
        setPanStart({
          x: e.touches[0].clientX - panOffset.x,
          y: e.touches[0].clientY - panOffset.y,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.hypot(dx, dy);

        if (lastPinchDistance.current !== null) {
          const delta = (distance - lastPinchDistance.current) * 0.01;
          setZoomScale((prev) => {
            const next = Math.min(Math.max(prev + delta, 1), 4);
            if (next === 1) {
              setPanOffset({ x: 0, y: 0 });
            }
            return next;
          });
        }
        lastPinchDistance.current = distance;
      } else if (e.touches.length === 1 && isPanning && zoomScale > 1) {
        e.preventDefault();
        const rawX = e.touches[0].clientX - panStart.x;
        const rawY = e.touches[0].clientY - panStart.y;
        setPanOffset(clampPan(rawX, rawY, zoomScale));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        lastPinchDistance.current = null;
      }
      if (e.touches.length === 0) {
        setIsPanning(false);
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, zoomScale, isPanning, panStart, panOffset]);

  // --- Double-click to toggle zoom ---
  const handleDoubleClick = () => {
    if (zoomScale > 1) {
      resetZoom();
    } else {
      setZoomScale(2);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    resetZoom();
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) => (prevIndex + newDirection + images.length) % images.length
    );
  };

  if (!isOpen || images.length === 0 || !images[currentIndex]) return null;

  return (
    <AnimatePresence>
      <div ref={modalRef} className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden" style={{ touchAction: 'none' }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-zoom-out"
        />

        {/* Header/Tools */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[210] pointer-events-none">
          <div className="flex gap-4 pointer-events-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center">
              <p className="text-white/60 font-manrope text-[10px] md:text-xs uppercase tracking-widest leading-none">
                <span className="text-white font-bold">{currentIndex + 1}</span> / {images.length}
              </p>
            </div>
            {/* Zoom Level Indicator */}
            {zoomScale > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center cursor-pointer"
                onClick={resetZoom}
                title="Click to reset zoom"
              >
                <p className="text-white/60 font-manrope text-[10px] md:text-xs uppercase tracking-widest leading-none">
                  <span className="text-white font-bold">{zoomScale.toFixed(1)}</span>x · reset
                </p>
              </motion.div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 pointer-events-auto group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Main Slider Area */}
        <div className="relative w-full h-full flex items-center justify-center p-2 pt-14 pb-14 md:p-4 md:pt-16 md:pb-16 lg:p-6 lg:pt-18 lg:pb-18">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              drag={zoomScale <= 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (zoomScale > 1) return;
                const swipe = offset.x;
                if (Math.abs(velocity.x) > 500 || Math.abs(swipe) > 100) {
                  if (swipe < 0) paginate(1);
                  else paginate(-1);
                }
              }}
              className="absolute inset-0 flex items-center justify-center p-2 pt-14 pb-14 md:p-4 md:pt-16 md:pb-16 lg:p-6 lg:pt-18 lg:pb-18"
            >
              {/* Zoomable Image Container */}
              <div
                ref={imageContainerRef}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDoubleClick}
                className={cn(
                  "relative w-full h-full",
                  zoomScale > 1 ? "cursor-grab active:cursor-grabbing overflow-hidden" : "cursor-default"
                )}
              >
                <div
                  style={{
                    transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
                    transformOrigin: "center center",
                    transition: isPanning ? "none" : "transform 0.3s ease-out",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`Project image ${currentIndex + 1}`}
                    fill
                    sizes="100vw"
                    quality={100}
                    priority
                    unoptimized
                    className="object-contain drop-shadow-2xl select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation Controls - Hidden when Zoomed */}
          {images.length > 1 && zoomScale === 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 lg:left-12 z-[210] w-12 h-12 md:w-16 md:h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full hidden lg:flex items-center justify-center text-white transition-all duration-300 group"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                className="absolute right-4 md:right-8 lg:right-12 z-[210] w-12 h-12 md:w-16 md:h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full hidden lg:flex items-center justify-center text-white transition-all duration-300 group"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
        </div>

        {/* Mobile/Tablet Navigation - Hidden when Zoomed */}
        <div
          className={cn(
            "absolute bottom-28 left-0 w-full flex justify-center z-[210] pointer-events-none transition-all duration-500 lg:hidden",
            zoomScale > 1 ? "opacity-0 invisible translate-y-10" : "opacity-100 visible translate-y-0"
          )}
        >
          {images.length > 1 && (
            <div className="flex gap-16 pointer-events-auto">
              <button
                className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Badge - Bottom on Desktop, above mobile nav on mobile */}
        <div
          className={cn(
            "absolute left-0 w-full flex justify-center z-[210] pointer-events-none transition-all duration-500 bottom-8 lg:bottom-4",
            zoomScale > 1 ? "opacity-0 invisible translate-y-10" : "opacity-100 visible translate-y-0"
          )}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl md:min-w-[300px] text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Maximize2 className="w-3 h-3 text-white/40" />
              <span className="text-[10px] uppercase font-manrope tracking-widest text-white/40">Full Preview Mode</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
