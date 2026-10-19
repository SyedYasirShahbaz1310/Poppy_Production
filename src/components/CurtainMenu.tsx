"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Facebook, Youtube, Instagram } from "lucide-react";
import { gsap } from "gsap";
import { BRAND_CONFIG } from "@/lib/data";

interface CurtainMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
  onOpenShowreel?: () => void;
}

export default function CurtainMenu({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenShowreel,
}: CurtainMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      containerRef.current.style.visibility = "visible";

      const ctx = gsap.context(() => {
        // Curtain drop
        gsap.to(containerRef.current, {
          yPercent: 0,
          duration: 0.65,
          ease: "power4.inOut",
        });

        // Subtle cinematic zoom-in on background image
        if (bgImageRef.current) {
          gsap.fromTo(
            bgImageRef.current,
            { scale: 1.08 },
            { scale: 1, duration: 1.4, ease: "power2.out" }
          );
        }

        // Staggered reveal for editorial nav links
        if (linksRef.current) {
          const links = linksRef.current.querySelectorAll(".nav-link-item");
          gsap.fromTo(
            links,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              delay: 0.25,
              ease: "power3.out",
            }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    } else {
      document.body.style.overflow = "unset";
      gsap.to(containerRef.current, {
        yPercent: -105,
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.visibility = "hidden";
          }
        },
      });
    }
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Productions", href: "/productions" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[120] flex flex-col justify-between overflow-hidden will-change-transform ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        transform: "translateY(-110%)",
        visibility: isOpen ? "visible" : "hidden",
      }}
    >
      {/* Full-size Professional Cinematic Background Picture matching Screenshot 3 */}
      <div ref={bgImageRef} className="absolute inset-0 z-0 select-none">
        <Image
          src="/assets/images/menu_bg_cinematic.jpg"
          alt="Poppy Productions Cinematic Scene"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-center"
        />
        {/* Subtle Dark Gradient Overlay for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
      </div>

      {/* Top Header inside Menu - Identical to Main Header matching Screenshot 3 */}
      <div className="relative z-10 flex w-full items-center justify-between px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5">
        {/* Left: Brand Logo */}
        <Link href="/" onClick={onClose} className="group flex items-center">
          <div className="flex flex-col text-white tracking-[0.25em] select-none">
            <span className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-[0.28em] leading-none">
              POPPY
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.34em] font-light opacity-90 leading-none mt-1 sm:mt-1.5">
              PRODUCTIONS
            </span>
          </div>
        </Link>

        {/* Right: Search & MENU ✕ (matching Screenshot 3) */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          <button
            onClick={() => {
              onClose();
              if (onOpenSearch) onOpenSearch();
            }}
            aria-label="Search"
            className="text-white hover:opacity-80 transition-opacity focus:outline-none"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* MENU ✕ Button */}
          <button
            onClick={onClose}
            aria-label="Close Navigation Menu"
            className="group flex items-center space-x-2 text-white hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
          >
            <span className="text-xs font-bold tracking-[0.22em] uppercase">
              MENU
            </span>
            <X className="w-5 h-5 stroke-[2] transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </div>

      {/* Center Navigation Links - Minimalist Editorial Overlay */}
      <div className="relative z-10 my-auto px-6 sm:px-12 md:px-16 py-6 max-w-4xl">
        <ul ref={linksRef} className="space-y-3 sm:space-y-4 md:space-y-5">
          {navItems.map((item) => (
            <li key={item.label} className="nav-link-item overflow-hidden">
              <Link
                href={item.href}
                onClick={onClose}
                className="group inline-block text-4xl sm:text-6xl md:text-7xl font-extralight uppercase tracking-[0.12em] text-white/90 hover:text-white hover:translate-x-3 transition-all duration-300"
              >
                <span className="transition-colors group-hover:text-[#F2613F]">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}

          {onOpenShowreel && (
            <li className="nav-link-item pt-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenShowreel();
                }}
                className="group flex items-center space-x-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#F2613F] hover:text-white transition-colors"
              >
                <span className="w-6 h-[1.5px] bg-[#F2613F] group-hover:w-10 transition-all duration-300" />
                <span>WATCH SHOWREEL</span>
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Bottom Footer inside Menu - matching Screenshot 3 */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 md:px-10 py-5 sm:py-6 text-xs text-white/80">
        <div className="tracking-widest uppercase font-mono text-[11px] text-white/70">
          {BRAND_CONFIG.contact.email}
        </div>

        {/* Bottom-right Social Icons matching Screenshot 3 */}
        <div className="flex items-center space-x-6">
          <a
            href={BRAND_CONFIG.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white hover:opacity-75 transition-opacity"
          >
            <Facebook className="w-4 h-4 fill-current" />
          </a>
          <a
            href={BRAND_CONFIG.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-white hover:opacity-75 transition-opacity"
          >
            <Youtube className="w-4 h-4 fill-current" />
          </a>
          <a
            href={BRAND_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white hover:opacity-75 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
