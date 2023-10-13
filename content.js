
let shouldHighlight = false;
let highlightedElement = null;

document.addEventListener('mouseover', (e) => {
    if (shouldHighlight && e.target.tagName.toLowerCase() === 'div') {
        if (highlightedElement) {
            highlightedElement.style.outline = '';
        }
        highlightedElement = e.target;
        e.target.style.outline = '2px solid red';
    }
});

document.addEventListener('mouseout', (e) => {
    if (shouldHighlight && highlightedElement) {
        highlightedElement.style.outline = '';
    }
});

document.addEventListener('click', (e) => {
    if (shouldHighlight && e.target === highlightedElement) {
        const blob = new Blob([e.target.innerText], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        chrome.runtime.sendMessage({url: url});
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message === 'toggle') {
        shouldHighlight = !shouldHighlight;
    }
});
