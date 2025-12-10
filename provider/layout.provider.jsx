"use client";

import DesktopLayout from "@/components/layout/DesktopLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutProviders({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // halaman yang tidak memakai layout
  const disableLayout =
    pathname.endsWith("/login") ||
    pathname.endsWith("/signup") ||
    pathname.endsWith("/forgot-password");

  if (!mounted) return null;

  // jika login → return children saja
  if (disableLayout) {
    return <>{children}</>;
  }

  // normal behaviour
  return (
    <>
      <DesktopLayout>{children}</DesktopLayout>
    </>
  );
}
