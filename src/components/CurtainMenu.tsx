"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { X, Search, Facebook, Youtube, Instagram, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_CONFIG } from "@/lib/data";

interface CurtainMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
  onOpenShowreel?: () => void;
}

const MENU_BLUR_PREVIEW =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAQTGF2YzYyLjI4LjEwMgD/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAWACgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBEsDLAqu+FHNLC0UKmMsMrU7vtTg8HpWDKx+143dTzU7hHsbcNs04MqsAO1VJ7Qh8ls+tWbJsHaSQMUrEls8Fc1JoUHidMrGuc8UVPOpXc4YqB6d6KpENi3blI1ArFjJn1AE8c0UU+hEfiZsKxEpUdBUrL5cBIOQTRRUGrGuNsQB5B55ooopkM/9k=";

export default function CurtainMenu({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenShowreel,
}: CurtainMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Lock body scroll when menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Productions", href: "/productions" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();

    if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 120);
      } else {
        router.push(href);
      }
      return;
    }

    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="curtain-menu"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[120] flex flex-col justify-between overflow-y-auto bg-[#0A0A0A] text-white min-h-[100dvh]"
        >
          {/* Full-size Professional Cinematic Background Picture directly extracted from Poppy video footage */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed inset-0 z-0 select-none overflow-hidden"
            style={{
              backgroundImage: `url("${MENU_BLUR_PREVIEW}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <picture className="w-full h-full block">
              <source
                srcSet="/assets/images/menu_bg_extracted_aerial.webp"
                type="image/webp"
              />
              <img
                src="/assets/images/menu_bg_extracted_aerial.jpg"
                alt="Poppy Productions Cinematic Scene"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="w-full h-full object-cover object-center pointer-events-none brightness-90 contrast-105"
              />
            </picture>
            {/* Elegant cinematic contrast overlay - balanced so the aerial video frame is clearly visible and vibrant while text remains crisp */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75 pointer-events-none" />
          </motion.div>

          {/* Top Header inside Menu */}
          <div className="relative z-10 flex w-full items-center justify-between px-4 sm:px-8 md:px-10 py-3 sm:py-3.5 shrink-0">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="group flex items-center"
            >
              <div className="flex flex-col text-white tracking-[0.22em] sm:tracking-[0.25em] select-none">
                <span className="text-lg sm:text-2xl md:text-[26px] font-bold tracking-[0.24em] sm:tracking-[0.28em] leading-none">
                  POPPY
                </span>
                <span className="text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.34em] font-light opacity-90 leading-none mt-1 sm:mt-1.5">
                  PRODUCTIONS
                </span>
              </div>
            </Link>

            {/* Right: Search & MENU ✕ Button */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              {onOpenSearch && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenSearch();
                  }}
                  aria-label="Search"
                  className="text-white hover:text-[#F2613F] transition-colors focus:outline-none cursor-pointer p-1"
                >
                  <Search className="w-5 h-5 stroke-[1.8]" />
                </button>
              )}

              {/* MENU ✕ Close Button */}
              <button
                onClick={onClose}
                aria-label="Close Navigation Menu"
                className="group flex items-center space-x-2 text-white hover:text-[#F2613F] transition-colors focus:outline-none cursor-pointer py-1 px-1"
              >
                <span className="text-xs font-bold tracking-[0.22em] uppercase">
                  MENU
                </span>
                <X className="w-5 h-5 stroke-[2] transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          </div>

          {/* Center Navigation Links with Staggered Motion */}
          <div className="relative z-10 my-auto px-5 sm:px-12 md:px-16 py-6 sm:py-8 max-w-4xl">
            <ul className="space-y-3 sm:space-y-5 md:space-y-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group inline-block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight uppercase tracking-[0.12em] sm:tracking-[0.14em] text-white hover:translate-x-3 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
                  >
                    <span className="transition-colors group-hover:text-[#F2613F]">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}

              {onOpenShowreel && (
                <motion.li
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + navItems.length * 0.08,
                    duration: 0.5,
                  }}
                  className="pt-2 sm:pt-4"
                >
                  <button
                    onClick={() => {
                      onClose();
                      onOpenShowreel();
                    }}
                    className="group flex items-center space-x-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#F2613F] hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="w-5 sm:w-6 h-[1.5px] bg-[#F2613F] group-hover:w-10 transition-all duration-300" />
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>WATCH SHOWREEL</span>
                  </button>
                </motion.li>
              )}
            </ul>
          </div>

          {/* Bottom Footer inside Menu */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-5 sm:px-8 md:px-10 py-4 sm:py-6 text-xs text-white/80 border-t border-white/10 shrink-0">
            <div className="tracking-widest uppercase font-mono text-[10px] sm:text-[11px] text-white/70">
              {BRAND_CONFIG.contact.email}
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-6">
              <a
                href={BRAND_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white hover:text-[#F2613F] transition-colors"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href={BRAND_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white hover:text-[#F2613F] transition-colors"
              >
                <Youtube className="w-4 h-4 fill-current" />
              </a>
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-[#F2613F] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
