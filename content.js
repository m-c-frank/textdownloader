
let isHighlighting = false;
let highlightedElement = null;

function handleMouseover(event) {
    if (!isHighlighting) return;
    if (highlightedElement) {
        highlightedElement.style.outline = '';
    }
    if (event.target.tagName.toLowerCase() === 'div') {
        highlightedElement = event.target;
        event.target.style.outline = '2px solid red';
    }
}

function handleClick(event) {
    if (event.target === highlightedElement && event.target.style.outline === '2px solid red') {
        const textToDownload = event.target.innerText || event.target.textContent;
        chrome.runtime.sendMessage({action: "download", data: textToDownload});
    }
}

document.addEventListener('mouseover', handleMouseover);
document.addEventListener('click', handleClick);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleHighlight') {
        isHighlighting = !isHighlighting;
        if (!isHighlighting && highlightedElement) {
            highlightedElement.style.outline = '';
        }
    }
});
