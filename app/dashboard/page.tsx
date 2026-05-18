"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMemories } from "@/hooks/useMemories";

import {
  LayoutDashboard,
  Search,
  Clock,
  Settings,
  Plus,
  Brain,
  CalendarDays,
  Sparkles,
  ArrowRight,
  Globe,
  Star,
} from "lucide-react";

const categories = [
  "All",
  "Favorites",
  "Website",
  "Video",
  "Development",
  "Design",
  "Article",
  "Documentation",
  "Social",
  "Shopping",
  "AI",
];

export default function DashboardPage() {
  const { memories, loading } = useMemories();

  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [dashboardQuery, setDashboardQuery] = useState("");

  const savedThisWeek = memories.filter((memory) => {
    const savedDate = new Date(memory.savedAt);
    const now = new Date();

    const diff =
      (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60 * 24);

    return diff <= 7;
  }).length;

  const filteredMemories = memories.filter((memory) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "Favorites" && memory.isFavorite) ||
      memory.category === activeCategory;

    const searchValue = dashboardQuery.toLowerCase();

    const matchesSearch =
      memory.title.toLowerCase().includes(searchValue) ||
      memory.url.toLowerCase().includes(searchValue) ||
      memory.summary.toLowerCase().includes(searchValue) ||
      memory.category.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  async function toggleFavorite(
    event: React.MouseEvent,
    id: string,
    currentValue: boolean
  ) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch(`/api/memories/${id}/favorite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFavorite: !currentValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Could not update favorite");
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center md:hidden">
        <div>
          <h1 className="mb-3 text-3xl font-bold">Desktop Only</h1>

          <p className="text-slate-500">
            Internet Memory is currently optimized for desktop browsers.
          </p>
        </div>
      </div>

      <main className="hidden min-h-screen bg-slate-50 text-slate-900 md:block">
        <div className="flex overflow-hidden">
          <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white p-6 md:block">
            <Link href="/" className="mb-10 block text-xl font-bold">
              Internet<span className="text-blue-600">Memory</span>
            </Link>

            <nav className="space-y-3 text-sm text-slate-500">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                href="/search"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <Search size={18} />
                Search
              </Link>

              <Link
                href={
                  memories.length > 0
                    ? `/memory/${memories[0].id}`
                    : "/dashboard"
                }
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <Clock size={18} />
                Memory
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <Settings size={18} />
                Settings
              </Link>
            </nav>

            <div className="mt-10 rounded-[28px] border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Sparkles size={22} />
              </div>

              <h3 className="mb-2 text-lg font-semibold">AI Insight</h3>

              <p className="mb-5 text-sm leading-6 text-slate-500">
                You have saved {memories.length} memories. Your most recent
                category is {memories[0]?.category || "Website"}.
              </p>

              <button className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                View Insights
                <ArrowRight size={16} />
              </button>
            </div>
          </aside>

          <section className="min-w-0 flex-1 p-6 md:p-10">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Dashboard
                </p>

                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                  Your Internet Memory
                </h1>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/internet-memory-extension.zip"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  <Globe size={18} />
                  Download Extension
                </a>

                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  <Plus size={18} />
                  Add Memory
                </button>
              </div>
            </div>

            <div className="card-shadow mb-8 rounded-[32px] border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Search size={22} />
                </div>

                <input
                  value={dashboardQuery}
                  onChange={(event) => setDashboardQuery(event.target.value)}
                  placeholder='Search: "AI startup article from last week"'
                  className="w-full bg-transparent text-lg font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="mb-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Total Memories",
                  value: memories.length,
                  icon: Brain,
                },
                {
                  title: "Favorites",
                  value: memories.filter((memory) => memory.isFavorite).length,
                  icon: Star,
                },
                {
                  title: "Saved This Week",
                  value: savedThisWeek,
                  icon: CalendarDays,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="card-shadow rounded-[30px] border border-slate-200 bg-white p-6"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <item.icon size={24} />
                  </div>

                  <p className="mb-2 text-sm text-slate-500">{item.title}</p>

                  <h2 className="text-4xl font-bold text-slate-900">
                    {item.value}
                  </h2>
                </div>
              ))}
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Memories</h2>

                <Link
                  href="/search"
                  className="text-sm font-semibold text-blue-600"
                >
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="card-shadow rounded-[30px] border border-slate-200 bg-white p-8 text-slate-500">
                  Loading memories...
                </div>
              ) : memories.length === 0 ? (
                <div className="card-shadow rounded-[30px] border border-slate-200 bg-white p-8 text-slate-500">
                  No memories yet. Use the extension to save your first page.
                </div>
              ) : filteredMemories.length === 0 ? (
                <div className="card-shadow rounded-[30px] border border-slate-200 bg-white p-8 text-slate-500">
                  No memories found.
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredMemories.map((memory) => (
                    <Link
                      href={`/memory/${memory.id}`}
                      key={memory.id}
                      className="card-shadow block rounded-[30px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 focus:outline-none"
                    >
                      <div className="space-y-5">
                        <div className="flex min-w-0 items-start gap-4">
                          {memory.favicon ? (
                            <img
                              src={memory.favicon}
                              alt=""
                              className="h-11 w-11 shrink-0 rounded-xl border border-slate-200 bg-white p-2"
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                              <Globe size={18} className="text-slate-500" />
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="mb-2 truncate text-lg font-semibold text-slate-900">
                              {memory.title}
                            </p>

                            <p className="truncate text-sm text-slate-500">
                              {memory.url}
                            </p>

                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                              {memory.summary}
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                          <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                              {memory.category || "Website"}
                            </span>

                            <p className="text-sm text-slate-500">
                              {mounted
                                ? new Date(memory.savedAt).toLocaleString()
                                : "Loading date..."}
                            </p>
                          </div>

                          <button
                            onClick={(event) =>
                              toggleFavorite(
                                event,
                                memory.id,
                                memory.isFavorite
                              )
                            }
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                              memory.isFavorite
                                ? "bg-yellow-100 text-yellow-700"
                                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <Star
                              size={16}
                              fill={
                                memory.isFavorite ? "currentColor" : "none"
                              }
                            />

                            {memory.isFavorite ? "Saved" : "Star"}
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}