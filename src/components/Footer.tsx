"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Facebook, Youtube, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND_CONFIG } from "@/lib/data";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ackLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const line1Ref = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);
  const line2Ref = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // 1. Cultural Acknowledgement Staggered Reveal
      tl.fromTo(
        ackLinesRef.current.filter(Boolean),
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // 2. Expand Divider Line 1 from Left
      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
          "-=0.4"
        );
      }

      // 3. Staggered Entrance of the 3 Entity Logos
      tl.fromTo(
        logosRef.current.filter(Boolean),
        {
          y: 40,
          opacity: 0,
          scale: 0.92,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // 4. Expand Divider Line 2 from Right
      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
          "-=0.5"
        );
      }

      // 5. Copyright Slide-in from Left
      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }

      // 6. Social Icons Elastic Pop-in from Right
      tl.fromTo(
        socialIconsRef.current.filter(Boolean),
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.6"
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#cc0000] text-white pt-24 pb-12 select-none overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-16">
        {/* Cultural Acknowledgement Section matching Screenshot 2 */}
        <div className="max-w-4xl space-y-3.5 text-left">
          <p
            ref={(el) => {
              ackLinesRef.current[0] = el;
            }}
            className="text-sm sm:text-base font-light text-white leading-relaxed"
          >
            Poppy Media acknowledges Aboriginal and Torres Strait Islander peoples as
            the First Australians and Traditional Custodians of the lands on which we
            live, learn and work.
          </p>
          <p
            ref={(el) => {
              ackLinesRef.current[1] = el;
            }}
            className="text-sm sm:text-base font-medium text-white tracking-wide"
          >
            Always was, always will be, Aboriginal land.
          </p>
          <p
            ref={(el) => {
              ackLinesRef.current[2] = el;
            }}
            className="text-xs sm:text-sm font-light text-white/90 pt-1 leading-relaxed"
          >
            Members of Aboriginal and Torres Strait Islander communities are
            respectfully advised that this website contains images and voices of
            deceased people.
          </p>
        </div>

        {/* Divider Line 1 with scaleX animation */}
        <div
          ref={line1Ref}
          className="h-[1px] w-full bg-white/20 origin-left"
        />

        {/* 3 Entity Logos Column matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 items-center">
          {/* Logo 1: POPPY PRODUCTIONS */}
          <div
            ref={(el) => {
              logosRef.current[0] = el;
            }}
            className="flex flex-col items-start justify-center group cursor-pointer"
          >
            <Link href="/" className="inline-block transform-gpu transition-all duration-300 hover:scale-105">
              <div className="flex flex-col text-white tracking-[0.3em] font-light leading-none">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.35em] transition-all duration-300 group-hover:tracking-[0.42em] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  POPPY
                </span>
                <span className="text-xs sm:text-sm tracking-[0.42em] mt-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                  PRODUCTIONS
                </span>
              </div>
            </Link>
          </div>

          {/* Logo 2: DARK MATTER */}
          <div
            ref={(el) => {
              logosRef.current[1] = el;
            }}
            className="flex flex-col items-start md:items-center justify-center group cursor-pointer"
          >
            <Link
              href="/about#divisions"
              className="inline-block transform-gpu transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col text-white tracking-[0.3em] font-light leading-none">
                <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.35em] transition-all duration-300 group-hover:tracking-[0.42em] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  DARK
                </span>
                <span className="text-xs sm:text-sm tracking-[0.42em] mt-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                  MATTER
                </span>
              </div>
            </Link>
          </div>

          {/* Logo 3: POPPY ENTERTAINMENT */}
          <div
            ref={(el) => {
              logosRef.current[2] = el;
            }}
            className="flex flex-col items-start md:items-end justify-center group cursor-pointer"
          >
            <Link
              href="/about#divisions"
              className="inline-block transform-gpu transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col text-white tracking-[0.3em] font-light leading-none">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.35em] transition-all duration-300 group-hover:tracking-[0.42em] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  POPPY
                </span>
                <span className="text-xs sm:text-sm tracking-[0.42em] mt-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                  ENTERTAINMENT
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Divider Line 2 with scaleX animation */}
        <div
          ref={line2Ref}
          className="h-[1px] w-full bg-white/20 origin-right"
        />

        {/* Bottom Bar: Copyright on Left, Social Icons on Right matching Screenshot 2 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-light">
          <div
            ref={copyRef}
            className="text-white/90 tracking-wide"
          >
            &copy; {new Date().getFullYear()} Poppy Productions.
          </div>

          <div className="flex items-center space-x-6 text-white">
            <a
              ref={(el) => {
                socialIconsRef.current[0] = el;
              }}
              href={BRAND_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-1 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-125 hover:rotate-6 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              <Facebook className="w-4 h-4 fill-white" />
            </a>
            <a
              ref={(el) => {
                socialIconsRef.current[1] = el;
              }}
              href={BRAND_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-1 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-125 hover:-rotate-6 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              ref={(el) => {
                socialIconsRef.current[2] = el;
              }}
              href={BRAND_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-1 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-125 hover:rotate-6 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
