function handleKeyDown(event) {
    if (event.keyCode === 27) {  // ESC key
        if (highlightedElement) {
            removeHighlight();
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
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        isHighlightMode = false;
        document.body.style.userSelect = "";
    }
}

function handleMouseOver(event) {
    if (isHighlightMode && event.target && event.target.tagName &&
        event.target.tagName.toLowerCase() === 'div') {
        highlightedElement = event.target;
        addHighlight();
    }
}

function handleMouseOut(event) {
    if (isHighlightMode && event.target && event.target.tagName &&
        event.target.tagName.toLowerCase() === 'div') {
        removeHighlight();
    }
}

function handleMouseDown(event) {
    if (isHighlightMode && highlightedElement) {
        selectElement();
    }
}

function addHighlight() {
    if (highlightedElement) {
        highlightedElement.classList.add('highlighted-div');
    }
}


function removeHighlight() {
    if (highlightedElement) {
        highlightedElement.classList.remove('highlighted-div');
        highlightedElement = null;
    }
}

function selectElement() {
    if (highlightedElement) {
        let tempElement = highlightedElement;  // Store the highlightedElement in a temporary variable.
        removeHighlight();
        tempElement.classList.add('selected-div');  // Use the temporary variable here.
        displaySelectionOptions();
    }
}


function displaySelectionOptions() {
    const optionsDiv = getOptionsDiv();
    optionsDiv.style.display = 'block';
    document.body.appendChild(optionsDiv);
}

function getOptionsDiv() {
    let optionsDiv = document.getElementById('selectionOptions');
    if (!optionsDiv) {
        optionsDiv = createOptionsDiv();
    } else {
        optionsDiv.style.display = 'block';
    }
    return optionsDiv;
}

function hideSelectionOptions() {
    const optionsDiv = document.getElementById('selectionOptions');
    if (optionsDiv) {
        optionsDiv.style.display = 'none';
    }
}

