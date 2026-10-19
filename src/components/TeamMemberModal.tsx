"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { TeamMember } from "@/types";

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberModal({
  member,
  onClose,
}: TeamMemberModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and trigger GSAP entrance animation
  useEffect(() => {
    if (!member) return;

    document.body.style.overflow = "hidden";

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }

    if (leftColRef.current) {
      gsap.fromTo(
        leftColRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
      );
    }

    if (rightColRef.current) {
      gsap.fromTo(
        rightColRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.05, ease: "power2.out" }
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [member, onClose]);

  // Floating cursor on the right image side (120fps smooth tracking)
  useEffect(() => {
    if (!member || !cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.12,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.12,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [member]);

  if (!member) return null;

  const paragraphs =
    member.bioParagraphs && member.bioParagraphs.length > 0
      ? member.bioParagraphs
      : [member.bio];

  const handleLeftClick = (e: React.MouseEvent) => {
    // If user is actively highlighting or selecting text, do not close
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    // Clicking on empty areas closes modal
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button") {
      return;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[150] w-screen h-screen flex flex-col md:flex-row bg-[#0A0A0A] select-none will-change-transform"
    >
      {/* Floating magnetic cursor following mouse across screen */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[170] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-neutral-900 bg-white text-black shadow-2xl will-change-transform"
      >
        <X className="w-5 h-5 stroke-[2]" />
      </div>

      {/* Left Column (50%): Editorial Biography Details */}
      <div
        ref={leftColRef}
        onClick={handleLeftClick}
        className="w-full md:w-1/2 h-1/2 md:h-full bg-[#f6f6f6] text-neutral-900 overflow-y-auto px-6 sm:px-12 md:px-16 lg:px-20 py-12 md:py-24 flex flex-col justify-start select-text"
      >
        <div className="max-w-xl my-auto space-y-6">
          {/* Division / Subtitle Tag */}
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[2px] bg-[#F2613F]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#F2613F]">
              {member.division || "POPPY PRODUCTIONS"}
            </span>
          </div>

          {/* Member Name */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.15em] text-neutral-900 leading-tight">
            {member.name}
          </h2>

          {/* Role */}
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.22em] text-neutral-600">
            {member.role}
          </p>

          {/* Divider */}
          <div className="w-16 h-[1.5px] bg-neutral-900/20" />

          {/* Bio Paragraphs - Perfectly Aligned and Spaced */}
          <div className="space-y-4 text-sm sm:text-base font-light text-neutral-700 leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Highlights */}
          {member.highlights && member.highlights.length > 0 && (
            <div className="pt-6 border-t border-neutral-300 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F2613F] block">
                Key Highlights
              </span>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-600 font-light">
                {member.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Column (50%): Full-Bleed B&W Portrait Photograph */}
      <div
        ref={rightColRef}
        onClick={onClose}
        className="w-full md:w-1/2 h-1/2 md:h-full relative bg-neutral-950 overflow-hidden cursor-pointer"
      >
        <img
          src={member.imageSrc}
          alt={member.name}
          className="w-full h-full object-cover object-top filter grayscale contrast-110"
        />
        {/* Subtle dark vignette on edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Center Seam Circular Close Button matching Screenshot 4 */}
      <button
        onClick={onClose}
        aria-label="Close Team Member Modal"
        className="absolute top-6 right-6 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[160] flex items-center justify-center w-12 h-12 rounded-full border border-neutral-900 bg-white text-black shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#F2613F] hover:text-white hover:border-[#F2613F] focus:outline-none cursor-pointer"
      >
        <X className="w-5 h-5 stroke-[2]" />
      </button>
    </div>
  );
}
