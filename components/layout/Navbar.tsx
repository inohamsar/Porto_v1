"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import TypingEffect from "../motion/TypingEffect";
import { useScroll } from "./SmoothScroll";

const navLinks = [
  { title: "Home", href: "#" },
  { title: "Works", href: "#projects" },
  { title: "About", href: "#about" },
  { title: "Services", href: "#services" },
  { title: "Certifications", href: "#certifications" },
  { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenis = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Threshold: Muncul saat mendekati section Projects (sekitar 4.8x tinggi viewport)
      const threshold = window.innerHeight * 4.4;
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "unset";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  const contentVariants = {
    initial: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    exit: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const linkVariants = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.33, 1, 0.68, 1] as const },
    }),
  };

  const socialVariants = {
    initial: { x: 50, opacity: 0 },
    animate: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.6 + i * 0.1,
        ease: [0.33, 1, 0.68, 1] as const
      },
    }),
  };

  return (
    <>
      {/* Navbar bar — Tampilan dinamis berdasarkan scroll */}
      <nav
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 flex justify-between items-center ${isScrolled
          ? "p-4 bg-black/40 backdrop-blur-xl"
          : "p-6 bg-transparent mix-blend-difference"
          }`}
      >
        <Link
          href="/"
          className="text-2xl font-syne uppercase tracking-tighter text-white"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Ino
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform duration-300 pointer-events-auto group"
        >
          <Menu className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </nav>

      {/* Menu overlay — DILUAR nav, tidak terpengaruh mix-blend-difference */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Layer 1: Background gelap + blur */}
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-[89]"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.82)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
            />

            {/* Layer 2: Konten menu dengan animasi clip-path */}
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 text-white flex flex-col justify-center items-center z-[90]"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="flex flex-col items-center gap-4 text-center">
                {navLinks.map((link, i) => (
                  <div key={link.title} className="overflow-hidden">
                    <motion.div
                      custom={i}
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl md:text-7xl font-syne font-black uppercase tracking-tighter transition-all duration-500 text-white/20 hover:text-white hover:tracking-wide"
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-8 md:bottom-12 left-6 md:left-24 text-white/50 font-manrope max-w-[200px] md:max-w-md text-[10px] md:text-sm uppercase tracking-widest text-left">
                <p><span className="hidden md:inline">InoHamsar — </span><TypingEffect /></p>
                <p className="mt-2 md:mt-4">Based in Indonesia.</p>
              </div>

              <div className="absolute bottom-8 md:bottom-12 right-6 md:right-24 flex flex-col gap-4 md:gap-6 items-end">
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-white/70 font-manrope text-[8px] md:text-[10px] uppercase tracking-[0.4em]"
                >
                  Quick Links
                </motion.span>
                <div className="flex gap-2 md:gap-4 items-center">
                  {[
                    { href: "https://wa.me/6285954633810", src: "/social/wa.webp", alt: "WhatsApp" },
                    { href: "https://instagram.com/inohamsar", src: "/social/ig.webp", alt: "Instagram" },
                    { href: "mailto:inohamsar@gmail.com", src: "/social/gmail.webp", alt: "Email" },
                  ].map((social, i) => (
                    <motion.a
                      key={social.alt}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      custom={i}
                      variants={socialVariants}
                      initial="initial"
                      animate="animate"
                      whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={social.src}
                        alt={social.alt}
                        className="w-4 h-4 md:w-6 md:h-6 object-contain"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
