document.getElementById('downloadText').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let tab = tabs[0];
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            functionToInject: function() {
                let text = '';
                const el = document.querySelector('div[style*="outline: 2px solid red"]');
                if(el) {
                    text = el.innerText || el.textContent;
                }
                return text;
            },
            args: []
        }, function(result) {
            if(chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            const blob = new Blob([result[0].result], {type: 'text/plain'});
            const url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: 'selectedText.txt'
            });
        });
    });
});
