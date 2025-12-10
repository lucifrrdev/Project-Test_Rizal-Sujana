"use client";

import { useIdeasStore } from "@/store/useIdeasStore";
import ImageLoader from "@/components/ui/image-loader";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { use } from "react";

export default function IdeaDetail({ params }) {
  const { selectedIdea, clearSelectedIdea } = useIdeasStore();
  const unwrapped = use(params);
  const slug = unwrapped.slug;

  const locale =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1]
      : "en";

  if (!selectedIdea || selectedIdea.slug !== slug) {
    clearSelectedIdea();
    return (
      <div className="container mx-auto py-32 text-center">
        <h2 className="text-xl font-semibold">Article Not Found</h2>
        <p className="text-sm opacity-70 mt-2">
          Data not loaded or refreshed directly.
        </p>

        <Button className="mt-6" asChild>
          <Link href={`/ideas`}>← Back to Ideas</Link>
        </Button>
      </div>
    );
  }

  const image =
    selectedIdea.small_image?.[0]?.url || selectedIdea.medium_image?.[0]?.url;

  const date = new Date(selectedIdea.published_at);
  const formattedDate = date.toLocaleDateString(
    locale === "id" ? "id-ID" : "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const category = selectedIdea.category || "General";

  return (
    <section className="flex flex-col pb-16">
      <div className="relative h-80 md:h-[420px] w-full">
        <div className="absolute inset-0">
          <ImageLoader src={image} alt={selectedIdea.title} />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex flex-col text-center text-white">
          <Badge className="mx-auto mb-3 px-3 py-1 bg-white/10 backdrop-blur border border-white/20">
            {category}
          </Badge>

          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            {selectedIdea.title}
          </h1>

          <p className="text-sm opacity-80 mt-2">{formattedDate}</p>
        </div>
      </div>

        <div className="container xl:max-w-6xl mx-auto flex justify-between gap-3 py-3 px-2">
          <article
            className="article-content max-w-none text-xs"
            dangerouslySetInnerHTML={{
              __html: selectedIdea.content || "<p>No content provided.</p>",
            }}
          />
        </div>

      <div className="container xl:max-w-5xl mx-auto px-4 flex justify-between flex-wrap gap-4">
        <Button variant="outline" className="px-3" asChild>
          <Link href={`/`}>← Back to Ideas</Link>
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" className="text-gray-500" disabled>
            ‹ Prev Article
          </Button>
          <Button variant="ghost" className="text-gray-500" disabled>
            Next Article ›
          </Button>
        </div>
      </div>
    </section>
  );
}
