# Internet Memory

AI-powered browser memory platform that automatically saves, organizes, and helps users rediscover websites using semantic search and AI summaries.

## Live Demo

🌐 [https://internet-memory-phi.vercel.app/](https://internet-memory-phi.vercel.app/)

---

# Features

* Chrome extension auto-save
* AI-generated website summaries
* Semantic search experience
* Smart website categorization
* Favorites system
* Detailed memory pages
* Real-time dashboard updates
* Pause tracking mode
* Manual save mode
* Modern SaaS-style UI
* Desktop-optimized experience

---

# Tech Stack

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* Framer Motion

## Backend

* Supabase

## AI

* Google Gemini API

## Deployment

* Vercel

## Extension

* Chrome Extension Manifest V3

---

# How It Works

Internet Memory automatically captures websites visited in the browser through a connected Chrome extension.

Each saved memory includes:

* Website title
* URL
* Favicon
* AI-generated summary
* Smart category
* Timestamp

Users can later rediscover websites using semantic-style search instead of relying on bookmarks or browser history.

---

# Screenshots

## Landing Page

Add screenshot here.

## Dashboard

Add screenshot here.

## Search Experience

Add screenshot here.

## Chrome Extension

Add screenshot here.

---

# Installation

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/internet-memory.git
```

```bash
cd internet-memory
```

## Install dependencies

```bash
npm install
```

## Create environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
```

## Run development server

```bash
npm run dev
```

---

# Chrome Extension Setup

1. Open Chrome
2. Visit:

```text
chrome://extensions
```

3. Enable Developer Mode
4. Click Load Unpacked
5. Select the extension folder

The extension will begin saving websites automatically.

---

# Future Improvements

* Authentication system
* User-specific memories
* Real vector embeddings
* Memory chat assistant
* Browser sync
* Smart collections
* Export/import memories
* AI recommendations
* Mobile support

---

# Project Vision

Internet Memory explores the idea of transforming browser history into an intelligent memory layer powered by AI.

Instead of losing useful websites forever, users can rediscover information naturally using memory-based search.

---

# Author

Elijah Amao

---

# License

MIT License
