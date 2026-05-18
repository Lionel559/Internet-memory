chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];

  document.getElementById("pageTitle").textContent =
    tab.title || "Untitled Page";

  document.getElementById("pageUrl").textContent = tab.url || "No URL found";
});

const saveBtn = document.getElementById("saveBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

saveBtn.addEventListener("click", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];

    const memory = {
  title: tab.title,
  url: tab.url,
  favicon: tab.favIconUrl || "",
  savedAt: new Date().toISOString(),
};

    chrome.storage.local.get(["memories"], async (result) => {
      const memories = result.memories || [];

      memories.unshift(memory);

      chrome.storage.local.set({ memories }, async () => {
        document.getElementById("memoryCount").textContent = memories.length;

        try {
          await fetch("http://localhost:3000/api/memories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(memory),
          });

          saveBtn.textContent = "Saved to Dashboard";
        } catch (error) {
          saveBtn.textContent = "Saved Locally";
        }

        setTimeout(() => {
          saveBtn.textContent = "Save Current Page";
        }, 2000);
      });
    });
  });
});

dashboardBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: "http://localhost:3000/dashboard",
  });
});

chrome.storage.local.get(["memories"], (result) => {
  const memories = result.memories || [];

  document.getElementById("memoryCount").textContent = memories.length;
});