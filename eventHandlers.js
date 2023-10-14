function log(...messages) {
    if (currentState === State.HIGHLIGHTING || currentState === State.SELECTION_ACTIVE) {
        console.debug(...messages);
    }
}

function handleKeyDown(event) {
    log("handleKeyDown triggered", event);
    if (event.keyCode === 27) {  // ESC key
        deselectAll();
    }

    if (event.shiftKey && event.key.toLowerCase() === 't' && currentState === State.NORMAL) {
        isHighlightMode = true;
        currentState = State.HIGHLIGHTING;
        document.body.style.userSelect = "none";
    }
}

function handleKeyUp(event) {
    log("handleKeyUp triggered", event);
    
    // If in INTERACTION state, do not proceed with further checks, just return.
    if (currentState === State.INTERACTION) return;

    if (!event.shiftKey || event.key.toLowerCase() === 't') {
        isHighlightMode = false;
        document.body.style.userSelect = "";
        if (currentState !== State.SELECTION_ACTIVE) {
            deselectAll();
        }
    }
}


function handleMouseOver(event) {
    log("handleMouseOver triggered", event.target);
    if (currentState !== State.INTERACTION && isHighlightMode && event.target && event.target.tagName && event.target.tagName.toLowerCase() === 'div') {
        addHighlight(event.target);
    }
}

function handleMouseOut(event) {
    log("handleMouseOut triggered", event.target);
    if (currentState !== State.INTERACTION && isHighlightMode && event.target && event.target.tagName && event.target.tagName.toLowerCase() === 'div') {
        removeHighlight(event.target);
    }
}

function handleMouseDown(event) {
    log("handleMouseDown triggered", event);
    if (currentState === State.INTERACTION) return;  // Do nothing if in INTERACTION state

    const highlightedElement = getHighlightedElement();
    if (isHighlightMode && highlightedElement) {
        selectElement(highlightedElement);
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
    isHighlightMode = false;  // Deactivate highlighting mode
    element.classList.add('selected-div');
    displaySelectionOptions();
    currentState = State.INTERACTION;
}



function deselectAll() {
    log("Deselecting all elements");
    const highlightedElement = getHighlightedElement();
    if (highlightedElement) {
        highlightedElement.classList.remove('highlighted-div');
    }
    const selectedDivs = document.querySelectorAll('.selected-div');
    selectedDivs.forEach(div => div.classList.remove('selected-div'));
    hideSelectionOptions();
    currentState = State.NORMAL;
}