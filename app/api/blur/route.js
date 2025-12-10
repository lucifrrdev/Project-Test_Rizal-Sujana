import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const img = searchParams.get("img");

  if (!img) return NextResponse.json({ error: "No image" }, { status: 400 });

  try {
    const response = await fetch(img);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const mime = img.endsWith(".png")
      ? "image/png"
      : img.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";

    return NextResponse.json({ base64: `data:${mime};base64,${base64}` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
