
document.getElementById('toggle').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: toggleHighlight,
        });
    });
});

function toggleHighlight() {
    chrome.runtime.sendMessage('toggle');
}
