"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [isClosing, setIsClosing] = useState(false);

  // Smooth exit animation
  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.985,
        duration: 0.28,
        ease: "power2.inOut",
        onComplete: () => {
          setIsClosing(false);
          onClose();
        },
      });
    } else {
      onClose();
    }
  }, [isClosing, onClose]);

  // Lock body scroll and trigger smooth entrance animation
  useEffect(() => {
    if (!member) return;

    document.body.style.overflow = "hidden";

    // Set initial states to prevent any flash or stutter
    if (containerRef.current) gsap.set(containerRef.current, { opacity: 0 });
    if (leftColRef.current) gsap.set(leftColRef.current, { x: -30, opacity: 0 });
    if (rightColRef.current) gsap.set(rightColRef.current, { scale: 1.05, opacity: 0 });

    const tl = gsap.timeline();

    // 1. Container fade in
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });

    // 2. Left column slide in
    tl.to(
      leftColRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // 3. Right column image subtle scale & reveal
    tl.to(
      rightColRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: "power2.out",
      },
      "-=0.45"
    );

    // 4. Staggered typography entrance inside left column
    if (leftColRef.current) {
      const items = leftColRef.current.querySelectorAll(".modal-stagger-item");
      if (items.length > 0) {
        tl.fromTo(
          items,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" },
          "-=0.4"
        );
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [member, handleClose]);

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
          <div className="modal-stagger-item flex items-center space-x-3">
            <span className="w-8 h-[2px] bg-[#F2613F]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#F2613F]">
              {member.division || "POPPY PRODUCTIONS"}
            </span>
          </div>

          {/* Member Name */}
          <h2 className="modal-stagger-item text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.15em] text-neutral-900 leading-tight">
            {member.name}
          </h2>

          {/* Role */}
          <p className="modal-stagger-item text-xs sm:text-sm font-medium uppercase tracking-[0.22em] text-neutral-600">
            {member.role}
          </p>

          {/* Divider */}
          <div className="modal-stagger-item w-16 h-[1.5px] bg-neutral-900/20" />

          {/* Bio Paragraphs - Perfectly Aligned and Spaced */}
          <div className="modal-stagger-item space-y-4 text-sm sm:text-base font-light text-neutral-700 leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Highlights */}
          {member.highlights && member.highlights.length > 0 && (
            <div className="modal-stagger-item pt-6 border-t border-neutral-300 space-y-3">
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

      {/* Right Column (50%): Full-Bleed B&W Portrait Photograph - Perfectly Adjusted */}
      <div
        ref={rightColRef}
        onClick={handleClose}
        className="w-full md:w-1/2 h-1/2 md:h-full relative bg-neutral-950 overflow-hidden cursor-pointer"
      >
        <img
          src={member.imageSrc}
          alt={member.name}
          decoding="async"
          className="w-full h-full object-cover object-[center_20%] filter grayscale contrast-110"
        />
        {/* Subtle dark vignette on edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Top-Right Circular Close Button */}
      <button
        onClick={handleClose}
        aria-label="Close Team Member Modal"
        className="absolute top-6 right-6 z-[180] flex items-center justify-center w-12 h-12 rounded-full border border-neutral-900 bg-white text-black shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#F2613F] hover:text-white hover:border-[#F2613F] focus:outline-none cursor-pointer"
      >
        <X className="w-5 h-5 stroke-[2]" />
      </button>
    </div>
  );
}
