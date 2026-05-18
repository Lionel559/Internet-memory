"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Search,
  Sparkles,
  ArrowRight,
  Download,
  MousePointer2,
  Database,
} from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function Home() {
  return (
    <>
      {/* Mobile Block */}
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center md:hidden">
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
      <main className="hidden min-h-screen overflow-hidden bg-white text-slate-900 md:block">
        {/* Navbar */}
        <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="text-xl font-bold tracking-tight">
              Internet<span className="text-blue-600">Memory</span>
            </div>

            <div className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
              <a href="#features" className="transition hover:text-slate-900">
                Features
              </a>

              <a
                href="#how-it-works"
                className="transition hover:text-slate-900"
              >
                How it works
              </a>

              <a
                href="#extension"
                className="transition hover:text-slate-900"
              >
                Extension
              </a>
            </div>

            <Link
              href="/dashboard"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105"
            >
              Open Dashboard
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-24 pt-40">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                Browser Memory Workspace
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900 md:text-7xl">
                Never lose a
                <br />
                website again.
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-500">
                Internet Memory quietly remembers the pages you visit and
                turns your browser history into a searchable memory system.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/internet-memory-extension.zip"
                  download
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-7 py-4 font-medium text-white transition hover:bg-slate-800"
                >
                  Download Extension
                </a>

                <Link
                  href="/dashboard"
                  className="rounded-2xl border border-slate-200 bg-white px-7 py-4 font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  Open Dashboard
                </Link>
              </div>

              <div className="mt-14 flex flex-wrap gap-3">
                {[
                  "AI articles",
                  "React tutorials",
                  "Design inspiration",
                  "Chrome extensions",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right UI Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

              <div className="relative rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                {/* Top Search */}
                <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <Search size={18} className="text-slate-500" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        Search Memory
                      </p>

                      <p className="text-sm font-medium text-slate-900">
                        “that react animation article”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Memory Feed */}
                <div className="space-y-3">
                  {[
                    {
                      title: "React Animation Tutorial",
                      url: "youtube.com/watch/react-motion",
                    },
                    {
                      title: "Clean Dashboard Inspiration",
                      url: "dribbble.com/dashboard-ui",
                    },
                    {
                      title: "AI Startup Research",
                      url: "medium.com/ai-startups",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <div className="mt-1 h-3 w-3 rounded-full bg-blue-600" />

                          <div>
                            <p className="font-medium text-slate-900">
                              {item.title}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {item.url}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                          Saved
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom */}
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4">
                  <p className="text-sm text-slate-500">
                    Your browser history becomes a searchable memory layer.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          id="how-it-works"
          className="border-y border-slate-200 bg-slate-50 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-blue-600">
                Workflow
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Browse normally. Find anything later.
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  icon: Download,
                  title: "Install",
                  text: "Load the extension into Chrome.",
                },
                {
                  number: "02",
                  icon: MousePointer2,
                  title: "Browse",
                  text: "Visit tutorials, articles, docs, and inspiration.",
                },
                {
                  number: "03",
                  icon: Database,
                  title: "Save",
                  text: "Pages are stored with useful browsing context.",
                },
                {
                  number: "04",
                  icon: Sparkles,
                  title: "Recall",
                  text: "Search your memory using simple language.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-[24px] border border-slate-200 bg-white p-6"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-400">
                      {step.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                      <step.icon size={20} />
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="leading-7 text-slate-500">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Extension */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          id="extension"
          className="px-6 py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-blue-600">
                Browser Extension
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                The extension is the memory collector.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500">
                Install it locally, browse normally, and your saved pages
                will appear inside the dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/internet-memory-extension.zip"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 py-4 font-medium text-white transition hover:bg-slate-800"
                >
                  <Download size={18} />
                  Download Extension
                </a>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  Open Dashboard
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-5">
                <div>
                  <h3 className="font-semibold">
                    InternetMemory Extension
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Local Chrome installation
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                  Active
                </span>
              </div>

              <div className="space-y-3">
                {[
                  "Download the extension ZIP file",
                  "Open chrome://extensions",
                  "Enable Developer Mode",
                  "Click Load Unpacked",
                  "Select the extension folder",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-semibold text-slate-500">
                      {index + 1}
                    </div>

                    <p className="text-sm text-slate-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-slate-200 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-lg font-bold">
                Internet<span className="text-blue-600">Memory</span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                A browser memory workspace for saving and finding websites
                later.
              </p>
            </div>

            <div className="flex gap-5 text-sm text-slate-500">
              <a href="#features" className="hover:text-slate-900">
                Features
              </a>

              <a href="#how-it-works" className="hover:text-slate-900">
                Workflow
              </a>

              <a href="#extension" className="hover:text-slate-900">
                Extension
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}