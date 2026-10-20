"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

export default function ShowreelModal({
  isOpen,
  onClose,
  videoSrc = "/assets/videos/front_video_showreel.mp4",
  title = "POPPY PRODUCTIONS — OFFICIAL SHOWREEL",
}: ShowreelModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      document.body.style.overflow = "unset";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl transition-all duration-500 animate-fadeIn">
      {/* Top bar with title and close button */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 md:px-12 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <span className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#FF5E3A] animate-ping" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70 font-semibold truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="group flex items-center space-x-1.5 sm:space-x-2 rounded-full border border-white/20 bg-black/50 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-widest text-white transition-all hover:border-[#FF5E3A] hover:bg-[#FF5E3A] hover:text-white"
        >
          <span>CLOSE</span>
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* Main Video Container */}
      <div className="relative w-full max-w-7xl max-h-[85vh] aspect-video px-2 sm:px-4 md:px-8 flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
        />

        {/* Floating Custom Controls */}
        <div className="absolute bottom-4 left-3 right-3 sm:bottom-6 sm:left-8 sm:right-8 z-10 flex flex-col gap-2 rounded-xl bg-black/70 backdrop-blur-md p-2.5 sm:p-3 border border-white/10 opacity-95 transition-opacity hover:opacity-100">
          {/* Progress bar */}
          <div
            onClick={handleSeek}
            className="group relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 overflow-hidden"
          >
            <div
              className="h-full bg-[#FF5E3A] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#FF5E3A] transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleMute}
                className="text-white hover:text-[#FF5E3A] transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-xs text-white/60 tracking-wider">
                {videoRef.current ? Math.floor(videoRef.current.currentTime) : 0}s /{" "}
                {videoRef.current && !isNaN(videoRef.current.duration)
                  ? Math.floor(videoRef.current.duration)
                  : 0}
                s
              </span>
            </div>

            <button
              onClick={handleFullscreen}
              className="text-white/70 hover:text-poppy transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
