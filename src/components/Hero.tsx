"use client";

import { Play } from "lucide-react";

interface HeroProps {
  onOpenShowreel: () => void;
}

export default function Hero({ onOpenShowreel }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black select-none">
      {/* Background Fullscreen Video (Optimized 1080p Faststart Loop - Zero Lag) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/posters/hero_poster.jpg"
          className="h-full w-full object-cover scale-100 filter brightness-90"
        >
          <source src="/assets/videos/front_video_bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Left-Aligned Watch Showreel Element (Matching Screenshot 1) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-start space-y-4">
          {/* Circular Play Button */}
          <button
            onClick={onOpenShowreel}
            className="group flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/90 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white/20"
            aria-label="Play Showreel"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white ml-0.5 transition-transform group-hover:scale-110" />
          </button>

          {/* WATCH SHOWREEL text in 2 lines */}
          <button
            onClick={onOpenShowreel}
            className="text-left font-serif tracking-[0.25em] text-white hover:opacity-80 transition-opacity"
          >
            <div className="text-xs sm:text-sm font-light uppercase leading-tight">
              WATCH
            </div>
            <div className="text-xs sm:text-sm font-light uppercase leading-tight mt-1">
              SHOWREEL
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
