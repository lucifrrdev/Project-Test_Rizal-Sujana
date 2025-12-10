import { routing } from "@/i18n/routing";
import Providers from "@/provider/provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";


export const metadata = {
  title: "SuitMedia — Digital Agency",
  description: "SuitMedia delivers digital transformation, design, and technology solutions.",
  openGraph: {
    type: "website",
    url: "https://suitmedia.com",
    title: "SuitMedia — Digital Agency",
    description: "SuitMedia delivers digital transformation, design, and technology solutions.",
    images: [
      "https://suitmedia.com/og-image.jpg"
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuitMedia — Digital Agency",
    description: "SuitMedia delivers digital transformation, design, and technology solutions.",
    images: ["https://suitmedia.com/og-image.jpg"]
  }
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning={true}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers locale={locale}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
