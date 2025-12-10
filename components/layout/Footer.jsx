"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = [
    {
      title: t("company"),
      links: [
        { name: t("about-us"), href: "/about-us" },
        { name: t("career"), href: "/career" },
        { name: t("privacy-policy"), href: "/privacy-policy" },
      ],
    },
    {
      title: t("services"),
      links: [
        { name: t("services"), href: "/services" },
        { name: t("portfolio"), href: "/portfolio" },
        { name: t("contact"), href: "/contact" },
      ],
    },
  ];

  const social = {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
    youtube: "https://youtube.com/yourchannel",
    tiktok: "https://tiktok.com/@yourprofile",
    whatsapp: "https://wa.me/628123456789",
  };

  const socialIcons = [
    { name: "instagram", color: "#e1306c", icon: <FaInstagram size={22} /> },
    { name: "whatsapp", color: "#25D366", icon: <FaWhatsapp size={22} /> },
    { name: "tiktok", color: "currentColor", icon: <FaTiktok size={22} /> },
    { name: "youtube", color: "#FF0000", icon: <FaYoutube size={22} /> },
    { name: "facebook", color: "#1877F2", icon: <FaFacebook size={22} /> },
    { name: "twitter", color: "#1DA1F2", icon: <FaTwitter size={22} /> },
  ];

  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container xl:max-w-6xl mx-auto px-4 py-1 lg:grid flex flex-col grid-cols-12 gap-4">
        
        <div className="flex flex-col col-span-5">
          <Link href={`/`} >
          <div className="relative w-full max-w-[100px] h-auto aspect-3/1 mb-3">
            <Image
              src={"/icon.webp"}
              alt={"SuitMedia"}
              fill
              className="object-contain"
            />
          </div>
          </Link>

          <p className="text-xs leading-relaxed mb-4 text-foreground/70">
            Your trusted partner for digital transformation in Indonesia. We are
            a full-service agency specializing in technology and marketing
            solutions.
          </p>

          <div className="flex items-center gap-3 mt-2">
            {socialIcons.map(
              (item) =>
                social?.[item.name] && (
                  <a
                    key={item.name}
                    href={social[item.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </a>
                )
            )}
          </div>
        </div>

        <div className="col-span-7 grid grid-cols-3 gap-4">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-foreground font-semibold text-sm mb-2">
                {section.title}
              </h3>

              <ul className="text-xs">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center px-1 py-1 text-xs text-foreground/80 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      <div className="border-t border-border mt-6 pt-6 text-center text-xs text-foreground/70">
        © Suitmedia 2009-2025. All rights reserved.
      </div>
    </footer>
  );
}
