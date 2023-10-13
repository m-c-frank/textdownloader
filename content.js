
let highlightedElement = null;

document.addEventListener('mouseover', function(event) {
    if (highlightedElement) {
        highlightedElement.style.outline = '';
    }
    if (event.target.tagName.toLowerCase() === 'div') {
        highlightedElement = event.target;
        event.target.style.outline = '2px solid red';
    }
});

document.addEventListener('click', function(event) {
    if (event.target === highlightedElement && event.target.style.outline === '2px solid red') {
        const textToDownload = event.target.innerText || event.target.textContent;
        chrome.runtime.sendMessage({action: "download", data: textToDownload});
    }
});
