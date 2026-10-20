"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Project } from "@/types";

interface ProductionsClientProps {
  projects: Project[];
}

const CATEGORIES = ["ALL", "FEATURE FILM", "TELEVISION", "COMMERCIAL"] as const;
type CategoryType = (typeof CATEGORIES)[number];

export default function ProductionsClient({ projects }: ProductionsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("ALL");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Smooth cursor tracking for the floating "VIEW" circle button
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Buttery-smooth spring physics for organic cursor momentum
  const springConfig = { damping: 24, stiffness: 280, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mouse/pointer device
    if (typeof window !== "undefined") {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      setIsPointerDevice(hasFinePointer);

      const handleGlobalMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    }
  }, [mouseX, mouseY]);

  // Filter projects based on active tab
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "ALL") return true;
    const cat = project.category.toUpperCase();
    if (activeCategory === "FEATURE FILM") {
      return cat.includes("FEATURE");
    }
    if (activeCategory === "TELEVISION") {
      return cat.includes("SERIES") || cat.includes("TELEVISION") || cat.includes("DRAMA");
    }
    if (activeCategory === "COMMERCIAL") {
      return cat.includes("COMMERCIAL") || cat.includes("BRAND");
    }
    return true;
  });

  return (
    <div className="relative bg-[#0A0A0A] text-white min-h-screen">
      {/* ============================================================== */}
      {/* 1. HERO SECTION matching Bunya Screenshot 1                    */}
      {/* Full-width cinematic image from data with bold "PRODUCTIONS"   */}
      {/* ============================================================== */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black select-none">
        {/* Background Hero Image */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/assets/posters/western_poster.jpg"
            alt="Poppy Productions Hero"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
          />
        </motion.div>

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />

        {/* Title Overlay matching Screenshot 1 */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-12 md:px-20 pb-16 sm:pb-24 z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-5xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              PRODUCTIONS
            </h1>
            <div className="h-1 w-20 sm:w-28 bg-[#FF5E3A] rounded-full" />
            <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.25em] text-white/90 uppercase max-w-2xl leading-relaxed drop-shadow">
              FEATURE FILMS • TELEVISION DRAMA • HIGH-END COMMERCIALS
            </p>
          </motion.div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 text-white/60 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.3em] font-light">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. CATEGORY FILTER BAR matching Bunya Screenshot 2             */}
      {/* Solid Poppy Orange-Red (#FF5E3A) with category filter tabs    */}
      {/* ============================================================== */}
      <section className="sticky top-[52px] sm:top-[60px] z-40 bg-[#FF5E3A] text-white shadow-xl transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center justify-start sm:justify-center space-x-6 sm:space-x-12 py-3.5 sm:py-4 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-200 py-1 whitespace-nowrap focus:outline-none ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span>{category}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. 2-COLUMN PRODUCTIONS GRID matching Screenshot 2             */}
      {/* Clean 2-column layout with centered titles & cursor "VIEW"     */}
      {/* ============================================================== */}
      <section className="relative z-10 bg-black">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-neutral-900"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeInOut", delay: idx * 0.04 }}
                  className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-950 cursor-pointer select-none"
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  <Link
                    href={`/productions/${project.id}`}
                    className="block w-full h-full relative"
                  >
                    {/* Project Poster Image */}
                    <img
                      src={project.posterSrc || project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover filter brightness-[0.75] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                    {/* Centered Title and Category matching Screenshot 2 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                        {project.title}
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm font-light uppercase tracking-[0.25em] text-white/90 drop-shadow">
                        {project.category}
                      </p>

                      {/* Mobile View Pill Badge (visible on touch screens where cursor is hidden) */}
                      <div className="mt-4 sm:hidden">
                        <span className="inline-block rounded-full bg-[#FF5E3A] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                          VIEW
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ============================================================== */}
      {/* 4. FLOATING CURSOR-FOLLOWING "VIEW" BUTTON                     */}
      {/* Smoothly moves with the mouse cursor whenever hovering a card  */}
      {/* ============================================================== */}
      {isPointerDevice && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: hoveredProjectId ? 1 : 0,
            opacity: hoveredProjectId ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            mass: 0.3,
          }}
          className="fixed top-0 left-0 pointer-events-none z-50 -ml-10 -mt-10 sm:-ml-11 sm:-mt-11 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#FF5E3A] text-white font-bold text-xs sm:text-sm uppercase tracking-[0.18em] flex items-center justify-center shadow-2xl drop-shadow-[0_8px_20px_rgba(255,94,58,0.5)] select-none"
        >
          VIEW
        </motion.div>
      )}
    </div>
  );
}
