chrome.runtime.onMessage.addListener(function(message) {
    console.log("Message received in background.js:", message);

    if (message && message.content && message.filename) {
        chrome.downloads.download({
            url: message.content,
            filename: message.filename,
            saveAs: true
        });
    }
});
