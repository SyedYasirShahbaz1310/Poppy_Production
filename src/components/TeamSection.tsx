"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TeamMember } from "@/types";
import { TEAM_DATA } from "@/lib/data";
import TeamMemberModal from "@/components/TeamMemberModal";

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section
      id="team"
      className="relative bg-white py-20 md:py-32 text-neutral-900 select-none border-b border-neutral-200"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-16">
        {/* Section Heading matching Screenshot 2 */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.25em] text-neutral-900">
            TEAM
          </h2>
          {/* Thin horizontal line divider matching Screenshot 2 */}
          <div className="mx-auto h-[1px] w-24 bg-neutral-900 my-6" />
        </div>

        {/* 3-Column Team Members Grid matching Screenshots 2 & 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {TEAM_DATA.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              {/* Black & White Portrait Photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 shadow-md">
                <img
                  src={member.thumbSrc}
                  alt={member.name}
                  className="h-full w-full object-cover object-top filter grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Name & Right Arrow matching Screenshots 2 & 3 */}
              <div className="space-y-2 pt-1">
                <h3 className="text-lg sm:text-xl font-medium tracking-wide text-neutral-900 group-hover:text-[#cc0000] transition-colors">
                  {member.name}
                </h3>
                <div className="flex items-center text-neutral-800 group-hover:text-[#cc0000] transition-colors">
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Member Detail Modal with Floating Close Cursor matching Screenshot 4 */}
      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}
