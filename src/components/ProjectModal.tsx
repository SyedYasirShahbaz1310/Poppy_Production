"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Calendar, Clock, Film, Award } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

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

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 md:p-10">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#101010] p-6 md:p-8 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <span className="rounded-full bg-poppy/15 border border-poppy/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-poppy">
              {project.category}
            </span>
            <span className="text-xs uppercase tracking-widest text-white/50">
              {project.year} • {project.duration}
            </span>
          </div>

          <button
            onClick={onClose}
            className="group flex items-center space-x-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-white hover:border-poppy hover:bg-poppy hover:text-white transition-all"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
          <video
            ref={videoRef}
            src={project.videoSrc}
            poster={project.posterSrc}
            playsInline
            controls
            className="h-full w-full object-contain"
          />
        </div>

        {/* Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4 text-xs">
            <div className="text-xs uppercase tracking-widest text-poppy font-bold border-b border-white/10 pb-2">
              Production Details
            </div>
            {project.client && (
              <div>
                <span className="text-white/40 uppercase block">Client / Partner</span>
                <span className="text-white font-medium">{project.client}</span>
              </div>
            )}
            {project.director && (
              <div>
                <span className="text-white/40 uppercase block">Director</span>
                <span className="text-white font-medium">{project.director}</span>
              </div>
            )}
            {project.cinematographer && (
              <div>
                <span className="text-white/40 uppercase block">Cinematography</span>
                <span className="text-white font-medium">{project.cinematographer}</span>
              </div>
            )}
            <div>
              <span className="text-white/40 uppercase block">Resolution</span>
              <span className="text-white font-medium">4K DCI / Master HDR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
