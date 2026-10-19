"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const statementText =
    "THE POPPY MEDIA GROUP IS AN AWARD-WINNING FILM, TELEVISION AND DISTRIBUTION COMPANY WORKING WITH THE BEST CREATIVE TALENT TO BRING INCREDIBLE STORIES TO LIFE.";

  const words = statementText.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Ahista-Ahista progressive word reveal linked to scroll
      const validWords = wordsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        validWords,
        {
          opacity: 0.15,
          y: 8,
          filter: "blur(2px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          ease: "power2.out",
        }
      );

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-28 md:py-40 text-black text-center overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12 space-y-12">
        {/* Main Editorial Statement matching Screenshot 3 */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-light uppercase tracking-[0.08em] leading-snug sm:leading-tight text-neutral-900 font-sans flex flex-wrap justify-center">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="inline-block mr-2 sm:mr-3 mb-1 select-none will-change-transform"
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Centered Outlined Pill Button matching Screenshot 3 */}
        <div ref={buttonRef}>
          <Link
            href="/about"
            className="inline-block rounded-full border border-neutral-900 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 transition-all duration-300 hover:bg-[#cc0000] hover:border-[#cc0000] hover:text-white hover:scale-105"
          >
            FIND OUT MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
