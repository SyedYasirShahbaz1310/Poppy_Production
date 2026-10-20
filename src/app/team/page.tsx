"use client";

import Image from "next/image";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      {/* Editorial Header with Full-Bleed Cinematic Background Picture */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center text-center overflow-hidden bg-black text-white select-none">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/assets/images/menu_bg_extracted_aerial_2.webp"
            alt="Poppy Productions Team"
            fill
            priority
            sizes="100vw"
            quality={92}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-12 space-y-3 sm:space-y-4 pt-16">
          <Link
            href="/about"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-white/70 hover:text-[#FF5E3A] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to About</span>
          </Link>
          <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white select-none">
            OUR TEAM
          </h1>
          <p className="text-[11px] sm:text-sm font-light uppercase tracking-[0.25em] sm:tracking-[0.35em] text-white/85 max-w-2xl mx-auto">
            THE VISIONARY DIRECTORS, PRODUCERS, AND STORYTELLERS BEHIND POPPY PRODUCTIONS
          </p>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 text-white/60 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.3em] font-light">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Main 3-Column Team Grid with interactive 50/50 detail modal */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
