import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": req.headers.get("user-agent") || "Mozilla/5.0",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "Referer": "https://suitmedia.com",
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Denied ${response.status}` },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Proxy failed", detail: err.message }, { status: 500 });
  }
}
