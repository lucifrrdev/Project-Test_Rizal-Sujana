import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 10;
  const sort = searchParams.get("sort") || "-published_at";

  const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",         // trick some CDN rules
        Referer: "https://suitmedia.com",     // bypass hotlink protection
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch ideas. Upstream rejected." },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Modify image URLs to use proxy if needed
    const mapImageProxy = (imgArray) =>
      Array.isArray(imgArray)
        ? imgArray.map((img) => ({
            ...img,
            url: `/api/proxy/image?url=${encodeURIComponent(img.url)}`,
          }))
        : imgArray;

    const mapped = {
      ...data,
      data: data?.data?.map((idea) => ({
        ...idea,
        small_image: mapImageProxy(idea.small_image),
        medium_image: mapImageProxy(idea.medium_image),
      })),
    };

    return NextResponse.json(mapped);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
