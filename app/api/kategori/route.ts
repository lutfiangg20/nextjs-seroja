import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/database/mongodb.js";

export async function GET() {
  const db = await connectToDatabase();
  const data = await db.collection("kategori").find({}).toArray();
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ name: "John Doe" });
}
