"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const laurelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const words = ["WE", "CREATE", "AWARD-WINNING", "FILM", "AND", "TELEVISION"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline with ScrollTrigger - re-runs smoothly whenever scrolled into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // 3D Perspective Word Reveal
      tl.fromTo(
        headingWordsRef.current.filter(Boolean),
        {
          yPercent: 120,
          rotateX: -40,
          opacity: 0,
          filter: "blur(4px)",
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.06,
          ease: "power4.out",
        }
      );

      // Line Expansion from Center
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.9, ease: "expo.out" },
          "-=0.6"
        );
      }

      // Laurels Staggered Elastic Entrance
      const validLaurels = laurelsRef.current.filter(Boolean);
      tl.fromTo(
        validLaurels,
        {
          y: 50,
          opacity: 0,
          scale: 0.85,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.5"
      );

      // 2. Ambient subtle floating idle motion on each laurel (desynchronized)
      validLaurels.forEach((el, index) => {
        if (!el) return;
        const delay = index * 0.3;
        const duration = 2.4 + (index % 3) * 0.4;
        gsap.to(el, {
          y: -6,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Interactive 3D tilt on mouse move
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = laurelsRef.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 12;
    const rotY = (x / (rect.width / 2)) * 12;

    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      scale: 1.08,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 600,
    });
  };

  const handleMouseLeave = (index: number) => {
    const el = laurelsRef.current[index];
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#cc0000] py-20 md:py-28 text-white overflow-hidden [perspective:1000px]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 text-center space-y-12">
        {/* Main Heading matching Screenshot 1 */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-[0.18em] text-white flex flex-wrap justify-center items-center [perspective:800px]">
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-2 sm:mr-3 mb-1"
              >
                <span
                  ref={(el) => {
                    headingWordsRef.current[i] = el;
                  }}
                  className="inline-block transform-gpu will-change-transform"
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          {/* Thin horizontal line divider with glowing shimmer */}
          <div
            ref={lineRef}
            className="mx-auto h-[1px] w-28 bg-white/40 origin-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
          </div>
        </div>

        {/* 5 White Award Laurels Row matching Screenshot 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 items-center justify-items-center pt-2">
          {/* 1. Venice Film Festival */}
          <div
            ref={(el) => {
              laurelsRef.current[0] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={() => handleMouseLeave(0)}
            className="flex flex-col items-center justify-center p-3 cursor-pointer will-change-transform select-none transition-filter duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]"
          >
            <img
              src="/assets/reference/Venice-film-festival-Special-Jury-Prize-White.png"
              alt="Venice Film Festival Special Jury Prize"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain filter brightness-100 pointer-events-none"
            />
          </div>

          {/* 2. TIFF Platform Prize */}
          <div
            ref={(el) => {
              laurelsRef.current[1] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={() => handleMouseLeave(1)}
            className="flex flex-col items-center justify-center p-3 cursor-pointer will-change-transform select-none transition-filter duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]"
          >
            <img
              src="/assets/reference/TIFF-platform-prize-white.png"
              alt="TIFF Toronto International Film Festival Winner"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain filter brightness-100 pointer-events-none"
            />
          </div>

          {/* 3. Asia Pacific Screen Awards */}
          <div
            ref={(el) => {
              laurelsRef.current[2] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={() => handleMouseLeave(2)}
            className="flex flex-col items-center justify-center p-3 cursor-pointer will-change-transform select-none transition-filter duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]"
          >
            <img
              src="/assets/reference/Asia-Pacific-Screen-Awards-2017-best-feature-film-white.png"
              alt="Asia Pacific Screen Awards Best Feature Film"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain filter brightness-100 pointer-events-none"
            />
          </div>

          {/* 4. AACTA Awards */}
          <div
            ref={(el) => {
              laurelsRef.current[3] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 3)}
            onMouseLeave={() => handleMouseLeave(3)}
            className="flex flex-col items-center justify-center p-3 cursor-pointer will-change-transform select-none transition-filter duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]"
          >
            <img
              src="/assets/reference/AACTA-awards.svg"
              alt="AACTA Awards Australian Academy Cinema Television Arts"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain filter brightness-0 invert pointer-events-none"
            />
          </div>

          {/* 5. TV Week Logie Awards */}
          <div
            ref={(el) => {
              laurelsRef.current[4] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 4)}
            onMouseLeave={() => handleMouseLeave(4)}
            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 cursor-pointer will-change-transform select-none transition-filter duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]"
          >
            <img
              src="/assets/reference/TV-week-logies-white.png"
              alt="TV Week Logie Awards"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain filter brightness-100 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
