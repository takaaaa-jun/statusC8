import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET start ok" });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "POST start ok" });
}
