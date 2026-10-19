import { NextResponse } from "next/server";
import { TEAM_DATA } from "@/lib/data";

export async function GET() {
  return NextResponse.json(TEAM_DATA);
}
