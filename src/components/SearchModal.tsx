"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { X, Film, Users, Newspaper, ArrowRight, Loader2 } from "lucide-react";
import { Project, TeamMember, NewsItem } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProject,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    projects: Project[];
    team: TeamMember[];
    news: NewsItem[];
    total: number;
  }>({
    projects: [],
    team: [],
    news: [],
    total: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and lock body scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults({ projects: [], team: [], news: [], total: 0 });
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Fetch search results debounced
  useEffect(() => {
    if (!query.trim()) {
      setResults({ projects: [], team: [], news: [], total: 0 });
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[130] bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Top-Down Sliding Search Bar matching Bunya Screenshot 1 */}
      <div
        className={`fixed top-0 left-0 right-0 z-[140] bg-[#cc0000] text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 pt-8 sm:pt-10 pb-6 sm:pb-8">
          {/* Main Search Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="relative w-full"
          >
            <div className="relative flex items-center border-b-2 border-white pb-3 sm:pb-4">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH"
                aria-label="Search Poppy Productions"
                className="w-full bg-transparent text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-wider text-white placeholder-white/50 focus:outline-none pr-12"
              />

              {/* Close Button matching Screenshot 1 */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Search"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white hover:opacity-75 transition-transform duration-300 hover:rotate-90 focus:outline-none"
              >
                <X className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2]" />
              </button>
            </div>

            {/* Helper Text below underline matching Screenshot 1 */}
            <div className="flex items-center justify-between pt-3">
              <span className="text-[11px] sm:text-sm text-white/90 font-light tracking-wide">
                Hit enter to search or ESC to close
              </span>
              {loading && (
                <div className="flex items-center space-x-2 text-xs text-white/80">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </div>
              )}
            </div>
          </form>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mr-1">
                Suggested:
              </span>
              {["Velo Velocity", "Commercial", "Feature Film", "Muhammad Yasir", "Sweet Tooth"].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white hover:text-[#cc0000] transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          )}

          {/* Search Results Dropdown List */}
          {query && (
            <div className="mt-6 max-h-[55vh] overflow-y-auto space-y-4 rounded-lg bg-black/40 backdrop-blur-md p-4 sm:p-6 border border-white/20">
              {results.total === 0 && !loading && (
                <div className="py-8 text-center text-sm text-white/70">
                  No matching productions or stories found for &ldquo;{query}&rdquo;.
                </div>
              )}

              {/* Productions */}
              {results.projects.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
                    <Film className="w-4 h-4 text-white" />
                    <span>Productions ({results.projects.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.projects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          onClose();
                          if (onSelectProject) onSelectProject(proj);
                        }}
                        className="group flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-2.5 hover:border-white hover:bg-white/15 cursor-pointer transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 rounded overflow-hidden bg-black relative border border-white/20 shrink-0">
                            <img
                              src={proj.posterSrc}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:underline">
                              {proj.title}
                            </div>
                            <span className="text-[10px] text-white/70 uppercase tracking-wider">
                              {proj.category} • {proj.year}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {results.team.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
                    <Users className="w-4 h-4 text-white" />
                    <span>Team & Directors ({results.team.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.team.map((member) => (
                      <Link
                        key={member.id}
                        href="/about#team"
                        onClick={onClose}
                        className="group flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-2.5 hover:border-white hover:bg-white/15 transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.thumbSrc}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/30"
                          />
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:underline">
                              {member.name}
                            </div>
                            <span className="text-[10px] text-white/70">
                              {member.role}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {results.news.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
                    <Newspaper className="w-4 h-4 text-white" />
                    <span>News & Press ({results.news.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.news.map((item) => (
                      <div
                        key={item.id}
                        onClick={onClose}
                        className="group block rounded-md border border-white/10 bg-white/5 p-2.5 hover:border-white hover:bg-white/15 transition-all cursor-pointer"
                      >
                        <div className="text-xs text-white/80 font-medium">
                          {item.category} • {item.publication} ({item.date})
                        </div>
                        <div className="text-sm font-medium text-white group-hover:underline mt-0.5 line-clamp-1">
                          {item.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
