import { NextRequest, NextResponse } from "next/server";
import { ContactInquiry } from "@/types";

// In-memory submissions store (can be persisted to file or database)
const inquiries: ContactInquiry[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, budgetRange, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Full Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long" },
        { status: 400 }
      );
    }

    const inquiry: ContactInquiry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      projectType: projectType || "Commercial / Video Production",
      budgetRange: budgetRange || "Not specified",
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    inquiries.push(inquiry);
    console.log("[POPPY INQUIRY RECEIVED]:", inquiry);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out to Poppy Productions. Our producers will review your creative brief and reply within 24 hours.",
        data: {
          id: `INQ-${Date.now()}`,
          name: inquiry.name,
          receivedAt: inquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error processing inquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    count: inquiries.length,
    recent: inquiries.slice(-5),
  });
}
