"use client";

import LocaleSwitcher from "@/components/ui/locale-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Button } from "../ui/button";

export default function Header() {
  const t = useTranslations("Header");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const segment = pathname.split("/")[2] || "";
  const locale = pathname.split("/")[1];

  const menu = [
    { name: t("home"), href: "", match: "" },
    { name: t("work"), href: "work", match: "work" },
    { name: t("about"), href: "about", match: "about" },
    { name: t("services"), href: "services", match: "services" },
    { name: t("ideas"), href: "ideas", match: "ideas" },
    { name: t("careers"), href: "careers", match: "careers" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-2xl transition-all duration-700 shadow-sm",
        isScrolled ? "border-b" : ""
      )}
    >
      <div
        className={cn(
          "transition-all duration-500",
          isScrolled ? "bg-card/80 text-foreground" : "bg-primary text-white"
        )}
      >
        <div className="container xl:max-w-6xl mx-auto flex justify-between items-center py-3 px-2">
          <Link href={`/`} className="relative w-20 h-10 shrink-0">
            <Image
              src={"/icon.webp"}
              alt={"SuitMedia"}
              fill
              className={cn(
                "object-contain",
                isScrolled ? "" : "invert brightness-0"
              )}
              sizes={cn("(max-width: 768px) 80px, 100px")}
              priority
            />
          </Link>

          <nav className="hidden md:flex gap-1 text-sm">
            {menu.map((item) => {
              const isActive = segment === item.match;
              return (
                <Link
                  key={item.name}
                  href={`/${item.href}`}
                  className={cn(
                    "relative py-2 px-3 transition-colors duration-300",
                    "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-current after:transition-all after:duration-300",
                    isActive
                      ? "after:w-full font-semibold"
                      : "after:w-0 hover:after:w-full",
                    isScrolled ? "text-black" : "text-white"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-row gap-2">
            <LocaleSwitcher />
            <div className="hidden md:block">
              <Button
                asChild
                size="sm"
                className={cn(
                  "rounded-md px-4 py-2 h-fit border",
                  isScrolled
                    ? "bg-primary text-white border-primary"
                    : "bg-primary-foreground text-primary border-primary"
                )}
              >
                <Link href={`/contact`}>{t("contact")}</Link>
              </Button>
            </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                {isOpen ? (
                  <HiX
                    size={24}
                    className={cn(
                      isScrolled
                        ? "bg-primary text-white border-primary"
                        : "bg-primary-foreground text-primary border-primary"
                    )}
                  />
                ) : (
                  <HiMenuAlt3
                    size={24}
                    className={cn(
                      isScrolled ? " text-primary" : "b text-white "
                    )}
                  />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-56 px-4 py-4">
              <SheetHeader>
                <SheetTitle className="text-left text-sm font-semibold tracking-wide">
                  {t("menu")}
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 mt-2">
                {menu.map((item) => {
                  const isActive = segment === item.match;
                  return (
                    <Link
                      key={item.name}
                      href={`/${item.href}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "py-1.5 text-[13px] font-medium tracking-wide transition-colors",
                        isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <Button
                  className="w-full mt-3 h-8 text-[13px] tracking-wide"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={`/contact`}>{t("contact")}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
