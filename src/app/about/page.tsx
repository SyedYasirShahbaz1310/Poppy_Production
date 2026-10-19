"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative pt-24 bg-white text-black">
      {/* 1. Page Header matching About _ Bunya Productions.html Row 0 */}
      <section className="relative bg-white py-20 md:py-32 text-center border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase tracking-[0.15em] text-neutral-900">
            About
          </h1>
        </div>
      </section>

      {/* 2. POPPY GROUP Section on SOLID RED Background matching Bunya Row 1 */}
      <section className="relative bg-[#cc0000] py-24 md:py-36 text-white">
        <div className="mx-auto max-w-5xl px-6 md:px-12 space-y-10 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.2em] text-white">
            POPPY GROUP
          </h2>

          <div className="space-y-6 text-base sm:text-lg font-light leading-relaxed text-white/90">
            <p>
              Poppy Productions is an award-winning independent film, television, and
              commercial production house dedicated to auteur-driven visual
              storytelling and cinematic craftsmanship.
            </p>
            <p>
              Formed by a collective of filmmakers, cinematographers, and creative
              producers, Poppy Productions champions original voices, distinctive
              world-building, and high-production-value visual spectacles across
              feature drama, branded entertainment, and high-impact commercial campaigns.
            </p>
            <p>
              Our slate has screened and competed at premier international festivals,
              garnering accolades for exceptional direction, innovative camera work,
              and powerful emotional resonance.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TEAM Section matching Bunya Screenshots 2, 3 & 4 */}
      <TeamSection />

      {/* 4. DIVISIONS matching Bunya (Bunya Productions, Bunya Entertainment, Dark Matter) */}
      <section id="divisions" className="relative bg-[#f8f8f8] py-24 md:py-36 text-neutral-900">
        <div className="mx-auto max-w-6xl px-6 md:px-12 space-y-16">
          <div className="text-center sm:text-left border-b border-neutral-300 pb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.2em] text-neutral-900">
              DIVISIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* 1. Poppy Productions */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-900">
                POPPY PRODUCTIONS
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#cc0000] font-semibold">
                FILM &amp; TELEVISION
              </p>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Produces and collaborates on a premier slate of award-winning scripted
                feature films and television drama series for domestic and global
                audiences.
              </p>
            </div>

            {/* 2. Poppy Entertainment */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-900">
                POPPY ENTERTAINMENT
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#cc0000] font-semibold">
                COMMERCIAL &amp; DIGITAL
              </p>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Specializes in commercial advertising campaigns, high-energy automotive
                and sports cinematography, and broadcast commercials.
              </p>
            </div>

            {/* 3. Dark Matter */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-900">
                DARK MATTER
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#cc0000] font-semibold">
                POST-PRODUCTION &amp; VFX
              </p>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Full-service finishing house providing ACES color grading, sound design,
                audio mixing, visual effects, and theatrical mastering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <ContactSection />
    </div>
  );
}
