"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function LatestNews() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Awards", "Festivals", "Press", "Releases"];

  const newsItems = [
    {
      id: "news-1",
      title: "PRIMA FACIE to make world premiere at the Toronto International Film Festival",
      category: "Festivals",
      date: "September 2025",
      imgSrc: "/assets/reference/Cynthia-Erivo-Prima-Facie-1024x682.webp",
      excerpt:
        "The highly anticipated feature adaptation directed and produced in association with the team will have its prestigious world premiere at TIFF.",
    },
    {
      id: "news-2",
      title: "Wolfram praised as 'A Modern Cinematic Classic'",
      category: "Press",
      date: "August 2025",
      imgSrc: "/assets/reference/Wolfram-dark-1024x682.jpg",
      excerpt:
        "Critics worldwide have applauded the breathtaking visual restraint, atmospheric cinematography, and visceral soundscape.",
    },
    {
      id: "news-3",
      title: "Film Critics Circle of Australia nominates latest production across 6 categories",
      category: "Awards",
      date: "July 2025",
      imgSrc: "/assets/reference/Kangaroo-poster-819x1024.jpg",
      excerpt:
        "Recognized for Best Direction, Best Cinematography, and Best Sound Editing at the national film critics circle honors.",
    },
  ];

  const filtered =
    activeCategory === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  return (
    <section id="news" className="relative bg-white py-24 md:py-36 text-black">
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
        {/* Header: Latest news + View all news */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-black/10 pb-6 gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.2em] text-neutral-900">
            Latest news
          </h2>
          <Link
            href="#news"
            className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-[#FF5E3A] font-semibold transition-colors"
          >
            View all news
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#FF5E3A] text-white"
                  : "border border-neutral-300 text-neutral-700 hover:border-[#FF5E3A] hover:text-[#FF5E3A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3 Editorial News Cards matching Bunya Row 14 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col space-y-4 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-neutral-100">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-neutral-500">
                <span className="text-[#FF5E3A] font-semibold">{item.category}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-900 leading-snug group-hover:text-[#FF5E3A] transition-colors">
                {item.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {item.excerpt}
              </p>

              {/* Link */}
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1 text-xs uppercase tracking-widest font-semibold text-neutral-900 group-hover:text-[#FF5E3A] transition-colors">
                  <span>Read more</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
