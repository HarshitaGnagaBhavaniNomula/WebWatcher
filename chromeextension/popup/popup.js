document.addEventListener("DOMContentLoaded", function () {
    let urlElement = document.getElementById("current-url");
    let checkButton = document.getElementById("check-url");
    let resultElement = document.getElementById("result");

    // Get the current tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentUrl = tabs[0].url;
        urlElement.innerText = `URL: ${currentUrl}`;

        checkButton.addEventListener("click", function () {
            fetch("http://127.0.0.1:5000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: currentUrl })
            })
            .then(response => response.json())
            .then(data => {
                if (data.prediction) {
                    resultElement.innerText = data.prediction; // Dynamically display result
                } else if (data.error) {
                    resultElement.innerText = `Error: ${data.error}`;
                } else {
                    resultElement.innerText = "Unexpected response from server.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                resultElement.innerText = "Error while processing request.";
            });
        });
    });
});


