"use client";

import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="relative pt-24 bg-white text-neutral-900 min-h-screen">
      {/* Editorial Header */}
      <section className="relative bg-white py-16 md:py-24 text-center border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-4">
          <div className="inline-block">
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-[#F2613F] transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to About</span>
            </Link>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light uppercase tracking-[0.18em] text-neutral-900">
            Our Team
          </h1>
          <p className="text-sm sm:text-base font-light text-neutral-600 max-w-2xl mx-auto tracking-wide">
            The visionary directors, producers, cinematographers, and storytellers behind Poppy Productions.
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
