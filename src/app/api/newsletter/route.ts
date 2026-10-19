import { NextRequest, NextResponse } from "next/server";

const subscribers = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    subscribers.add(cleanEmail);

    return NextResponse.json({
      success: true,
      message: "You have been subscribed to Poppy Productions releases and festival dispatches.",
      email: cleanEmail,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process newsletter subscription" },
      { status: 500 }
    );
  }
}
