let isToggled = false;
let highlightedElement;

function init() {
    // Listen to messages from the popup to toggle the state
    chrome.runtime.onMessage.addListener((message) => {
        if (message === 'toggle') {
            isToggled = !isToggled;
            console.log("Toggled State via popup:", isToggled);
            if (!isToggled && highlightedElement) {
                removeHighlight(highlightedElement);
            }
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 't') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName && 
            (activeElement.tagName.toLowerCase() !== 'input' && 
             activeElement.tagName.toLowerCase() !== 'textarea')) {
            isToggled = !isToggled;
            console.log("Toggled State via keypress:", isToggled);
        }
    }
});

document.addEventListener('mouseover', (event) => {
    if (isToggled && event.target && event.target.tagName && 
        event.target.tagName.toLowerCase() === 'div') {
        console.log("Mouse entered a div. Adding highlight to:", event.target);
        addHighlight(event.target);
    }
});

document.addEventListener('mouseout', (event) => {
    if (event.target && event.target.tagName && 
        event.target.tagName.toLowerCase() === 'div') {
        console.log("Mouse left a div. Removing highlight from:", event.target);
        removeHighlight(event.target);
    }
});

document.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;
    console.log("Clicked on an element:", event.target);
    if (event.target.tagName && event.target.tagName.toLowerCase() === 'div') {
        console.log("Clicked on a div.");
        if (isToggled) {
            console.log("Clicked on a highlighted div.");
            const divText = event.target.innerText || event.target.textContent;
            downloadText(divText);
        }
    }
});

function addHighlight(element) {
    if (highlightedElement) {
        removeHighlight(highlightedElement);
    }
    highlightedElement = element;
    element.style.outline = '2px solid red';
    console.log("Highlighted element:", element);
}

function removeHighlight(element) {
    if (element) {
        element.style.outline = '';
        console.log("Removed highlight from element:", element);
    }
}

function downloadText(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// Initialize the state and listeners
init();
