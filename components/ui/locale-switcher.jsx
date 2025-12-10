"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = getCurrentLocale(pathname);

  function toggleLocale() {
    const newLocale = currentLocale === "id" ? "en" : "id";

    // simpan ke cookie
    document.cookie = `locale=${newLocale}; Path=/; Max-Age=31536000`;

    // replace locale di URL
    const segments = pathname.split("/");
    segments[1] = newLocale;

    const newPath = segments.join("/");

    const qs = searchParams.toString();
    router.replace(qs ? `${newPath}?${qs}` : newPath);
  }

  return (
    <button
      onClick={toggleLocale}
      aria-label="toggle lang"
      className="p-1 rounded bg-transparent hover:bg-primary/10 transition cursor-pointer"
    >
      <span className="text-lg leading-none select-none">
        {currentLocale === "id" ? "🇺🇸":"🇮🇩" }
      </span>
    </button>
  );
}

function getCurrentLocale(pathname) {
  const segment = pathname.split("/")[1];
  return ["en", "id"].includes(segment) ? segment : "en";
}
