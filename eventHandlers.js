function handleKeyDown(event) {
    console.debug("handleKeyDown triggered", event);
    if (event.keyCode === 27) {  // ESC key
        const highlightedElement = getHighlightedElement();
        if (highlightedElement) {
            console.debug("Removing highlight in handleKeyDown");
            removeHighlight(highlightedElement);
        }
        const selectedDivs = document.querySelectorAll('.selected-div');
        selectedDivs.forEach(div => div.classList.remove('selected-div'));
        hideSelectionOptions();
        isHighlightMode = false;
        document.body.style.userSelect = "";
    }

    if (event.shiftKey && event.key.toLowerCase() === 't') {
        isHighlightMode = true;
        document.body.style.userSelect = "none";
    }
}

function handleKeyUp(event) {
    console.debug("handleKeyUp triggered", event);
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        isHighlightMode = false;
        document.body.style.userSelect = "";
    }
}

function handleMouseOver(event) {
    console.debug("handleMouseOver triggered", event.target);
    if (isHighlightMode && event.target && event.target.tagName &&
        event.target.tagName.toLowerCase() === 'div') {
        addHighlight(event.target);
    }
}

function handleMouseOut(event) {
    console.debug("handleMouseOut triggered", event.target);
    if (isHighlightMode && event.target && event.target.tagName &&
        event.target.tagName.toLowerCase() === 'div') {
        removeHighlight(event.target);
    }
}

function handleMouseDown(event) {
    console.debug("handleMouseDown triggered", event);
    const highlightedElement = getHighlightedElement();
    if (isHighlightMode && highlightedElement) {
        selectElement(highlightedElement);
    }
}

function addHighlight(element) {
    console.debug("Adding highlight to element", element);
    const uniqueId = Date.now().toString();
    element.setAttribute(HIGHLIGHT_DATA_ATTRIBUTE, uniqueId);
    currentHighlightId = uniqueId;
    element.classList.add('highlighted-div');
}

function removeHighlight(element) {
    console.debug("Removing highlight from element", element);
    if (element.getAttribute(HIGHLIGHT_DATA_ATTRIBUTE) === currentHighlightId) {
        element.classList.remove('highlighted-div');
        currentHighlightId = null;
    }
}

function getHighlightedElement() {
    const element = document.querySelector(`[${HIGHLIGHT_DATA_ATTRIBUTE}="${currentHighlightId}"]`);
    console.debug("Fetching highlighted element", element);
    return element;
}

function selectElement(element) {
    console.debug("Selecting element", element);
    removeHighlight(element);
    element.classList.add('selected-div');
    displaySelectionOptions();
}

function displaySelectionOptions() {
    console.debug("Displaying selection options");
    const optionsDiv = getOptionsDiv();
    optionsDiv.style.display = 'block';
    document.body.appendChild(optionsDiv);
}
