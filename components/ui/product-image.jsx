import { cn } from "@/lib/utils";
import Image from "next/image";

/* ==============================================
   🖼️ Gambar Produk (dengan fallback & blur)
============================================== */
export default function ProductImage({ src, alt, className }) {
  if (src == null) {
    return <div className="w-full h-full bg-foreground/10 animate-pulse"></div>;
  }
  return (
    <Image
      src={src}
      alt={alt || "Product Image"}
      fill
      quality={75}
      draggable={false}
      className={cn(
        "object-cover transition-transform duration-300 group-hover:scale-105",
        className
      )}
      sizes="(max-width: 768px) 160px, 200px"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0dhYIADQA5l6BlAb0v0AAAAASUVORK5CYII="
      onError={() => {
        // setImgSrc("https://placehold.co/300x300?text=Image+Not+Found")
      }}
    />
  );
}
