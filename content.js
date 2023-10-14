let highlightedElement = null;  // Currently highlighted element
let isHighlightMode = false;

document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        console.debug("[DEBUG] Shift+T pressed");
        isHighlightMode = true;
        document.body.style.userSelect = "none";
    }
});

document.addEventListener('keyup', function(event) {
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        console.debug("[DEBUG] Shift+T released");
        isHighlightMode = false;
        document.body.style.userSelect = "";
    }
});

document.addEventListener('mouseover', handleMouseOver);
document.addEventListener('mouseout', handleMouseOut);

function handleMouseOver(event) {
    if (isHighlightMode && event.target && event.target.tagName && 
        event.target.tagName.toLowerCase() === 'div') {
        addHighlight(event.target);
    }
}

function handleMouseOut(event) {
    if (isHighlightMode && event.target && event.target.tagName && 
        event.target.tagName.toLowerCase() === 'div') {
        removeHighlight(event.target);
    }
}

document.addEventListener('mousedown', (event) => {
    if (isHighlightMode && highlightedElement) {
        selectElement(highlightedElement);
    }
});

function addHighlight(element) {
    if (highlightedElement) {
        removeHighlight(highlightedElement);
    }
    highlightedElement = element;
    element.classList.add('highlighted-div');
}

function removeHighlight(element) {
    if (element) {
        element.classList.remove('highlighted-div');
    }
    highlightedElement = null;  // Reset the highlighted element when removing the highlight
}

function selectElement(element) {
    if (highlightedElement) {
        removeHighlight(highlightedElement);
    }
    element.classList.add('selected-div');
    displaySelectionOptions(element);
}

function displaySelectionOptions(element) {
    let optionsDiv = document.getElementById('selectionOptions');
    if (!optionsDiv) {
        optionsDiv = document.createElement('div');
        optionsDiv.id = 'selectionOptions';
        optionsDiv.style.position = 'fixed';
        optionsDiv.style.top = '10px';
        optionsDiv.style.right = '10px';
        optionsDiv.style.background = '#f5f5f5';
        optionsDiv.style.padding = '10px';
        optionsDiv.style.zIndex = '99999';
        document.body.appendChild(optionsDiv);
        
        const highlightParentButton = document.createElement('button');
        highlightParentButton.innerText = 'Highlight Parent';
        highlightParentButton.onclick = () => {
            if (element && element.parentElement) {
                addHighlight(element.parentElement);
                selectElement(element.parentElement);
            }
        };
        optionsDiv.appendChild(highlightParentButton);

        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Download Content';
        downloadButton.onclick = () => {
            if (element) {
                const divText = element.innerText || element.textContent;
                downloadText(divText);
            }
        };
        optionsDiv.appendChild(downloadButton);

        const deselectButton = document.createElement('button');
        deselectButton.innerText = 'Deselect';
        deselectButton.onclick = () => {
            element.classList.remove('selected-div');
            hideSelectionOptions();
        };
        optionsDiv.appendChild(deselectButton);
    } else {
        optionsDiv.style.display = 'block';
    }
}

function hideSelectionOptions() {
    const optionsDiv = document.getElementById('selectionOptions');
    if (optionsDiv) {
        optionsDiv.style.display = 'none';
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
