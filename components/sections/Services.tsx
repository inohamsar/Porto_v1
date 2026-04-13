"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Code, Globe, Search, BarChart, Palette, Megaphone } from "lucide-react";
import RevealHeading from "../motion/RevealHeading";
import Separator from "../ui/Separator";

const text = "Solusi teknologi end-to-end yang mengintegrasikan kecerdasan buatan, infrastruktur cloud yang aman, dan strategi digital untuk mendorong efisiensi dan profitabilitas bisnis Anda.";

const services = [
  {
    title: "Software Development",
    icon: Code,
    color: "text-cyan-400",
    desc: "Membangun arsitektur monorepo yang skalabel dengan Next.js dan TypeScript untuk infrastruktur digital perusahaan yang tangguh."
  },
  {
    title: "AI Automation & Agents",
    icon: Globe,
    color: "text-purple-400",
    desc: "Otomatisasi alur kerja dan CS menggunakan AI Agent yang cerdas, mampu melayani ribuan klien secara simultan tanpa penurunan kualitas."
  },
  {
    title: "Digital Advertising",
    icon: Megaphone,
    color: "text-emerald-400",
    desc: "Strategi Meta Ads yang terintegrasi dengan sistem tracking akurat untuk memaksimalkan ROI dan pertumbuhan bisnis."
  },
  {
    title: "Cloud & Network",
    icon: Search,
    color: "text-blue-400",
    desc: "Pengelolaan database (Google, Azure, Alibaba) dan keamanan jaringan (Cisco, Fortinet) untuk proteksi data bisnis menyeluruh."
  },
  {
    title: "Data Analytics & BI",
    icon: BarChart,
    color: "text-amber-400",
    desc: "Menganalisis pergerakan data untuk memberikan wawasan strategis dalam pengambilan keputusan bisnis yang tepat sasaran."
  },
  {
    title: "UX Strategy & Design",
    icon: Palette,
    color: "text-rose-400",
    desc: "Merancang pengalaman pengguna yang intuitif dan estetik untuk meningkatkan konversi serta loyalitas pengguna terhadap produk."
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      },
    },
  };

  const child = {
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

  // Durasi & delay unik per ikon agar bounce asinkron
  const bounceDurations = [1.2, 1.4, 1.0, 1.6, 1.3, 1.5];
  const bounceDelays = [0, 0.3, 0.15, 0.45, 0.6, 0.25];

  return (
    <section id="services" className="relative z-20 bg-black py-12 md:py-24 lg:pt-40 lg:pb-20 px-6 md:px-12 lg:px-container overflow-x-clip">
      {/* CSS Keyframes untuk bounce — terpisah dari Framer Motion */}
      <style>{`
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .bounce-icon {
          transition: transform 0.3s ease;
        }
        .group:hover .bounce-icon {
          animation: none !important;
          transform: translateY(0) !important;
        }
      `}</style>

      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center mb-12 md:mb-24">
        <div className="relative z-10 flex flex-col gap-6">
          <RevealHeading
            text="Services"
            className="text-4xl md:text-6xl lg:text-8xl font-syne uppercase tracking-tighter"
          />
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-2 md:gap-y-1 lg:gap-x-3 lg:gap-y-2 max-w-4xl"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={child}
                className="text-xl md:text-2xl lg:text-3xl font-manrope leading-snug text-white/70 hover:text-white transition-colors"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Visual Asset synchronized with text completion (22 words = ~2s delay) */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: isInView ? 0.6 : 0 }}
          className="absolute lg:relative z-0 top-1/2 left-1/2 -translate-x-1/2 translate-y-[-10%] lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 aspect-square w-full max-w-[420px] md:max-w-[450px] mx-auto lg:ml-auto"
        >
          {/* Interactive Hover Layer (Fast Spring Physics) */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3, y: -20 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="w-full h-full cursor-pointer"
          >
            <div
              className="relative w-full h-full z-10 blur-[6px] lg:blur-none opacity-50 lg:opacity-100"
              style={{
                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)",
                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)"
              }}
            >
              <Image
                src="/img/Animation1.webp"
                alt="Services Visual"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-20 gap-x-12">
        {services.map((service, i) => {
          const getOffset = () => {
            if (i === 0 || i === 3) return { x: -40, y: 0 };
            if (i === 2 || i === 5) return { x: 40, y: 0 };
            if (i === 1) return { x: 0, y: -40 };
            if (i === 4) return { x: 0, y: 40 };
            return { x: 0, y: 20 };
          };
          const offset = getOffset();
          const smoothTransition = {
            duration: 1.2,
            delay: i * 0.08,
            ease: [0.25, 0.1, 0.25, 1] as const, // CSS ease (ultra-smooth)
          };

          const cardVariants = {
            hidden: {
              opacity: 0,
              x: offset.x,
              y: offset.y,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                ...smoothTransition,
                staggerChildren: 0.02,
                delayChildren: 0.1,
              },
            },
          };

          const wordVariants = {
            hidden: { opacity: 0, x: -10, y: 5 },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9] as const,
              },
            },
          };

          return (
            <motion.div
              key={service.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.02 }}
              viewport={{ once: false, amount: 0.2 }}
              className="group flex flex-col items-start gap-6 border border-white/10 md:border-0 md:border-l md:border-white/5 px-8 py-10 md:py-0 hover:border-white transition-colors duration-500 rounded-2xl md:rounded-none"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <div
                  className="flex items-center justify-center bounce-icon"
                  style={{
                    animation: `iconBounce ${bounceDurations[i]}s ease-in-out ${bounceDelays[i]}s infinite`,
                  }}
                >
                  <service.icon className={`w-8 h-8 ${service.color} group-hover:text-black transition-colors duration-500`} />
                </div>
              </div>
              <h3 className="text-1xl md:text-2xl lg:text-3xl font-syne uppercase tracking-tight">{service.title}</h3>
              <motion.p
                className="text-white/40 font-plus-jakarta font-light leading-relaxed max-w-xs flex flex-wrap gap-x-1"
              >
                {service.desc.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Section Separator (Animated Breathing) */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <Separator />
      </div>
    </section>
  );
}
