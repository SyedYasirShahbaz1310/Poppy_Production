"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Project } from "@/types";
import { PROJECTS_DATA } from "@/lib/data";

interface ProductionsGridProps {
  onSelectProject?: (project: Project) => void;
}

export default function ProductionsGrid({ onSelectProject }: ProductionsGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="productions" className="relative bg-[#FF5E3A] py-24 md:py-36 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-16">
        {/* Section Heading matching Bunya Row 9 */}
        <div className="text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.25em] text-white">
            PRODUCTIONS
          </h2>
        </div>

        {/* 2-Column Productions Grid matching Bunya Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS_DATA.map((project) => {
            const isHovered = hoveredId === project.id;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col cursor-pointer overflow-hidden rounded-md bg-black/40 shadow-xl"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectProject && onSelectProject(project)}
              >
                {/* Media Box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  {/* Poster thumbnail */}
                  <img
                    src={project.posterSrc}
                    alt={project.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      isHovered ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Smooth video hover */}
                  <video
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    ref={(el) => {
                      if (el) {
                        if (isHovered) {
                          el.play().catch(() => {});
                        } else {
                          el.pause();
                          el.currentTime = 0;
                        }
                      }
                    }}
                    className={`h-full w-full object-cover transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Hover Overlay with Title and Subtitle like Bunya */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
                      {project.title}
                    </h3>
                    <div className="text-xs uppercase tracking-widest text-white/80 mt-1 font-light">
                      {project.category} • {project.year}
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-white font-medium mt-3 opacity-90 group-hover:opacity-100 group-hover:underline">
                      <span>Learn more</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom View All Button matching Bunya */}
        <div className="text-center pt-8">
          <a
            href="#productions"
            className="inline-block rounded-full border border-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#FF5E3A] transition-colors"
          >
            View all
          </a>
        </div>
      </div>
    </section>
  );
}
