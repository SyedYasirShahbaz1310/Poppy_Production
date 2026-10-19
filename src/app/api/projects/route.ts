import { NextRequest, NextResponse } from "next/server";
import { PROJECTS_DATA } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (category && category !== "ALL") {
    const filtered = PROJECTS_DATA.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(PROJECTS_DATA);
}
