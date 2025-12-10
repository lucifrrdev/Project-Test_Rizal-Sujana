import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import ProductImage from "./product-image";
import { Link } from "@/i18n/navigation";
import { cn, formatRupiah } from "@/lib/utils";

/* ==============================================
   🖼️ Komponen Kartu Produk
============================================== */
export default function ProductCard({ product, type, isMobile }) {
  const now = Date.now();

  const isFlashActive =
    product.flashsale &&
    Number(product.flashsale.start_at) <= now &&
    Number(product.flashsale.end_at) >= now;

  const discount = isFlashActive ? Number(product.flashsale.discount) : 0;

  // price asli angka
  const originalPriceNumber = Number(
    String(product.price).replace(/[^\d]/g, "")
  );

  // harga formatted
  const originalPrice = formatRupiah(originalPriceNumber);

  // hitung diskon pakai angka, bukan string format Rupiah
  const finalPriceNumber =
    isFlashActive && product.flashsale.type === "percentage"
      ? originalPriceNumber - (originalPriceNumber * discount) / 100
      : originalPriceNumber;

  // tampilan final
  const finalPrice = formatRupiah(finalPriceNumber);

  /* 🔥 Countdown Timer */
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!isFlashActive) return;

    const end = Number(product.flashsale.end_at);

    const updateTimer = () => {
      const diff = end - Date.now();
      if (diff <= 0) {
        setTimeLeft("0d 00:00:00");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, "0");

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}:${minutes}:${seconds}`);
      } else {
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isFlashActive, product.flashsale]);

  /* ==============================================
     🟣 Trending Card
  ============================================== */
  if (type === "trending") {
    return (
      <Link
        href={`/${product.slug}?pid=${product.id}`}
        className={cn(
          "bg-card rounded-md shadow-sm shrink-0 flex flex-col", // <= INI WAJIB
          "transition-all duration-300 ease-out group hover:-translate-y-1 hover:shadow-md ",
          isMobile ? "w-[170px] " : "w-[170px] "
        )}
      >
        {/* 🔹 Gambar Produk */}
        <div className="relative w-full aspect-4/5 rounded-t-md overflow-hidden">
          <ProductImage src={product.image} alt={product.title} />
          {isFlashActive && (
            <div className="absolute bottom-0 left-0 right-0 text-tiny bg-red-600 p-1 px-2 text-white font-medium mt-0.5 flex items-center gap-1">
              <span>{timeLeft}</span>
            </div>
          )}
        </div>

        {/* 🔹 Info Produk */}
        <div className="p-2 flex flex-col flex-1">
          <div className="flex flex-col flex-1">
            <h3 className="text-xs font-semibold leading-tight text-foreground">
              {product.title}
            </h3>
            <p className="text-tiny text-foreground/70">{product.category}</p>
          </div>

          <div className="flex flex-col">
            {/* =====================
              💰 Harga + Diskon
          ====================== */}
            <div className="mt-1">
              {isFlashActive ? (
                <div className="flex flex-col">
                  {/* Badge Diskon + Harga Coret */}
                  <div className="flex flex-row gap-1 items-center">
                    <span className="text-tiny font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
                      -{discount}%
                    </span>

                    <span className="text-tiny line-through opacity-60">
                      {originalPrice}
                    </span>
                  </div>

                  {/* Harga Setelah Diskon */}
                  <span className="text-base text-primary font-bold">
                    {finalPrice}
                  </span>
                </div>
              ) : (
                <span className="text-base text-primary font-semibold">
                  {originalPrice}
                </span>
              )}
            </div>
            {/* =====================
              ⭐ Sold + Rating
          ====================== */}
            <div className="mt-1 flex justify-between items-center text-foreground/70 text-tiny">
              <span>{product.sold} terjual</span>
              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                <Star size={12} fill="#facc15" stroke="none" /> {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  } else if (type === "category") {
    /* ==============================================
     🟣 Category Card
  ============================================== */
    return (
      <Link
        href={`/${product.slug}`}
        className="w-full bg-card relative shadow-sm  rounded-md  transition-all duration-300 ease-out group hover:-translate-y-1 hover:shadow-md  shrink-0"
      >
        <div className="relative w-full aspect-3/4 overflow-clip rounded-md bg-background ease-out group-hover:border-4 border-primary transition-all duration-300 ">
          <ProductImage src={product.image} alt={product.title} />
          {isMobile ? (
            <div
              className="absolute inset-0 transition-all duration-300 ease-out 
            bg-linear-to-t from-black/70 to-transparent 
             p-3 flex flex-col items-start justify-end"
            >
              <h3 className="text-xs font-bold leading-tight text-white">
                {product.title}
              </h3>
              <p className="text-tiny text-white/70">{product.category}</p>
            </div>
          ) : (
            <div
              className="absolute inset-0 transition-all duration-300 ease-out 
            bg-linear-to-t from-black/70 to-transparent 
            opacity-0 group-hover:opacity-100 p-3 flex flex-col items-start justify-end"
            >
              <h3 className="text-xs font-bold leading-tight text-white">
                {product.title}
              </h3>
              <p className="text-tiny text-white/70">{product.category}</p>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return null;
}
