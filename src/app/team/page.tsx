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
      <section className="relative h-[55vh] sm:h-[65vh] min-h-[420px] w-full flex items-center justify-center text-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/assets/images/menu_bg_cinematic_aerial.jpg"
            alt="Poppy Productions Team"
            fill
            priority
            sizes="100vw"
            quality={92}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 space-y-4 pt-16">
          <Link
            href="/about"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-[#F2613F] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to About</span>
          </Link>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight uppercase tracking-[0.22em] text-white select-none">
            OUR TEAM
          </h1>
          <p className="text-xs sm:text-sm font-light uppercase tracking-[0.35em] text-white/85 max-w-2xl mx-auto">
            THE VISIONARY DIRECTORS, PRODUCERS, AND STORYTELLERS BEHIND POPPY PRODUCTIONS
          </p>
        </div>
      </section>

      {/* Main 3-Column Team Grid with interactive 50/50 detail modal */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
