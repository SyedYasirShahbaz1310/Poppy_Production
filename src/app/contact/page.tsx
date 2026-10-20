"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageSquare, Compass, ShieldCheck } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import { BRAND_CONFIG } from "@/lib/data";

export default function ContactPage() {
  return (
    <div className="relative bg-[#0A0A0A] text-white min-h-screen">
      {/* 1. Page Hero with Full-Bleed Cinematic Background Picture */}
      <section className="relative h-[55vh] sm:h-[65vh] min-h-[420px] w-full flex items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/assets/images/menu_bg_extracted_aerial.webp"
            alt="Poppy Productions Lahore Studio"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-12 space-y-3 sm:space-y-4 pt-16">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-white/70 hover:text-[#FF5E3A] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white select-none">
            CONTACT
          </h1>
          <p className="text-[11px] sm:text-sm font-light uppercase tracking-[0.22em] sm:tracking-[0.35em] text-white/85 max-w-2xl mx-auto">
            POPPY PRODUCTIONS STUDIO &bull; DHA PHASE 1, LAHORE, PAKISTAN
          </p>
        </div>
      </section>

      {/* 2. Interactive Contact Form & Studio Details Card (Screenshot 2) */}
      <ContactSection />

      {/* 3. Studio Map & Access Information Section */}
      <section className="relative bg-[#111111] py-14 sm:py-16 md:py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 space-y-8 sm:space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#F2613F] block mb-2">
                STUDIO HEADQUARTERS
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.15em] text-white">
                VISIT POPPY PRODUCTIONS
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=Hello%20Poppy%20Productions,%20I%20am%20visiting%20the%20Lahore%20Studio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-500 hover:text-black px-4 sm:px-5 py-2.5 text-xs font-semibold text-emerald-400 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href={`tel:${BRAND_CONFIG.contact.phone}`}
                className="inline-flex items-center space-x-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black px-4 sm:px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>Call Studio</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
            <iframe
              title="Poppy Productions Studio Location"
              src="https://maps.google.com/maps?q=DHA%20Phase%201%20Lahore%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(85%)" }}
              loading="lazy"
              allowFullScreen
            />
            {/* Overlay pill with studio badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center space-x-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 px-3 sm:px-4 py-2 shadow-xl text-xs text-white max-w-[calc(100%-1.5rem)] truncate">
              <MapPin className="w-4 h-4 text-[#F2613F] shrink-0" />
              <span className="font-medium truncate">DHA Phase 1 Fort Villas, Lahore, 54810</span>
            </div>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <Compass className="w-4 h-4 text-[#F2613F]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Strategic Location</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Centrally positioned in DHA Phase 1 Lahore with swift accessibility to major commercial hubs, airports, and private production soundstages.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">24/7 Production Unit</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Operating round-the-clock physical production, DI color suites, and emergency client turnaround workflows.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <ShieldCheck className="w-4 h-4 text-[#F2613F]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Direct Access</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Direct producer contacts via WhatsApp and phone ensure zero friction communication from pre-production to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
