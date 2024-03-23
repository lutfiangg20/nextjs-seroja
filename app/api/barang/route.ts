import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/database/mongodb.js";

export const GET = async () => {
  const db = await connectToDatabase();
  const data = await db.collection("barang").find({}).toArray();
  return NextResponse.json({ data });
};

export const POST = async (request: Request) => {
  const db = await connectToDatabase();
  const req = await request.json();
  const doc = {
    nama_barang: req.nama_barang,
    kategori: req.kategori,
    stok: parseInt(req.stok),
    harga: req.harga,
  };
  console.log(doc);
  // Insert the defined document into the "haiku" collection
  const result = await db.collection("barang").insertOne(doc);
  return NextResponse.json({ data: result });
};

