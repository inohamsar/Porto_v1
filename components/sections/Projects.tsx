"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RevealHeading from "../motion/RevealHeading";
import ProjectModal from "../ui/ProjectModal";
import GalleryModal from "../ui/GalleryModal";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Pusat Kendali Bisnis Berbasis AI",
    role: "NUSA AI",
    impact: "NUSA AI dirancang menanggapi kebutuhan para pemilik bisnis skala agensi, retail, dan e-commerce di Indonesia yang kewalahan mengakses berbagai aplikasi berbeda (Ads Manager, WMS/Gudang, dan Sistem Chat CS) hanya untuk mengetahui keadaan bisnisnya.",
    image: "/project/nusa/cover_nusa.webp",
    color: "#8b5cf6",
    galleryFolder: "nusa/Card_Nusa"
  },
  {
    title: "HRIS & Payroll System",
    role: "HRIS WITH AI ASSISTANT",
    impact: "Dilengkapi dengan AI Assistant serta Integrasi GPS & Face Detection untuk presensi anti-manipulasi. Otomatisasi perhitungan penggajian real-time dari data absensi.",
    image: "/project/Hris/cover_hris.webp",
    color: "#3b82f6",
    galleryFolder: "Hris/Card_Hris"
  },
  {
    title: "Sales Field Activity",
    role: "SFA & Real-time Tracking",
    impact: "Pemetaan prospek real-time dan verifikasi kunjungan lapangan. Memberikan data strategis berbasis lokasi bagi manajemen.",
    image: "/project/Sales/sales_cover.webp",
    color: "#10b981",
    galleryFolder: "Sales/card_Sales"
  },
  {
    title: "Asset Management",
    role: "Monorepo Scalability",
    impact: "Pengelolaan ribuan aset perusahaan dalam satu dashboard terpusat. Mengoptimalkan siklus hidup dan pemeliharaan aset.",
    image: "/project/Assets_management/cover_asets.webp",
    color: "#f59e0b",
    galleryFolder: "Assets_management/Card_Assets_management"
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  onOpenGallery: (folder: string) => void;
}

function ProjectCard({ project, index, onOpenGallery }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax: Image moves slightly slower/faster than container
  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Parallax: Subtle scale based on viewport position
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onClick={() => project.galleryFolder && onOpenGallery(project.galleryFolder)}
      className={cn(
        "group relative h-[400px] md:h-[550px] lg:h-[650px] overflow-hidden rounded-3xl bg-white/5",
        project.galleryFolder ? "cursor-zoom-in" : "cursor-default"
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: yImage, scale: scaleImage }}
          className="absolute z-0 -inset-[20%]"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition-all duration-700 ease-out opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-30 object-cover"
          />
        </motion.div>

        {/* Hover Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"
          style={{
            background: `radial-gradient(circle at center, ${project.color}, transparent 70%)`
          }}
        />
      </div>

      <div className="absolute inset-0 z-20 pt-8 px-8 pb-16 md:p-10 lg:p-12 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-center">
          <span className="text-[10px] md:text-xs lg:text-sm tracking-[0.3em] font-manrope uppercase text-white/50">{project.role}</span>
          <div className="px-5 py-[3px] bg-white text-black rounded-full shadow-lg transform transition-transform duration-500 group-hover:scale-110 pointer-events-auto cursor-pointer">
            <span className="text-[10px] font-manrope font-extrabold tracking-[0.15em] uppercase">Lihat</span>
          </div>
        </div>
        <div>
          <h3 className="text-[clamp(1.1rem,5.6vw,2rem)] md:text-[clamp(1.2rem,2.5vw,2.8rem)] lg:text-[clamp(1.5rem,2.7vw,3.5rem)] font-syne uppercase tracking-tighter leading-[0.95] w-full break-words whitespace-normal transition-all duration-500">
            {project.title}
          </h3>
          <p className="mt-4 text-white/40 font-manrope text-[clamp(0.7rem,2vw,0.8rem)] md:text-[clamp(0.75rem,1.5vw,0.85rem)] lg:text-[clamp(0.8rem,1vw,0.95rem)] max-w-md leading-relaxed">
            {project.impact}
          </p>
          <div className="h-[1px] w-0 bg-white/50 mt-8 md:mt-10 group-hover:w-full transition-all duration-1000 ease-in-out" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleOpenGallery = async (folder: string) => {
    try {
      const res = await fetch(`/api/gallery?folder=${encodeURIComponent(folder)}`);
      const data = await res.json();
      if (data.images && data.images.length > 0) {
        setGalleryImages(data.images);
        setIsGalleryOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  return (
    <section
      id="projects"
      className="relative z-10 -mt-[100vh] pt-[25rem] md:pt-[30rem] lg:pt-[40rem] pb-12 md:pb-20 lg:pb-32 px-6 lg:px-container overflow-hidden"
    >
      {/* Gradient fade: transparan → hitam */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,0.85) 15%, #000000 25%)",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 md:mb-16 lg:mb-8 gap-y-10 lg:gap-12">
        {/* Left Block: Title + Description Stacked */}
        <div className="flex flex-col items-start gap-6 md:gap-8 flex-1">
          <RevealHeading
            text="Project Showcase"
            className="text-[clamp(1.5rem,12vw,2.2rem)] md:text-[clamp(2.2rem,8vw,3.5rem)] lg:text-[clamp(3.5rem,5vw,5.5rem)] font-syne uppercase tracking-tighter leading-none"
            direction="left"
            noPadding
          />

          <div className="max-w-2xl">
            <RevealHeading
              text="A curation of my favorite digital experiences. Each project is a deep-dive into aesthetics and performance."
              className="text-white/70 font-manrope text-[clamp(1rem,4vw,1.2rem)] lg:text-[clamp(1.2rem,2vw,1.4rem)] leading-tight lg:leading-[1.4] translate-y-[-0.05em] justify-start text-left border-none"
              direction="left"
              noPadding
            />
          </div>
        </div>

        {/* Right Block: Button */}
        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto">
          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="group flex items-center gap-4 md:gap-6 px-10 py-3 md:py-4 border border-white/10 rounded-full hover:border-white transition-colors duration-500"
          >
            <span className="text-[11px] md:text-sm font-syne uppercase tracking-widest text-white/90 whitespace-nowrap">See All Projects</span>
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            onOpenGallery={handleOpenGallery}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <GalleryModal
        isOpen={isGalleryOpen}
        images={galleryImages}
        onClose={() => setIsGalleryOpen(false)}
      />
    </section>
  );
}

