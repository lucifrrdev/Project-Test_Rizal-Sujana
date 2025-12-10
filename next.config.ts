import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**",
      },

      {
        protocol: "https",
        hostname: "assets.suitdev.com",
      },

    ],
    localPatterns: [
      {
        pathname: "/api/proxy/image",
        search: "url=*",
      },
      {
        pathname: "/**", 
      }
    ],

    // ⚙️ default loader bawaan Next.js
    formats: ["image/avif", "image/webp"],

    // 💨 Aktifkan image optimization
    minimumCacheTTL: 60 * 60 * 24, // cache 1 hari
    dangerouslyAllowSVG: true, // biar bisa load logo .svg dari luar
  },
  webpack(config, options) {
    // Konfigurasi MDX loader
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
        },
      ],
    });
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);