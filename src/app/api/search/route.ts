import { NextRequest, NextResponse } from "next/server";
import { PROJECTS_DATA, TEAM_DATA, NEWS_DATA } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase().trim() || "";

  if (!q) {
    return NextResponse.json({
      projects: [],
      team: [],
      news: [],
    });
  }

  const matchingProjects = PROJECTS_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );

  const matchingTeam = TEAM_DATA.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.bio.toLowerCase().includes(q)
  );

  const matchingNews = NEWS_DATA.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
  );

  return NextResponse.json({
    query: q,
    total: matchingProjects.length + matchingTeam.length + matchingNews.length,
    projects: matchingProjects,
    team: matchingTeam,
    news: matchingNews,
  });
}
