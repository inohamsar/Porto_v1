"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";
import RevealHeading from "../motion/RevealHeading";

// Custom Instagram Icon for High-End consistency
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef(null);
  const isDescriptionInView = useInView(descriptionRef, { once: false, amount: 0.2 });
  const buttonsRef = useRef(null);
  const areButtonsInView = useInView(buttonsRef, { once: false, amount: 0.6 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mql.addEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const descriptionText = "Kombinasi AI Engineering dan strategi digital yang saya tawarkan dirancang untuk memastikan sistem bekerja lebih keras untuk bisnis Anda. Saatnya beralih ke efisiensi maksimal yang membuka ruang lebih besar bagi pertumbuhan profitabilitas Anda.";
  const words = descriptionText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
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
      x: -60,
      transition: {
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  const xLeft = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const xRight = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative z-10 bg-black pt-12 md:pt-24 lg:pt-40 pb-12 md:pb-24 lg:pb-32 px-4 md:px-12 lg:px-container overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        <motion.h2
          style={{ x: xLeft }}
          className="text-[6vw] md:text-[7vw] font-syne font-black uppercase leading-tight md:leading-none opacity-20 hover:opacity-100 transition-opacity flex whitespace-nowrap justify-center overflow-visible"
        >
          LET&apos;S CONNECT
        </motion.h2>
        <motion.h2
          style={{ x: xRight }}
          className="text-[6vw] md:text-[7vw] font-syne font-black uppercase leading-tight md:leading-none opacity-20 hover:opacity-100 transition-opacity flex whitespace-nowrap justify-center text-outline text-center overflow-visible"
        >
          GET IN TOUCH
        </motion.h2>
      </div>

      <div className="mt-10 md:mt-24 lg:mt-32 px-4 md:px-0 lg:px-container grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-24 md:gap-8 lg:gap-24 items-stretch">
        <div className="flex flex-col">
          <RevealHeading
            text="Siap Membangun Masa Depan Digital & AI?"
            className="text-[1.6rem] md:text-4xl lg:text-8xl font-syne uppercase tracking-tighter leading-[0.9]"
          />
          <motion.p
            ref={descriptionRef}
            variants={containerVariants}
            initial="hidden"
            animate={isDescriptionInView ? "visible" : "hidden"}
            className="mt-2 text-xl md:text-2xl lg:text-3xl font-manrope text-white/70 flex flex-wrap gap-x-2"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="hover:text-white transition-colors cursor-default"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Social Buttons Row - TABLET OPTIMIZATION ONLY */}
          <div
            ref={buttonsRef}
            className="hidden md:flex lg:hidden relative z-10 flex-row flex-wrap justify-start items-center gap-6 w-full mt-10"
          >
            {[
              { href: "https://wa.me/6285954633810", src: "/social/wa.webp", alt: "WhatsApp" },
              { href: "mailto:inohamsar@gmail.com", src: "/social/gmail.webp", alt: "Email" },
              { href: "https://instagram.com/inohamsar", src: "/social/ig.webp", alt: "Instagram" },
            ].map((social, i) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 20, stiffness: 40, mass: 1.2, delay: 0.8 + (i * 0.1) } }
                }}
                animate={isDescriptionInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/15 transition-colors"
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={32}
                  height={32}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          ref={buttonsRef}
          className="relative flex flex-col justify-start md:justify-end items-start md:items-end gap-8 h-full py-2 w-full mt-12 md:mt-0 min-h-[150px] md:min-h-[250px] lg:min-h-[300px]"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate={areButtonsInView ? "visible" : "hidden"}
        >
          {/* Contact Graphic (Overlapping Layer) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: isMobile ? 1 : 0.1, x: isMobile ? 100 : 0 },
              visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.8, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.4 } }
            }}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-[1.8] -translate-x-[12%] md:scale-[1.2] md:translate-x-0 lg:scale-[1.1]"
          >
            <Image
              src="/img/contact.webp"
              alt="Contact Network"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain md:object-cover object-right md:object-center -translate-y-20 md:translate-y-0 lg:-translate-y-13"
              priority
            />
          </motion.div>

          {/* Social Buttons Row (Original Position for Mobile/Desktop) */}
          <div className="md:hidden lg:flex relative z-10 flex flex-row flex-wrap justify-start lg:justify-end items-center gap-6 w-full mt-4 lg:mt-0">
            {[
              { href: "https://wa.me/6285954633810", src: "/social/wa.webp", alt: "WhatsApp" },
              { href: "mailto:inohamsar@gmail.com", src: "/social/gmail.webp", alt: "Email" },
              { href: "https://instagram.com/inohamsar", src: "/social/ig.webp", alt: "Instagram" },
            ].map((social, i) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={{
                  hidden: { opacity: 0, x: isMobile ? -50 : 50 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 20, stiffness: 40, mass: 1.2, delay: 0.2 + (i * 0.1) } }
                }}
                animate={areButtonsInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/15 transition-colors"
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={32}
                  height={32}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
