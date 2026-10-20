import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Productions | Poppy Productions",
  description:
    "Explore the complete portfolio of award-winning feature films, television drama series, commercials, and digital productions by Poppy Productions.",
};

export default function ProductionsPage() {
  return (
    <div className="relative bg-[#0A0A0A] text-white min-h-screen pt-28 pb-24">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-20 text-center space-y-4">
        <h1 className="text-2xl sm:text-5xl md:text-7xl font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-white">
          PRODUCTIONS
        </h1>
        <div className="mx-auto h-[1px] w-20 sm:w-24 bg-[#FF5E3A] my-4 sm:my-6" />
        <p className="max-w-2xl mx-auto text-xs sm:text-base font-light text-white/70">
          A showcase of auteur storytelling, breathtaking cinematography, and world-class production execution across film, television, and global brand campaigns.
        </p>
      </div>

      {/* 2-Column Productions Grid matching Bunya Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {PROJECTS_DATA.map((project) => (
            <Link
              key={project.id}
              href={`/productions/${project.id}`}
              className="group relative flex flex-col overflow-hidden rounded-md bg-black shadow-2xl block border border-white/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={project.posterSrc}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-85 group-hover:brightness-95"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-5 sm:p-8 flex flex-col justify-end">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/90 mb-1">
                    {project.category} • {project.year}
                  </span>
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
                    {project.title}
                  </h2>
                  <div className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-white font-medium mt-2 sm:mt-3 opacity-90 group-hover:opacity-100 group-hover:underline">
                    <span>Explore project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
