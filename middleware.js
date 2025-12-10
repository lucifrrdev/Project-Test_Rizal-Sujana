import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Jika pathname tidak memiliki prefix locale
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*|favicon.ico|assets).*)'
  ]
};
