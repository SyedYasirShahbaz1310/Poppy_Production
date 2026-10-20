"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, X, Share2, ChevronLeft, ChevronRight, Check, LayoutGrid } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types";

interface ProjectDetailClientProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
  relatedProjects,
}: ProjectDetailClientProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [copied, setCopied] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoryRef = useRef<HTMLParagraphElement>(null);
  const synopsisRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title entrance animation
    if (titleRef.current && categoryRef.current) {
      gsap.fromTo(
        [titleRef.current, categoryRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out" }
      );
    }

    // Synopsis scroll reveal
    if (synopsisRef.current) {
      gsap.fromTo(
        synopsisRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: synopsisRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Credits scroll reveal
    if (creditsRef.current) {
      gsap.fromTo(
        creditsRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: creditsRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Related projects reveal
    if (relatedRef.current) {
      gsap.fromTo(
        relatedRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [project.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${project.title} | Poppy Productions`,
          text: project.subtitle || project.description,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled share
      }
    }
    // Fallback copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* 1. Fullscreen Cinematic Hero Banner matching Screenshot 2 */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black text-white select-none"
      >
        {/* Background Image / Video Still */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.heroImage || project.posterSrc}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-[0.75] scale-105 transition-transform duration-1000"
          />
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        </div>

        {/* Centered Title & Category matching Screenshot 2 */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-2 sm:space-y-3 pt-16">
          <h1
            ref={titleRef}
            className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-white drop-shadow-2xl"
          >
            {project.title}
          </h1>
          <p
            ref={categoryRef}
            className="text-[11px] sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.35em] font-light uppercase text-white/90 mt-2 sm:mt-3"
          >
            {project.category}
          </p>
        </div>

        {/* Floating Red Share Button matching Screenshot 2 */}
        <button
          onClick={handleShare}
          aria-label="Share Project"
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#FF5E3A] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#E04824] focus:outline-none"
        >
          {copied ? (
            <Check className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>

        {copied && (
          <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-8 z-40 bg-black/90 text-white text-xs px-4 py-2 rounded-full border border-white/20 shadow-xl">
            Link copied to clipboard!
          </div>
        )}
      </section>

      {/* 2. Synopsis & Trailer Preview Section matching Screenshot 3 */}
      <section className="relative bg-white text-neutral-900 py-20 md:py-28">
        {/* Subtle Top Red Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5E3A]" />

        <div
          ref={synopsisRef}
          className="mx-auto max-w-7xl px-6 md:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Synopsis Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.14em] text-neutral-800">
                SYNOPSIS
              </h2>
              <div className="text-base sm:text-lg font-light leading-relaxed text-neutral-700 space-y-4">
                <p>{project.synopsis || project.description}</p>
                {project.subtitle && (
                  <p className="text-sm font-normal text-neutral-500 italic pt-2">
                    {project.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Video Trailer Box with Red Play Button matching Screenshot 3 */}
            <div className="lg:col-span-6">
              <div
                onClick={() => setIsPlayingTrailer(true)}
                className="group relative aspect-[16/10] w-full rounded-md overflow-hidden bg-black shadow-2xl cursor-pointer"
              >
                {/* Poster Still */}
                <img
                  src={project.posterSrc}
                  alt={project.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />

                {/* Big Red Circular Play Button matching Screenshot 3 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#FF5E3A] text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E04824]">
                    <Play className="h-7 w-7 sm:h-9 sm:w-9 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Optional Production Stills Strip */}
      {project.stills && project.stills.length > 0 && (
        <section className="bg-white pb-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 py-2">
              {project.stills.map((still, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 w-[280px] sm:w-[380px] aspect-[16/10] rounded overflow-hidden shadow-lg bg-black"
                >
                  <img
                    src={still}
                    alt={`${project.title} still ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Credits Section matching Screenshot 4 */}
      <section className="relative bg-white text-neutral-900 pb-24 md:pb-32">
        <div
          ref={creditsRef}
          className="mx-auto max-w-5xl px-6 md:px-12 space-y-8"
        >
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.14em] text-neutral-800">
            CREDITS
          </h2>

          <div className="space-y-4 text-sm sm:text-base font-light text-neutral-700 leading-relaxed border-t border-neutral-200 pt-6">
            {project.cast && (
              <p>
                <strong className="font-semibold text-neutral-900 mr-2">
                  Cast
                </strong>
                {project.cast}
              </p>
            )}

            {project.writer && (
              <p>
                <strong className="font-semibold text-neutral-900 mr-2">
                  Writer
                </strong>
                {project.writer}
              </p>
            )}

            <p>
              <strong className="font-semibold text-neutral-900 mr-2">
                Director & Cinematography
              </strong>
              {project.director || "Muhammad Yasir"}
              {project.cinematographer && ` • DOP: ${project.cinematographer}`}
            </p>

            {project.producers && (
              <p>
                <strong className="font-semibold text-neutral-900 mr-2">
                  Producers
                </strong>
                {project.producers}
              </p>
            )}

            <p>
              <strong className="font-semibold text-neutral-900 mr-2">
                Format & Release
              </strong>
              {project.year} • {project.duration}
              {project.client && ` • Client: ${project.client}`}
            </p>
          </div>
        </div>
      </section>

      {/* 5. "About Poppy Productions" Banner */}
      <section className="relative bg-[#FF5E3A] text-white py-16 md:py-20 text-center">
        <div className="mx-auto max-w-4xl px-6 md:px-12 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-[0.2em] text-white">
            About us
          </h2>
          <p className="text-base sm:text-lg font-light leading-relaxed text-white/95 max-w-2xl mx-auto">
            Poppy Productions is an award-winning Australian film, television and media
            production company working with the best creative talent to bring
            incredible stories to life.
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-block rounded-full border border-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#FF5E3A] transition-all hover:scale-105"
            >
              Find out more
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Related Productions Section matching Screenshot 5 */}
      <section
        ref={relatedRef}
        className="relative bg-[#1a1a1a] py-20 md:py-28 text-white select-none"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-[0.25em] text-white">
              RELATED PRODUCTIONS
            </h2>
            <div className="mx-auto h-[1px] w-24 bg-white/40 my-6" />
          </div>

          {/* 2-Column Related Projects Grid matching Screenshot 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/productions/${rel.id}`}
                className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded bg-black shadow-2xl block"
              >
                {/* Background Poster */}
                <img
                  src={rel.posterSrc}
                  alt={rel.title}
                  className="absolute inset-0 h-full w-full object-cover filter brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors" />

                {/* Centered Title and Category matching Screenshot 5 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2 z-10">
                  <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-wider text-white group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                    {rel.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-light uppercase tracking-[0.25em] text-white/90">
                    {rel.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Productions Pill Button */}
          <div className="text-center pt-6">
            <Link
              href="/#productions"
              className="inline-block rounded-full border border-white/60 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#FF5E3A] transition-all hover:scale-105"
            >
              VIEW ALL PRODUCTIONS
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Bottom Navigation Bar */}
      <div className="bg-[#111111] border-t border-white/10 py-6 px-6 md:px-12">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-xs sm:text-sm font-light tracking-wider uppercase text-white/80">
          <Link
            href={`/productions/${prevProject.id}`}
            className="flex items-center space-x-2 hover:text-[#FF5E3A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Project: {prevProject.title}</span>
          </Link>

          <Link
            href="/#productions"
            aria-label="All Productions"
            className="hover:text-[#FF5E3A] transition-colors hidden sm:block"
          >
            <LayoutGrid className="w-5 h-5" />
          </Link>

          <Link
            href={`/productions/${nextProject.id}`}
            className="flex items-center space-x-2 hover:text-[#FF5E3A] transition-colors"
          >
            <span>Next Project: {nextProject.title}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Video Trailer Lightbox Modal */}
      {isPlayingTrailer && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8">
          <button
            onClick={() => setIsPlayingTrailer(false)}
            aria-label="Close Trailer"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:rotate-90 z-50 focus:outline-none"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-white/20">
            <video
              src={project.videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
