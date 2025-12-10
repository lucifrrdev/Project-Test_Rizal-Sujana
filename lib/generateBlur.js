// GLOBAL CACHE (Memory)
const blurCache = {};

export async function getBase64ImageUrlCached(imageUrl) {
  // Check memory cache
  if (blurCache[imageUrl]) return blurCache[imageUrl];

  // Check localStorage
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`blur_${imageUrl}`);
    if (local) {
      blurCache[imageUrl] = local;
      return local;
    }
  }

  try {
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const mime = imageUrl.endsWith(".png")
      ? "image/png"
      : imageUrl.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";

    const dataUri = `data:${mime};base64,${base64}`;

    // Save to memory cache
    blurCache[imageUrl] = dataUri;

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(`blur_${imageUrl}`, dataUri);
    }

    return dataUri;
  } catch (err) {
    console.error("Failed generate blur", err);
    return "";
  }
}
