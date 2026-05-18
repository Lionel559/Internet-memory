"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMemories, ApiMemory } from "@/hooks/useMemories";

import { ArrowLeft, Search, Sparkles, Globe } from "lucide-react";

type SemanticMemory = ApiMemory & {
  similarity?: number;
};

export default function SearchPage() {
  const { memories, loading } = useMemories();

  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [searching, setSearching] = useState(false);
  const [semanticResults, setSemanticResults] = useState<SemanticMemory[]>([]);

  const results: SemanticMemory[] = query.trim()
  ? semanticResults
  : memories;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setSemanticResults([]);
        return;
      }

      setSearching(true);

      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
          }),
        });

        const data = await response.json();

        setSemanticResults(data.memories || []);
      } catch (error) {
        console.error("Semantic search failed:", error);
      } finally {
        setSearching(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center md:hidden">
        <div>
          <h1 className="mb-3 text-3xl font-bold">
            Desktop Only
          </h1>

          <p className="text-slate-500">
            Internet Memory is currently optimized for desktop browsers.
          </p>
        </div>
      </div>

      <main className="hidden min-h-screen bg-slate-50 text-slate-900 md:block">
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Semantic AI Search
              </p>

              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Search by meaning, not just keywords.
              </h1>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
              Back Dashboard
            </Link>
          </div>

          <div className="card-shadow mb-10 rounded-[34px] border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 transition focus-within:border-blue-300 focus-within:bg-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Search size={22} />
              </div>

              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Ask your browser memory
                </p>

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder='Try: "design inspiration website"'
                  className="w-full bg-transparent text-lg font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Search Results</h2>

              <p className="mt-1 text-sm text-slate-500">
                {query.trim()
                  ? "Using semantic search across your saved memories."
                  : "Showing all saved extension memories."}
              </p>
            </div>

            <p className="text-sm font-medium text-slate-500">
              {searching
                ? "Searching..."
                : `${results.length} matches found`}
            </p>
          </div>

          {loading || searching ? (
            <div className="card-shadow rounded-[30px] border border-slate-200 bg-white p-8 text-slate-500">
              {searching
                ? "Searching memories..."
                : "Loading saved memories..."}
            </div>
          ) : results.length === 0 ? (
            <div className="card-shadow rounded-[30px] border border-slate-200 bg-white p-8 text-slate-500">
              No intelligent matches found for this search.
            </div>
          ) : (
            <div className="space-y-5">
              {results.map((result) => (
                <Link
                  href={`/memory/${result.id}`}
                  key={result.id}
                  className="card-shadow block rounded-[30px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200"
                >
                  <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div className="flex min-w-0 gap-4">
                      {result.favicon ? (
                        <img
                          src={result.favicon}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-2xl border border-slate-200 bg-white p-2"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500">
                          <Globe size={20} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="truncate text-2xl font-semibold">
                          {result.title}
                        </h3>

                        <p className="mt-2 max-w-[650px] truncate text-sm text-slate-500">
                          {result.url}
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                          {result.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        {result.category || "Website"}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500">
                        <Sparkles size={13} />

                        {result.similarity
                          ? `${Math.min(
                              100,
                              Math.round(result.similarity * 100)
                            )}% match`
                          : "Live match"}
                      </span>
                    </div>
                  </div>

                  <p className="leading-7 text-slate-500">
                    Saved from your browser on{" "}
                    {mounted
                      ? new Date(result.savedAt).toLocaleString()
                      : "Loading date..."}
                    .
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}