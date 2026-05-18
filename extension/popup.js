const APP_URL = "https://internet-memory-phi.vercel.app";

const saveBtn = document.getElementById("saveBtn");
const pauseBtn = document.getElementById("pauseBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const pageTitle = document.getElementById("pageTitle");
const pageUrl = document.getElementById("pageUrl");
const trackingStatus = document.getElementById("trackingStatus");
const statusDot = document.getElementById("statusDot");

function updateTrackingUI(paused) {
  trackingStatus.textContent = paused ? "Paused" : "Active";
  pauseBtn.textContent = paused ? "Resume Tracking" : "Pause Tracking";

  if (paused) {
    statusDot.style.background = "#f59e0b";
  } else {
    statusDot.style.background = "#22c55e";
  }
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];

  pageTitle.textContent = tab?.title || "Untitled Page";
  pageUrl.textContent = tab?.url || "No URL found";
});

chrome.runtime.sendMessage(
  {
    type: "GET_TRACKING_STATUS",
  },
  (response) => {
    updateTrackingUI(response?.paused === true);
  }
);

saveBtn.addEventListener("click", () => {
  saveBtn.disabled = true;
  saveBtn.textContent = "Saving...";

  chrome.runtime.sendMessage(
    {
      type: "SAVE_CURRENT_TAB",
    },
    (response) => {
      if (response?.success) {
        saveBtn.textContent = "Saved to Dashboard";
      } else {
        saveBtn.textContent = "Save Failed";
      }

      setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.textContent = "Save Current Page";
      }, 2000);
    }
  );
});

pauseBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage(
    {
      type: "GET_TRACKING_STATUS",
    },
    (statusResponse) => {
      const nextPaused = !(statusResponse?.paused === true);

      chrome.runtime.sendMessage(
        {
          type: "SET_TRACKING_PAUSED",
          paused: nextPaused,
        },
        (response) => {
          updateTrackingUI(response?.paused === true);
        }
      );
    }
  );
});

dashboardBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: `${APP_URL}/dashboard`,
  });
});