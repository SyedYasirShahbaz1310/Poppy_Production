"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types";
import { PROJECTS_DATA } from "@/lib/data";

interface ProductionsCarouselProps {
  onSelectProject?: (project: Project) => void;
}

export default function ProductionsCarousel({
  onSelectProject,
}: ProductionsCarouselProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward (left to right), -1 = backward

  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // We duplicate projects to create an infinite, seamless wrapping carousel
  const carouselProjects = [...PROJECTS_DATA, ...PROJECTS_DATA];

  // Smooth continuous auto-scroll loop
  const autoScroll = useCallback(() => {
    const track = trackRef.current;
    if (track && !isPaused && !isDragging) {
      const speed = 1.0; // Smooth continuous pixels per frame
      track.scrollLeft += speed * direction;

      const maxScroll = track.scrollWidth / 2;
      if (track.scrollLeft >= maxScroll) {
        track.scrollLeft = 0;
      } else if (track.scrollLeft <= 0 && direction === -1) {
        track.scrollLeft = maxScroll;
      }
    }
    animFrameId.current = requestAnimationFrame(autoScroll);
  }, [isPaused, isDragging, direction]);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(autoScroll);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [autoScroll]);

  // Mouse drag handlers for manual forward/backward scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    setStartX(e.pageX - track.offsetLeft);
    setScrollLeftState(track.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    track.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - track.offsetLeft);
    setScrollLeftState(track.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeftState - walk;
  };

  // Button navigation controls (Forward & Backward)
  const scrollStep = (stepDirection: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = 380;
    track.scrollBy({ left: stepDirection * cardWidth, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="productions"
      className="relative bg-[#FF5E3A] py-16 sm:py-20 md:py-28 text-white overflow-hidden select-none"
    >
      {/* Section Header matching Screenshot 4 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 text-center mb-6 sm:mb-12">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white"
        >
          PRODUCTIONS
        </h2>
        {/* Thin horizontal line divider matching Screenshot 4 */}
        <div
          ref={dividerRef}
          className="mx-auto h-[1px] w-20 sm:w-24 bg-white/40 my-4 sm:my-6 origin-center"
        />
      </div>

      {/* Carousel Container with Left/Right Buttons */}
      <div
        className="relative w-full group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
        }}
      >
        {/* Navigation Arrow Left (Peeche) */}
        <button
          onClick={() => {
            scrollStep(-1);
            setDirection(-1);
          }}
          aria-label="Scroll Carousel Left"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white hover:text-[#FF5E3A] hover:scale-110 shadow-lg focus:outline-none"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2]" />
        </button>

        {/* Navigation Arrow Right (Agey) */}
        <button
          onClick={() => {
            scrollStep(1);
            setDirection(1);
          }}
          aria-label="Scroll Carousel Right"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white hover:text-[#FF5E3A] hover:scale-110 shadow-lg focus:outline-none"
        >
          <ChevronRight className="h-6 w-6 stroke-[2]" />
        </button>

        {/* Continuous Horizontal Scroll Track */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          className={`flex overflow-x-scroll no-scrollbar py-4 px-4 sm:px-8 gap-4 sm:gap-6 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {carouselProjects.map((project, index) => {
            const uniqueKey = `${project.id}-${index}`;
            const isHovered = hoveredId === uniqueKey;

            return (
              <Link
                key={uniqueKey}
                href={`/productions/${project.id}`}
                onMouseEnter={() => setHoveredId(uniqueKey)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex-shrink-0 w-[78vw] max-w-[310px] sm:w-[340px] md:w-[380px] h-[390px] sm:h-[460px] md:h-[490px] overflow-hidden rounded bg-black shadow-2xl transition-transform duration-500 hover:scale-[1.02] cursor-pointer block"
              >
                {/* Poster Image */}
                <img
                  src={project.posterSrc}
                  alt={project.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    isHovered ? "scale-105 opacity-20" : "scale-100 opacity-100"
                  }`}
                />

                {/* Video Playing on Hover */}
                {project.videoSrc && (
                  <video
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    ref={(el) => {
                      if (el) {
                        if (isHovered) {
                          el.play().catch(() => {});
                        } else {
                          el.pause();
                          el.currentTime = 0;
                        }
                      }
                    }}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}

                {/* Centered White Circle < > Drag / Explore Indicator matching Screenshot 1 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div
                    className={`w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300 font-bold ${
                      isHovered
                        ? "scale-100 opacity-100 rotate-0"
                        : "scale-0 opacity-0 -rotate-45"
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 font-sans text-xs font-bold text-neutral-900">
                      <span>&lt;</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                </div>

                {/* Card Gradient Overlay matching Screenshot 1 */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-end transition-colors duration-500 z-10 ${
                    isHovered
                      ? "bg-gradient-to-t from-[#FF5E3A]/90 via-black/40 to-transparent"
                      : "bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                  }`}
                >
                  {/* Category Pill Tag matching Screenshot 1 */}
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-white/90 mb-1">
                    {project.category}
                  </div>

                  {/* Title matching Screenshot 1 */}
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                    {project.title}
                  </h3>

                  {/* Learn More link on hover */}
                  <div
                    className={`flex items-center space-x-1.5 text-xs uppercase tracking-widest text-white font-medium mt-3 transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span>Explore project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Swipe / Arrow Controls */}
        <div className="flex md:hidden items-center justify-center space-x-4 pt-4 px-4">
          <button
            onClick={() => {
              scrollStep(-1);
              setDirection(-1);
            }}
            aria-label="Previous Project"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2]" />
          </button>
          <span className="text-[10px] uppercase tracking-widest text-white/70 font-mono">
            Swipe / Tap
          </span>
          <button
            onClick={() => {
              scrollStep(1);
              setDirection(1);
            }}
            aria-label="Next Project"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 active:scale-95 transition-transform"
          >
            <ChevronRight className="h-5 w-5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Bottom Controls: Direction Flip + View All Button */}
      <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center space-y-4">
        {/* View All Button matching Screenshot 4 & Bunya */}
        <Link
          href="/productions"
          className="inline-block rounded-full border border-white/80 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#FF5E3A] hover:scale-105"
        >
          View all
        </Link>
      </div>
    </section>
  );
}
