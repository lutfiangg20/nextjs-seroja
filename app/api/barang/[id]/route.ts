import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/database/mongodb.js";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const db = await connectToDatabase();
  const doc = {
    nama_barang: params.id,
  };
  /* console.log(doc); */
  // Insert the defined document into the "haiku" collection
  const result = await db.collection("barang").deleteOne(doc);
  return NextResponse.json({ data: result });
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const db = await connectToDatabase();
  const req = await request.json();
  await db.collection("barang").updateOne(
    { nama_barang: params.id },
    {
      $set: {
        nama_barang: req.nama_barang,
        kategori: req.kategori,
        stok: parseInt(req.stok),
        harga: req.harga,
      },
    }
  );
  console.log(req);
  return NextResponse.json({ data: params });
};
