
/**
 * Highlights the parent element of the given element.
 * @param {HTMLElement} element The current element.
 */
function highlightParentHandler(element) {
    console.log("highlightParentHandler called", element);
    if (element && element.parentElement) {
        console.log("Parent element found:", element.parentElement);
        addHighlight(element.parentElement);
        selectElement(element.parentElement);
    } else {
        console.log("No parent element found.");
    }
}

/**
 * Initiates a download of the content of the given element.
 * @param {HTMLElement} element The element containing the content.
 */
function downloadContentHandler(element) {
    console.log("downloadContentHandler called", element);
    if (element) {
        const divText = element.innerText || element.textContent;
        console.log("Initiating download for content:", divText);
        downloadText(divText);
    }
}

/**
 * De-selects the given element.
 * @param {HTMLElement} element The selected element.
 */
function deselectHandler(element) {
    console.log("deselectHandler called", element);
    if (element) {
        console.log("Removing 'selected-div' class from element:", element);
        element.classList.remove('selected-div');
        hideSelectionOptions();
    }
}

/**
 * Downloads the given text.
 * @param {string} text The text to be downloaded.
 */
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

