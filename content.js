let highlightedElement = null;  // Currently highlighted element
let isHighlightMode = false;    // Tracks whether the highlight mode is active

/**
 * Event listener for keydown. Clears highlights and selections when ESC is pressed.
 */
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {  // ESC key code
        // Remove any current highlights
        if (highlightedElement) {
            removeHighlight(highlightedElement);
        }

        // Deselect any selected div
        const selectedDivs = document.querySelectorAll('.selected-div');
        selectedDivs.forEach(div => div.classList.remove('selected-div'));

        // Hide any open selection options
        hideSelectionOptions();
        
        // Reset highlight mode and user select properties
        isHighlightMode = false;
        document.body.style.userSelect = "";
    }
});

/**
 * Event listener for keydown. Activates highlight mode when Shift+T is pressed.
 */
document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        isHighlightMode = true;
        document.body.style.userSelect = "none";  // Prevent text selection while highlighting
    }
});

/**
 * Event listener for keyup. Deactivates highlight mode when Shift+T is released.
 */
document.addEventListener('keyup', function(event) {
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        isHighlightMode = false;
        document.body.style.userSelect = "";  // Allow text selection again
    }
});

/**
 * Event listener for mouseover. Highlights a div when the mouse hovers over it during highlight mode.
 */
document.addEventListener('mouseover', handleMouseOver);

/**
 * Event listener for mouseout. Removes highlight from a div when the mouse moves away during highlight mode.
 */
document.addEventListener('mouseout', handleMouseOut);

/**
 * Highlights the target div element on mouseover.
 * @param {Event} event The mouseover event.
 */
function handleMouseOver(event) {
    if (isHighlightMode && event.target && event.target.tagName && 
        event.target.tagName.toLowerCase() === 'div') {
        addHighlight(event.target);
    }
}

/**
 * Removes the highlight from the target div element on mouseout.
 * @param {Event} event The mouseout event.
 */
function handleMouseOut(event) {
    if (isHighlightMode && event.target && event.target.tagName && 
        event.target.tagName.toLowerCase() === 'div') {
        removeHighlight(event.target);
    }
}

/**
 * Event listener for mousedown. Selects a highlighted div when it's clicked.
 */
document.addEventListener('mousedown', (event) => {
    if (isHighlightMode && highlightedElement) {
        selectElement(highlightedElement);
    }
});

/**
 * Adds a highlight to the specified div element.
 * @param {HTMLElement} element The div element to be highlighted.
 */
function addHighlight(element) {
    if (highlightedElement) {
        removeHighlight(highlightedElement);
    }
    highlightedElement = element;
    element.classList.add('highlighted-div');
}

/**
 * Removes the highlight from the specified div element.
 * @param {HTMLElement} element The div element from which the highlight should be removed.
 */
function removeHighlight(element) {
    if (element) {
        element.classList.remove('highlighted-div');
    }
    highlightedElement = null;  // Reset the highlighted element reference
}

/**
 * Marks the specified div element as selected and displays selection options.
 * @param {HTMLElement} element The div element to be selected.
 */
function selectElement(element) {
    if (highlightedElement) {
        removeHighlight(highlightedElement);
    }
    element.classList.add('selected-div');
    displaySelectionOptions(element);
}

/**
 * Displays the selection options for the user when an element is selected.
 * @param {HTMLElement} element The selected element.
 */
function displaySelectionOptions(element) {
    const optionsDiv = getOptionsDiv();
    optionsDiv.style.display = 'block';
    document.body.appendChild(optionsDiv);
    console.log("Selection options displayed.");
}

/**
 * Retrieves or creates the div that contains the selection options.
 * @returns {HTMLElement} The div containing the selection options.
 */
function getOptionsDiv() {
    let optionsDiv = document.getElementById('selectionOptions');
    if (!optionsDiv) {
        optionsDiv = createOptionsDiv();
    } else {
        optionsDiv.style.display = 'block';
    }
    return optionsDiv;
}

/**
 * Creates a div containing the selection options.
 * @returns {HTMLElement} The newly created div containing the selection options.
 */
function createOptionsDiv() {
    const optionsDiv = document.createElement('div');
    optionsDiv.id = 'selectionOptions';
    optionsDiv.style.position = 'fixed';
    optionsDiv.style.top = '10px';
    optionsDiv.style.right = '10px';
    optionsDiv.style.background = '#f5f5f5';
    optionsDiv.style.padding = '10px';
    optionsDiv.style.zIndex = '99999';
    optionsDiv.style.borderRadius = '8px';
    optionsDiv.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.2)';

    // Create the "Highlight Parent" button
    const highlightParentButton = createButton('icons/folder.svg', 'Highlight Parent', () => highlightParentHandler(highlightedElement));
    optionsDiv.appendChild(highlightParentButton);

    // Create the "Download Content" button
    const downloadButton = createButton('icons/download.svg', 'Download Content', () => downloadContentHandler(highlightedElement));
    optionsDiv.appendChild(downloadButton);

    // Create the "Deselect" button
    const deselectButton = createButton('icons/close.svg', 'Deselect', () => deselectHandler(highlightedElement));
    optionsDiv.appendChild(deselectButton);

    return optionsDiv;
}

/**
 * Creates a button with an associated icon and text.
 * @param {string} iconPath The relative path to the icon for the button.
 * @param {string} text The text to display on the button.
 * @param {Function} onClick The function to be executed when the button is clicked.
 * @returns {HTMLButtonElement} The newly created button.
 */
function createButton(iconPath, text, onClick) {
    const fullIconPath = chrome.runtime.getURL(iconPath);
    const btn = document.createElement('button');
    btn.innerHTML = `<img src="${fullIconPath}" alt="${text}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">${text}`;
    
    btn.onclick = function() {
        console.log(`Button "${text}" clicked.`);
        onClick();
    };

    console.log(`Button "${text}" created.`);
    return btn;
}

/**
 * Hides the div containing the selection options.
 */
function hideSelectionOptions() {
    const optionsDiv = document.getElementById('selectionOptions');
    if (optionsDiv) {
        optionsDiv.style.display = 'none';
    }
}
