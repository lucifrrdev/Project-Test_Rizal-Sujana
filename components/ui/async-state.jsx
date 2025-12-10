import { cn } from "@/lib/utils";

export default function AsyncState({
  loading,
  error,
  data,
  fetching,
  children,
  skeletonCount = 8,
  isMobile,
  type = "default",
}) {
  const state = new AsyncStateHandler({ loading, error, data });

  if (state.isLoading() && type === "head") {
    return (
      <section className={isMobile ? "pt-28" : "pt-40 pb-4"}>
        <div
          className={`w-full ${
            isMobile ? "aspect-5/2" : "aspect-3/1"
          } bg-gray-300 animate-pulse`}
        />
        <div className="container xl:max-w-6xl mx-auto mt-4 flex gap-4">
          <div className="w-20 h-20 bg-gray-300 rounded-md animate-pulse" />
          <div className="flex flex-col flex-1 justify-center gap-2">
            <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (state.isLoading() && type === "slideshow") {
    return (
      <section>
        <div
          className={`w-full container xl:max-w-6xl mx-auto ${
            isMobile ? "aspect-5/2" : "aspect-3/1"
          } bg-gray-300 animate-pulse`}
        />
      </section>
    );
  }

  if (state.isLoading() && type === "list") {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-4  bg-gray-300 animate-pulse rounded" />
              <div className="h-3 w-2/3 bg-gray-300 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (state.isLoading()) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`animate-pulse bg-gray-300 rounded-md ${
              isMobile ? "w-14 h-14" : "w-20 h-20"
            }`}
            style={{
              clipPath:
                "polygon(20% 0, 80% 0, 100% 25%, 100% 75%, 80% 100%, 20% 100%, 0 75%, 0 25%)",
            }}
          />
        ))}
      </div>
    );
  }

  if (state.isError()) {
    return (
      <div className="text-center py-8 text-red-600 font-medium">
        Gagal memuat data
      </div>
    );
  }

  if (state.isEmpty()) {
    return (
      <div
        className={cn(
          "relative flex flex-col gap-2 justify-center items-center",
          type === "list" && "min-h-60"
        )}
      >
       <span className="text-center py-8 text-gray-500">Tidak ada data</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 ",
        type === "list" && "min-h-[600px]"
      )}
    >
      {fetching && (
        <div className="absolute inset-0 bg-card/20 backdrop-blur-sm animate-pulse rounded-md z-10 pointer-events-none" />
      )}
      {children}
    </div>
  );
}

export class AsyncStateHandler {
  constructor({ loading, error, data }) {
    this.loading = loading;
    this.error = error;
    this.data = data;
  }

  isLoading() {
    return this.loading;
  }

  isError() {
    return !!this.error;
  }

  isEmpty() {
    return (
      this.data == null || (Array.isArray(this.data) && this.data.length === 0)
    );
  }
}
