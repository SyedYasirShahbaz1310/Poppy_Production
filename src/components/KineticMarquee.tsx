"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function KineticMarquee() {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const cutoutRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cutoutRef.current) {
      gsap.fromTo(
        cutoutRef.current,
        { y: 60 },
        {
          y: -60,
          scrollTrigger: {
            trigger: cutoutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }
  }, []);

  const items = Array(8).fill("Award-winning");
  const items2 = Array(8).fill("Film and television");

  return (
    <section className="relative overflow-hidden bg-[#f4f4f4] py-24 sm:py-32 md:py-40 select-none">
      {/* Cutout Image Floating Over the Marquee matching Bunya Row 16 */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <img
          ref={cutoutRef}
          src="/assets/reference/Home-Mystery-Road-Origin-Transparent.png"
          alt="Mystery Road"
          className="h-[80%] max-h-[600px] w-auto object-contain filter drop-shadow-2xl"
        />
      </div>

      {/* Row 1: Award-winning (Moves Left) */}
      <div className="flex whitespace-nowrap overflow-hidden relative z-10">
        <div
          ref={marquee1Ref}
          className="flex whitespace-nowrap animate-marquee-left will-change-transform"
        >
          {items.map((item, idx) => (
            <span
              key={`m1-${idx}`}
              className="inline-flex items-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase tracking-tight mx-6 sm:mx-10 text-neutral-900"
            >
              <span>{item}</span>
              <span className="text-[#FF5E3A] ml-6 sm:ml-10">•</span>
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex whitespace-nowrap animate-marquee-left will-change-transform"
        >
          {items.map((item, idx) => (
            <span
              key={`m1-dup-${idx}`}
              className="inline-flex items-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase tracking-tight mx-6 sm:mx-10 text-neutral-900"
            >
              <span>{item}</span>
              <span className="text-[#FF5E3A] ml-6 sm:ml-10">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Film and television (Moves Right) */}
      <div className="flex whitespace-nowrap overflow-hidden relative z-10 mt-6 sm:mt-10">
        <div
          ref={marquee2Ref}
          className="flex whitespace-nowrap animate-marquee-right will-change-transform"
        >
          {items2.map((item, idx) => (
            <span
              key={`m2-${idx}`}
              className="inline-flex items-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase tracking-tight mx-6 sm:mx-10 text-neutral-400"
            >
              <span>{item}</span>
              <span className="text-[#FF5E3A] ml-6 sm:ml-10">•</span>
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex whitespace-nowrap animate-marquee-right will-change-transform"
        >
          {items2.map((item, idx) => (
            <span
              key={`m2-dup-${idx}`}
              className="inline-flex items-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase tracking-tight mx-6 sm:mx-10 text-neutral-400"
            >
              <span>{item}</span>
              <span className="text-[#FF5E3A] ml-6 sm:ml-10">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
