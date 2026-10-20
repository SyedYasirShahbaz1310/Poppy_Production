"use client";

import Image from "next/image";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

export default function AboutPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      {/* 1. Page Hero with Full-Size Professional Cinematic Background Picture matching Screenshot 5 */}
      <section className="relative h-[65vh] sm:h-[75vh] md:h-[82vh] min-h-[480px] w-full flex items-center justify-center text-center overflow-hidden bg-black">
        {/* Full-bleed background cinematic picture */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/assets/images/menu_bg_extracted_aerial.webp"
            alt="Poppy Productions About Cinematic"
            fill
            priority
            sizes="100vw"
            quality={92}
            className="object-cover object-center"
          />
          {/* Subtle Dark Gradient Overlay for contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
        </div>

        {/* Editorial Text Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 space-y-4 pt-16">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-extralight uppercase tracking-[0.22em] text-white select-none">
            ABOUT
          </h1>
          <p className="text-xs sm:text-sm font-light uppercase tracking-[0.35em] text-white/85 max-w-2xl mx-auto">
            THE CREATIVE COLLECTIVE &amp; STORYTELLERS BEHIND POPPY PRODUCTIONS
          </p>
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

      {/* 3. TEAM Section matching Bunya Screenshots 2, 3 & 4 (Pakistani Leadership Team) */}
      <TeamSection />

      {/* 4. DIVISIONS matching Bunya (Poppy Productions, Poppy Entertainment, Dark Matter) */}
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
