"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ExternalLink,
  Brain,
  CalendarDays,
  Sparkles,
  Clock,
  Globe,
  Trash2,
} from "lucide-react";

import { useMemory } from "@/hooks/useMemory";

export default function MemoryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { memory, loading } = useMemory(id);

  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function deleteMemory() {
    const confirmed = confirm("Delete this memory?");

    if (!confirmed) return;

    setDeleting(true);

    try {
      const response = await fetch(`/api/memories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete memory");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Could not delete memory. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
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

        <main className="hidden min-h-screen items-center justify-center bg-slate-50 md:flex">
          <p className="text-slate-500">Loading memory...</p>
        </main>
      </>
    );
  }

  if (!memory) {
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

        <main className="hidden min-h-screen items-center justify-center bg-slate-50 md:flex">
          <div className="text-center">
            <h1 className="mb-3 text-3xl font-bold">
              Memory Not Found
            </h1>

            <Link
              href="/dashboard"
              className="text-blue-600"
            >
              Back Dashboard
            </Link>
          </div>
        </main>
      </>
    );
  }

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
          <Link
            href="/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div className="min-w-0">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Memory Details
              </p>

              <h1 className="mb-4 break-words text-3xl font-bold tracking-tight md:text-5xl">
                {memory.title}
              </h1>

              <p className="truncate text-slate-500">
                {memory.url}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={memory.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Open Website
                <ExternalLink size={16} />
              </a>

              <button
                onClick={deleteMemory}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={16} />

                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="card-shadow rounded-[30px] border border-slate-200 bg-white p-6">
              <div className="mb-6 flex h-80 items-center justify-center rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border border-slate-200 bg-white shadow-sm">
                    {memory.favicon ? (
                      <img
                        src={memory.favicon}
                        alt=""
                        className="h-10 w-10 rounded-xl"
                      />
                    ) : (
                      <Globe
                        size={34}
                        className="text-slate-600"
                      />
                    )}
                  </div>

                  <h3 className="mb-2 max-w-md break-words text-xl font-semibold text-slate-900">
                    {memory.title}
                  </h3>

                  <p className="mx-auto max-w-md truncate text-sm text-slate-500">
                    {memory.url}
                  </p>
                </div>
              </div>

              <div className="mb-8 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700">
                    <Sparkles size={20} />
                  </div>

                  <h2 className="text-2xl font-semibold">
                    AI Summary
                  </h2>
                </div>

                <p className="leading-8 text-slate-500">
                  {memory.summary ||
                    "This page was saved from your browser memory system. Internet Memory captured the website title, URL, favicon, and browsing timestamp so you can easily find it later."}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                    <Brain size={20} />
                  </div>

                  <h2 className="text-xl font-semibold">
                    Saved Website
                  </h2>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="break-all text-sm text-slate-600">
                    {memory.url}
                  </p>
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="card-shadow rounded-[26px] border border-slate-200 bg-white p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  <CalendarDays size={20} />
                </div>

                <p className="mb-2 text-sm text-slate-500">
                  Saved At
                </p>

                <h3 className="font-semibold">
                  {mounted
                    ? new Date(memory.savedAt).toLocaleString()
                    : "Loading date..."}
                </h3>
              </div>

              <div className="card-shadow rounded-[26px] border border-slate-200 bg-white p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  <Sparkles size={20} />
                </div>

                <p className="mb-2 text-sm text-slate-500">
                  Category
                </p>

                <h3 className="font-semibold text-blue-600">
                  {memory.category || "Website"}
                </h3>
              </div>

              <div className="rounded-[26px] border border-blue-100 bg-blue-50 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600">
                  <Clock size={20} />
                </div>

                <h3 className="mb-2 font-semibold">
                  Memory Context
                </h3>

                <p className="text-sm leading-6 text-slate-600">
                  This website was automatically stored in your browsing
                  memory workspace and can now be intelligently searched later.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}