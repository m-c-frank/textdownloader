
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'download') {
        const textToDownload = request.data;
        const fileName = `${Date.now()}.txt`;

        chrome.downloads.download({
            url: URL.createObjectURL(new Blob([textToDownload], {type: 'text/plain'})),
            filename: fileName,
            saveAs: true
        });
    }
});
