"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenShowreel?: () => void;
}

export default function Header({
  onOpenMenu,
  onOpenSearch,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#cc0000] shadow-md py-2.5 sm:py-3"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-2.5 sm:py-3 md:py-3.5"
      }`}
    >
      <div className="flex w-full items-center justify-between px-6 sm:px-8 md:px-10">
        {/* Left: Brand Logo matching Bunya Screenshot 1 */}
        <Link href="/" className="group flex items-center">
          <div className="flex flex-col text-white tracking-[0.25em] select-none">
            <span className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-[0.28em] leading-none">
              POPPY
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.34em] font-light opacity-90 leading-none mt-1 sm:mt-1.5">
              PRODUCTIONS
            </span>
          </div>
        </Link>

        {/* Right: Search & MENU matching Screenshot 1 (No Shop icon) */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="text-white hover:opacity-80 transition-opacity focus:outline-none"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* MENU Button with rich hover animation matching Screenshot 1 */}
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="group flex items-center space-x-2.5 text-white transition-all duration-300 focus:outline-none cursor-pointer py-1 px-1.5"
          >
            <span className="text-xs font-bold tracking-[0.22em] uppercase transition-all duration-300 group-hover:tracking-[0.3em] group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
              MENU
            </span>
            {/* 2 Horizontal bars with kinetic hover animation matching Screenshot 1 */}
            <div className="flex flex-col justify-center space-y-[5px] w-4 overflow-hidden py-0.5">
              <span className="block h-[1.5px] w-full bg-white origin-left transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-x-110" />
              <span className="block h-[1.5px] w-full bg-white origin-right transition-all duration-300 ease-out group-hover:-translate-x-0.5 group-hover:scale-x-90" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
