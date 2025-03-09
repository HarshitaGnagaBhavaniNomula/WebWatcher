chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "get_url") {
        console.log("Captured URL:", message.url);
    }
});
