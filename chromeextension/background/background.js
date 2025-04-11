const API_URL = "http://127.0.0.1:5000";  // Your Flask API

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url) {
        try {
            const response = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: tab.url })
            });

            const data = await response.json();

            if (data.prediction.includes("Unsafe")) {
                chrome.tabs.update(tabId, { url: chrome.runtime.getURL("warning.html") });
            }
        } catch (error) {
            console.error("Error contacting API:", error);
        }
    }
});
