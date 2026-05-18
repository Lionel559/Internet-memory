"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Shield,
  Pause,
  Trash2,
  Cloud,
  Bell,
  User,
  Monitor,
  Play,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const [clearing, setClearing] = useState(false);

  const [trackingEnabled, setTrackingEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("tracking-enabled");

    if (saved !== null) {
      setTrackingEnabled(saved === "true");
    }
  }, []);

  function toggleTracking() {
    const next = !trackingEnabled;

    setTrackingEnabled(next);

    localStorage.setItem("tracking-enabled", String(next));
  }

  async function clearMemories() {
    const confirmed = confirm(
      "Delete all memories? This cannot be undone."
    );

    if (!confirmed) return;

    setClearing(true);

    try {
      const response = await fetch("/api/memories/clear", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete memories");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not delete memories. Please try again.");
    } finally {
      setClearing(false);
    }
  }

  return (
    <>
      {/* Mobile Block */}
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

      {/* Desktop */}
      <main className="hidden min-h-screen bg-slate-50 text-slate-900 md:block">
        <section className="mx-auto max-w-6xl px-6 py-10">
          <Link
            href="/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Settings
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Privacy & Extension Settings
            </h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT */}
            <aside className="space-y-6">
              <div className="card-shadow rounded-[32px] border border-slate-200 bg-white p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <User size={24} />
                </div>

                <h2 className="mb-2 text-2xl font-semibold">
                  Account
                </h2>

                <p className="text-sm leading-6 text-slate-500">
                  Portfolio demo account for testing browser memory features.
                </p>
              </div>

              <div className="card-shadow rounded-[32px] border border-slate-200 bg-white p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Monitor size={24} />
                </div>

                <h2 className="mb-2 text-2xl font-semibold">
                  Extension
                </h2>

                <p className="mb-5 text-sm leading-6 text-slate-500">
                  Browser extension is connected and automatically saving
                  browsing memories to your dashboard.
                </p>

                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
                  Connected
                </span>
              </div>
            </aside>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* Tracking */}
              <div className="card-shadow rounded-[32px] border border-slate-200 bg-white p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Shield size={24} />
                </div>

                <h2 className="mb-3 text-2xl font-semibold">
                  Tracking Status
                </h2>

                <p className="mb-6 leading-7 text-slate-500">
                  Automatically save useful websites, tutorials, videos,
                  articles, and development resources while browsing.
                </p>

                <button
                  onClick={toggleTracking}
                  className={`rounded-full px-6 py-3 font-semibold text-white transition ${
                    trackingEnabled
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-500 hover:bg-slate-600"
                  }`}
                >
                  {trackingEnabled
                    ? "Tracking Enabled"
                    : "Tracking Paused"}
                </button>
              </div>

              {/* Privacy */}
              <div className="card-shadow rounded-[32px] border border-slate-200 bg-white p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  {trackingEnabled ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} />
                  )}
                </div>

                <h2 className="mb-3 text-2xl font-semibold">
                  Privacy Mode
                </h2>

                <p className="mb-6 leading-7 text-slate-500">
                  Pause saving memories when browsing sensitive or private
                  pages to keep your browsing secure.
                </p>

                <button
                  onClick={toggleTracking}
                  className={`rounded-full px-6 py-3 font-semibold transition ${
                    trackingEnabled
                      ? "border border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {trackingEnabled
                    ? "Pause Tracking"
                    : "Resume Tracking"}
                </button>
              </div>

              {/* Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card-shadow rounded-[32px] border border-slate-200 bg-white p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Cloud size={24} />
                  </div>

                  <h2 className="mb-3 text-xl font-semibold">
                    Cloud Sync
                  </h2>

                  <p className="mb-6 text-sm leading-6 text-slate-500">
                    Sync saved memories between devices and browsers.
                  </p>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                    Coming Soon
                  </span>
                </div>

                <div className="card-shadow rounded-[32px] border border-slate-200 bg-white p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Bell size={24} />
                  </div>

                  <h2 className="mb-3 text-xl font-semibold">
                    Weekly Recap
                  </h2>

                  <p className="mb-6 text-sm leading-6 text-slate-500">
                    Generate AI summaries of your saved browsing activity.
                  </p>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                    AI Feature
                  </span>
                </div>
              </div>

              {/* Delete */}
              <div className="rounded-[32px] border border-red-200 bg-red-50 p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <Trash2 size={24} />
                </div>

                <h2 className="mb-3 text-2xl font-semibold text-red-600">
                  Delete Memories
                </h2>

                <p className="mb-6 leading-7 text-slate-500">
                  Permanently remove all saved browsing memories from your
                  dashboard.
                </p>

                <button
                  onClick={clearMemories}
                  disabled={clearing}
                  className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {clearing
                    ? "Deleting..."
                    : "Delete All Memories"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}