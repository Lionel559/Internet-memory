chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab.url || !tab.title) return;

  const blockedUrls = [
    "chrome://",
    "edge://",
    "about:",
    "file://",
    "chrome-extension://",
    "moz-extension://",
    "http://localhost:3000",
    "https://localhost:3000",
  ];

  const isBlocked = blockedUrls.some((url) => tab.url.startsWith(url));

  if (isBlocked) return;

  const memory = {
    title: tab.title,
    url: tab.url,
    favicon: tab.favIconUrl || "",
    savedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch("http://localhost:3000/api/memories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memory),
    });

    if (!response.ok) {
      throw new Error("Failed to save memory");
    }

    console.log("Auto-saved to dashboard:", memory);
  } catch (error) {
    console.error("Auto-save failed:", error);
  }
});