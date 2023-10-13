document.getElementById('downloadText').addEventListener('click', function() {
    chrome.tabs.executeScript({
        code: `
            let text = '';
            const el = document.querySelector('div[style*="outline: 2px solid red"]');
            if(el) {
                text = el.innerText || el.textContent;
            }
            text;
        `
    }, function(selection) {
        const blob = new Blob([selection[0]], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: 'selectedText.txt'
        });
    });
});
