document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded for popup.js");

    document.getElementById('toggle').addEventListener('click', () => {
        console.log("Toggle button clicked in popup.js");

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: toggleHighlight,
            });
        });
    });
});

function toggleHighlight() {
    console.log("toggleHighlight function called in popup.js");
    chrome.runtime.sendMessage('toggle');
}
