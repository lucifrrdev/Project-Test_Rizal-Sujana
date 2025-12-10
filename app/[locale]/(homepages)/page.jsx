"use client";

import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/tanstack.config";
import { cn } from "@/lib/utils";
import { useIdeasStore } from "@/store/useIdeasStore";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import ImageLoader from "@/components/ui/image-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function IdeasPage() {
  const t = useTranslations("Ideas");
  const locale = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "en";

  const { page, limit, sort, setPage, setLimit, setSort, setSelectedIdea } =
    useIdeasStore();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["ideas", page, limit, sort],
    queryFn: async () => {
      try {
        const res = await fetcher(
          `/api/proxy/ideas?page=${page}&size=${limit}&sort=${sort}`
        );
        return res;
      } catch {
        const start = (page - 1) * limit;
        const end = start + limit;

        const sortedDummy =
          sort === "-published_at"
            ? [...dummyIdeas].reverse()
            : [...dummyIdeas];

        return {
          data: sortedDummy.slice(start, end),
          meta: { total: dummyIdeas.length },
        };
      }
    },
    keepPreviousData: true,
    retry: 1,
  });

  const posts = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="flex flex-col gap-6 pt-14">
      <div className="relative h-48 md:h-80 w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/bgheader.webp"
          alt="Header Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white max-w-xl px-5">
          <h1 className="text-2xl md:text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-xs md:text-sm opacity-90">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container xl:max-w-6xl mx-auto flex flex-col gap-4 px-3">
        {isError && (
          <div className="p-3 border border-red-400 bg-red-50 text-red-600 rounded-md flex justify-between text-xs">
            <span>{error?.message || t("failed")}</span>
            <Button size="sm" variant="destructive" onClick={() => refetch()}>
              {t("retry")}
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1">
            <label>{t("show")}:</label>
            <Select
              value={String(limit)}
              onValueChange={(value) => {
                setLimit(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[70px] h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-xs">
                {[4, 8, 12, 20, 30].map((n) => (
                  <SelectItem key={n} value={String(n)} className="text-xs">
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <label>{t("sort")}:</label>
            <Select
              value={sort}
              onValueChange={(value) => {
                setSort(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[120px] h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-xs">
                <SelectItem value="-published_at">{t("newest")}</SelectItem>
                <SelectItem value="published_at">{t("oldest")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {isLoading &&
            Array.from({ length: limit }).map((_, idx) => (
              <div key={idx} className="bg-gray-200 h-36 animate-pulse rounded-md" />
            ))}

          {!isLoading &&
            posts.map((post) => {
              const image =
                post?.small_image?.[0]?.url ||
                post?.medium_image?.[0]?.url ||
                "/icon.webp";

              const date = new Date(post.published_at);
              const formattedDate = date.toLocaleDateString(locale === "id" ? "id-ID" : "en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <Link
                  key={post.id}
                  href={`/ideas/${post.slug}`}
                  onClick={() => setSelectedIdea(post)}
                  className="bg-white rounded-md shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative h-32 md:h-40">
                    <ImageLoader src={image} alt={post.title} />
                  </div>

                  <div className="p-2 md:p-3">
                    <p className="text-tiny text-gray-500">
                      {formattedDate.toUpperCase()}
                    </p>
                    <h3 className="mt-1 font-semibold text-[13px] line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
        </div>

        <div className="flex justify-center items-center gap-1 my-8 text-xs">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(1)}>
            «
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
            const p = Math.max(1, page - 2) + idx;
            if (p > totalPages) return null;
            return (
              <Button
                key={p}
                variant={page === p ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            ›
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          >
            »
          </Button>
        </div>
      </div>
    </section>
  );
}

export const dummyIdeas = Array.from({ length: 200 }).map((_, i) => ({
  id: i + 1,
  slug: `dummy-post-${i + 1}`,
  title:
    i % 2 === 0
      ? "Balanced Scorecard: Pengertian, Manfaat dan Perspektif"
      : "System Design: Pengertian, Prinsip, dan Jenis",
  published_at: `2023-${String((i % 12) + 1).padStart(2, "0")}-${String(
    (i % 28) + 1
  ).padStart(2, "0")} 12:00:00`,
  small_image: [
    {
      id: 1000 + i,
      url: `https://picsum.photos/seed/small-${i + 1}/600/400`,
    },
  ],
}));
