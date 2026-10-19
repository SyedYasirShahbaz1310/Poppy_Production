"use client";

import Hero from "@/components/Hero";
import AwardsSection from "@/components/AwardsSection";
import StatementSection from "@/components/StatementSection";
import ProductionsCarousel from "@/components/ProductionsCarousel";
import { useModal } from "@/context/ModalContext";

export default function HomePage() {
  const { openShowreel, openProject } = useModal();

  return (
    <div className="relative">
      {/* 1. Fullscreen Hero with Left-aligned Watch Showreel (Screenshot 1) */}
      <Hero onOpenShowreel={openShowreel} />

      {/* 2. Awards Section on Solid Red with 5 White Laurels & Scroll Reveal (Screenshot 2) */}
      <AwardsSection />

      {/* 3. Statement Section on Pure White with Ahista-Ahista Progressive Reveal & FIND OUT MORE (Screenshot 3) */}
      <StatementSection />

      {/* 4. Productions Continuous Horizontal Carousel with Hover Video & Drag (Screenshot 4) */}
      <ProductionsCarousel onSelectProject={openProject} />

      {/* Directly transitions to Footer — no intermediate sections per user instructions */}
    </div>
  );
}
