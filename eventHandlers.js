const State = {
    INITIAL: 'initial',
    SELECTION: 'selection',
    NORMAL: 'normal',
};

let currentState = State.INITIAL;

function handleKeyDown(event) {
    log("handleKeyDown triggered", event);
    if (event.keyCode === 27) {  // ESC key
        const highlightedElement = getHighlightedElement();
        if (highlightedElement) {
            log("Removing highlight in handleKeyDown");
            removeHighlight(highlightedElement);
        }
        const selectedDivs = document.querySelectorAll('.selected-div');
        selectedDivs.forEach(div => div.classList.remove('selected-div'));
        hideSelectionOptions();
        isHighlightMode = false;
        document.body.style.userSelect = "";
        currentState = State.NORMAL;  // Return to NORMAL state after ESC key
    }

    if (event.shiftKey && event.key.toLowerCase() === 't' && currentState !== State.SELECTION) {
        isHighlightMode = true;
        document.body.style.userSelect = "none";
    }
}

function handleKeyUp(event) {
    log("handleKeyUp triggered", event);
    if (!event.shiftKey || event.key.toLowerCase() === 't') {
        isHighlightMode = false;
        document.body.style.userSelect = "";
        deselectAll();
    }
}

function deselectAll() {
    const highlightedElement = getHighlightedElement();
    if (highlightedElement) {
        removeHighlight(highlightedElement);
    }
    const selectedDivs = document.querySelectorAll('.selected-div');
    selectedDivs.forEach(div => div.classList.remove('selected-div'));
    hideSelectionOptions();
    currentState = State.NORMAL;
}

function handleMouseOver(event) {
    log("handleMouseOver triggered", event.target);
    if (isHighlightMode && currentState !== State.SELECTION && event.target && event.target.tagName &&
        event.target.tagName.toLowerCase() === 'div') {
        addHighlight(event.target);
    }
}

function handleMouseOut(event) {
    log("handleMouseOut triggered", event.target);
    if (isHighlightMode && currentState !== State.SELECTION && event.target && event.target.tagName &&
        event.target.tagName.toLowerCase() === 'div') {
        removeHighlight(event.target);
    }
}

function handleMouseDown(event) {
    log("handleMouseDown triggered", event);
    const highlightedElement = getHighlightedElement();
    if (isHighlightMode && currentState !== State.SELECTION && highlightedElement) {
        selectElement(highlightedElement);
        currentState = State.SELECTION;  // Move to SELECTION state
    }
}

function addHighlight(element) {
    log("Adding highlight to element", element);
    const uniqueId = Date.now().toString();
    element.setAttribute(HIGHLIGHT_DATA_ATTRIBUTE, uniqueId);
    currentHighlightId = uniqueId;
    element.classList.add('highlighted-div');
}

function removeHighlight(element) {
    log("Removing highlight from element", element);
    if (element.getAttribute(HIGHLIGHT_DATA_ATTRIBUTE) === currentHighlightId) {
        element.classList.remove('highlighted-div');
        currentHighlightId = null;
    }
}

function getHighlightedElement() {
    const element = document.querySelector(`[${HIGHLIGHT_DATA_ATTRIBUTE}="${currentHighlightId}"]`);
    log("Fetching highlighted element", element);
    return element;
}

function selectElement(element) {
    log("Selecting element", element);
    removeHighlight(element);
    element.classList.add('selected-div');
    displaySelectionOptions();
}

function deselectHandler() {
    const highlightedElement = getHighlightedElement();
    if (highlightedElement) {
        highlightedElement.classList.remove('selected-div');
        hideSelectionOptions();
        currentState = State.NORMAL; // Return to NORMAL state
    }
}

function log(...args) {
    if (isHighlightMode) {
        console.debug(...args);
    }
}
