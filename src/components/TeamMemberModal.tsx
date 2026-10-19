"use client";

import { useEffect, useRef, useState } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringModal, setIsHoveringModal] = useState(false);

  // Lock body scroll and trigger GSAP entrance animation
  useEffect(() => {
    if (!member) return;

    document.body.style.overflow = "hidden";

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          scale: 0.92,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        }
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

  // Floating cursor following mouse across screen with GSAP quickTo (120fps smooth tracking)
  useEffect(() => {
    if (!member || !cursorRef.current) return;

    // Set initial position
    gsap.set(cursorRef.current, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

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

  const handleModalClick = (e: React.MouseEvent) => {
    // If user is selecting text, do not dismiss
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    onClose();
  };

  return (
    <div
      ref={modalRef}
      onClick={onClose}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md transition-opacity duration-300 cursor-pointer select-none"
    >
      {/* Dynamic Floating Cross Cursor that follows mouse everywhere matching Screenshot 4 */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[170] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-neutral-900 bg-white text-black shadow-2xl will-change-transform"
      >
        <X className="w-5 h-5 stroke-[2]" />
      </div>

      {/* Main 2-Column Modal Dialog matching Screenshot 4 */}
      <div
        ref={contentRef}
        onClick={handleModalClick}
        onMouseEnter={() => setIsHoveringModal(true)}
        onMouseLeave={() => setIsHoveringModal(false)}
        className="relative w-full max-w-5xl max-h-[90vh] bg-white text-neutral-900 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 cursor-pointer select-text"
      >
        {/* Left Column (50%): Bio Details matching Screenshot 4 */}
        <div className="md:col-span-6 bg-[#f9f9f9] p-8 sm:p-12 md:p-14 overflow-y-auto max-h-[50vh] md:max-h-[85vh] flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-neutral-900">
              {member.name}
            </h2>
            <p className="text-sm sm:text-base font-normal text-neutral-600 mt-1">
              {member.role}
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base font-light text-neutral-700 leading-relaxed border-t border-neutral-200 pt-6">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {member.highlights && member.highlights.length > 0 && (
            <div className="pt-4 border-t border-neutral-200">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#cc0000] block mb-2">
                Key Highlights
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-neutral-600">
                {member.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (50%): Full-Bleed B&W Portrait matching Screenshot 4 */}
        <div className="md:col-span-6 relative w-full h-[320px] md:h-full min-h-[380px] bg-black overflow-hidden">
          <img
            src={member.imageSrc}
            alt={member.name}
            className="w-full h-full object-cover object-top filter grayscale contrast-110"
          />
        </div>

        {/* Boundary Circular Close Button matching Screenshot 4 */}
        <button
          onClick={onClose}
          aria-label="Close Team Member Modal"
          className="absolute top-4 right-4 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-neutral-900 bg-white text-black shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#cc0000] hover:text-white hover:border-[#cc0000] focus:outline-none cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </div>
  );
}
