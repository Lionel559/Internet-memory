const API_URL = "https://internet-memory-phi.vercel.app/api/memories";

const SAVE_DEBOUNCE_MS = 5000;
const RECENT_DUPLICATE_MS = 1000 * 60 * 30;

const saveTimers = {};
const recentSaves = {};

const blockedStarts = [
  "chrome://",
  "edge://",
  "about:",
  "file://",
  "chrome-extension://",
  "moz-extension://",
  "http://localhost",
  "https://localhost",
];

const blockedIncludes = [
  "accounts.google.com",
  "login",
  "signin",
  "signup",
  "auth",
  "checkout",
  "payment",
  "bank",
  "wallet",
  "extension",
  "chromewebstore",
];

function shouldBlockUrl(url) {
  const lowerUrl = url.toLowerCase();

  if (blockedStarts.some((blocked) => lowerUrl.startsWith(blocked))) {
    return true;
  }

  if (blockedIncludes.some((blocked) => lowerUrl.includes(blocked))) {
    return true;
  }

  return false;
}

function normalizeUrl(url) {
  try {
    const parsedUrl = new URL(url);

    parsedUrl.hash = "";

    return parsedUrl.toString();
  } catch {
    return url;
  }
}

async function isTrackingPaused() {
  const result = await chrome.storage.local.get(["trackingPaused"]);

  return result.trackingPaused === true;
}

async function hasRecentlySaved(url) {
  const normalizedUrl = normalizeUrl(url);
  const now = Date.now();

  if (
    recentSaves[normalizedUrl] &&
    now - recentSaves[normalizedUrl] < RECENT_DUPLICATE_MS
  ) {
    return true;
  }

  const result = await chrome.storage.local.get(["lastSavedUrls"]);
  const lastSavedUrls = result.lastSavedUrls || {};

  if (
    lastSavedUrls[normalizedUrl] &&
    now - lastSavedUrls[normalizedUrl] < RECENT_DUPLICATE_MS
  ) {
    return true;
  }

  return false;
}

async function markSaved(url) {
  const normalizedUrl = normalizeUrl(url);
  const now = Date.now();

  recentSaves[normalizedUrl] = now;

  const result = await chrome.storage.local.get(["lastSavedUrls"]);
  const lastSavedUrls = result.lastSavedUrls || {};

  lastSavedUrls[normalizedUrl] = now;

  await chrome.storage.local.set({
    lastSavedUrls,
  });
}

async function saveMemory(tab, source = "auto") {
  if (!tab.url || !tab.title) return;

  const normalizedUrl = normalizeUrl(tab.url);

  if (shouldBlockUrl(normalizedUrl)) return;

  if (source === "auto") {
    const paused = await isTrackingPaused();

    if (paused) return;

    const duplicate = await hasRecentlySaved(normalizedUrl);

    if (duplicate) return;
  }

  const memory = {
    title: tab.title,
    url: normalizedUrl,
    favicon: tab.favIconUrl || "",
    savedAt: new Date().toISOString(),
    source,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memory),
    });

    if (!response.ok) {
      throw new Error("Failed to save memory");
    }

    await markSaved(normalizedUrl);

    console.log("Saved to Internet Memory:", memory);
  } catch (error) {
    console.error("Auto-save failed:", error);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab.url || !tab.title) return;

  clearTimeout(saveTimers[tabId]);

  saveTimers[tabId] = setTimeout(() => {
    saveMemory(tab, "auto");
  }, SAVE_DEBOUNCE_MS);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_CURRENT_TAB") {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      async (tabs) => {
        const tab = tabs[0];

        if (!tab) {
          sendResponse({
            success: false,
            error: "No active tab found",
          });

          return;
        }

        await saveMemory(tab, "manual");

        sendResponse({
          success: true,
        });
      }
    );

    return true;
  }

  if (message.type === "SET_TRACKING_PAUSED") {
    chrome.storage.local.set(
      {
        trackingPaused: message.paused,
      },
      () => {
        sendResponse({
          success: true,
          paused: message.paused,
        });
      }
    );

    return true;
  }

  if (message.type === "GET_TRACKING_STATUS") {
    chrome.storage.local.get(["trackingPaused"], (result) => {
      sendResponse({
        paused: result.trackingPaused === true,
      });
    });

    return true;
  }
});