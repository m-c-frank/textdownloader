
chrome.runtime.onMessage.addListener((message) => {
    if (message.url) {
        chrome.downloads.download({
            url: message.url,
            filename: 'downloadedText.txt'
        });
    }
});
