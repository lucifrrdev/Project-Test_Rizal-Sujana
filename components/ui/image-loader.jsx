import Image from "next/image";
import { useEffect, useState } from "react";
import { getBase64ImageUrlCached } from "@/lib/generateBlur";

export default function ImageLoader({ src, alt }) {
  const [blurData, setBlurData] = useState("");

  useEffect(() => {
    const loadBlur = async () => {
      const absoluteSrc = src.startsWith("http")
        ? src
        : `${window.location.origin}${src}`;

      const base64 = await getBase64ImageUrlCached(absoluteSrc);
      setBlurData(base64);
    };
    loadBlur();
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      loading="lazy"
      placeholder={blurData ? "blur" : "empty"}
      blurDataURL={blurData}
      className="object-cover"
    />
  );
}
