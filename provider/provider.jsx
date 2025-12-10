"use client";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import LayoutProviders from "./layout.provider";

// ⭐ Import disk-cache persister
import { setupPersistQueryClient } from "@/lib/persistQueryClient";

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
  display: "swap",
});

const interMono = Inter({
  subsets: ["latin"],
  variable: "--font-inter-mono",
  display: "swap",
});

export default function Providers({ children, locale }) {
  const { theme } = useThemeStore();
  const [queryClient] = useState(() => new QueryClient());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // 💾 aktifkan disk cache hanya di production
      setupPersistQueryClient(queryClient);
    }
    setReady(true);
  }, [queryClient]);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div
          className={cn(
            interSans.className,
            interMono.className,
            "theme-" + theme
          )}
        >
          <LayoutProviders>{children}</LayoutProviders>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
