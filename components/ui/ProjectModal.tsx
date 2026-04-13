"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Globe,
  GraduationCap,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart3,
  MessageSquare
} from "lucide-react";
import { useEffect } from "react";
import { useScroll } from "../layout/SmoothScroll";
import TypingEffect from "../motion/TypingEffect";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const moreProjects = [
  {
    title: "Website Company Profile",
    description: "Desain web korporat eksklusif dengan performa tinggi dan SEO optimized.",
    icon: <Globe className="w-6 h-6" />,
    tag: "Branding",
    color: "#3b82f6" // Blue
  },
  {
    title: "Sistem Informasi Akademik",
    description: "Portal mahasiswa & siswa terintegrasi untuk manajemen data pendidikan modern.",
    icon: <GraduationCap className="w-6 h-6" />,
    tag: "Education",
    color: "#8b5cf6" // Purple
  },
  {
    title: "Sistem Kasir (Point of Sale)",
    description: "Solusi POS cloud-based dengan manajemen inventaris dan laporan real-time.",
    icon: <ShoppingCart className="w-6 h-6" />,
    tag: "Retail",
    color: "#f59e0b" // Orange
  },
  {
    title: "CRM & Sales Management",
    description: "Manajemen relasi pelanggan dan otomatisasi pipeline penjualan efisien.",
    icon: <Users className="w-6 h-6" />,
    tag: "Business",
    color: "#10b981" // Green
  },
  {
    title: "Sistem Pembayaran Gateway",
    description: "Integrasi payment gateway untuk transaksi digital yang aman dan otomatis.",
    icon: <CreditCard className="w-6 h-6" />,
    tag: "Fintech",
    color: "#ec4899" // Pink
  },
  {
    title: "Inventory Forecasting System",
    description: "Prediksi stok berbasis data historis menggunakan algoritma cerdas.",
    icon: <BarChart3 className="w-6 h-6" />,
    tag: "AI & Logistik",
    color: "#06b6d4" // Cyan
  },
  {
    title: "Omnichannel Chat Dashboard",
    description: "Satu dashboard untuk semua kanal pesan (WA, IG, FB) guna meningkatkan CX.",
    icon: <MessageSquare className="w-6 h-6" />,
    tag: "Communication",
    color: "#f43f5e" // Rose
  }
];

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const lenis = useScroll();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-crosshair"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[78vh] md:max-h-[85vh] bg-neutral-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-[110] p-1.5 hover:bg-white/10 rounded-full transition-colors duration-300"
            >
              <X className="w-6 h-6 text-white/70" />
            </button>

            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div>
                <h2 className="text-3xl font-syne uppercase tracking-tighter">Extended Projects</h2>
                <p className="text-white/40 font-manrope text-[10px] md:text-xs uppercase tracking-widest mt-1">
                  <TypingEffect words={["Discover more digital solutions"]} />
                </p>
              </div>
            </div>

            {/* Content Scrollable Area */}
            <div
              className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar"
              data-lenis-prevent
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {moreProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="group flex flex-col justify-between p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className="relative w-10 md:w-12 h-10 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 bg-white/5 border border-white/5 group-hover:border-white/10 overflow-visible"
                        style={{
                          backgroundColor: `${project.color}15`,
                          color: project.color,
                        }}
                      >
                        {/* Ambient Glow exactly behind icon */}
                        <div
                          className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-full scale-110 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${project.color} 30%, transparent 70%)`
                          }}
                        />
                        <div className="relative z-10">
                          {project.icon}
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-manrope uppercase tracking-[0.2em] px-3 py-1 rounded-full border transition-all duration-500 group-hover:scale-110"
                        style={{
                          borderColor: `${project.color}30`,
                          color: project.color,
                          backgroundColor: `${project.color}05`
                        }}
                      >
                        {project.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-syne uppercase mb-1 md:mb-2 transition-all">{project.title}</h3>
                      <p className="text-white/40 font-manrope text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
