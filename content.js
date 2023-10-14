let highlightedElement = null;  // Currently highlighted element
let isHighlightMode = false;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {  // ESC key code
        clearSelections();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        isHighlightMode = true;
        document.body.style.userSelect = "none";
    }
});

document.addEventListener('keyup', function(event) {
    if (event.shiftKey && event.key.toLowerCase() === 't') {
        isHighlightMode = false;
        document.body.style.userSelect = "";
    }
});

document.addEventListener('mouseover', handleMouseOver);
document.addEventListener('mouseout', handleMouseOut);

function handleMouseOver(event) {
    if (isHighlightMode && isValidTarget(event.target)) {
        addHighlight(event.target);
    }
}

function handleMouseOut(event) {
    if (isHighlightMode && isValidTarget(event.target)) {
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
    element.classList.remove('highlighted-div');
    highlightedElement = null;
}

function selectElement(element) {
    removeHighlight(element);
    element.classList.add('selected-div');
    displaySelectionOptions(element);
}

function displaySelectionOptions(element) {
    let optionsDiv = getOptionsDiv();
    optionsDiv.style.display = 'block';
}

function getOptionsDiv() {
    let optionsDiv = document.getElementById('selectionOptions');
    if (!optionsDiv) {
        optionsDiv = createOptionsDiv();
    }
    return optionsDiv;
}

function createOptionsDiv() {
    let optionsDiv = document.createElement('div');
    optionsDiv.id = 'selectionOptions';
    styleOptionsDiv(optionsDiv);

    const highlightParentButton = createButton('icons/folder.svg', 'Highlight Parent', () => {
        if (highlightedElement && highlightedElement.parentElement) {
            selectElement(highlightedElement.parentElement);
        }
    });
    optionsDiv.appendChild(highlightParentButton);

    const downloadButton = createButton('icons/download.svg', 'Download Content', () => {
        if (highlightedElement) {
            const content = highlightedElement.innerText || highlightedElement.textContent;
            downloadText(content);
        }
    });
    optionsDiv.appendChild(downloadButton);

    const deselectButton = createButton('icons/close.svg', 'Deselect', () => {
        if (highlightedElement) {
            highlightedElement.classList.remove('selected-div');
            optionsDiv.style.display = 'none';
        }
    });
    optionsDiv.appendChild(deselectButton);

    document.body.appendChild(optionsDiv);
    return optionsDiv;
}

function createButton(iconPath, text, onClick) {
    const resolvedIconPath = chrome.runtime.getURL(iconPath);
    const btn = document.createElement('button');
    btn.innerHTML = `<img src="${resolvedIconPath}" alt="${text}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">${text}`;
    btn.onclick = onClick;
    return btn;
}


function styleOptionsDiv(div) {
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.background = '#f5f5f5';
    div.style.padding = '10px';
    div.style.zIndex = '99999';
    div.style.display = 'none';
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

function clearSelections() {
    if (highlightedElement) {
        removeHighlight(highlightedElement);
    }
    const selectedDivs = document.querySelectorAll('.selected-div');
    selectedDivs.forEach(div => div.classList.remove('selected-div'));
    const optionsDiv = getOptionsDiv();
    optionsDiv.style.display = 'none';
}

function isValidTarget(target) {
    return target && target.tagName && target.tagName.toLowerCase() === 'div';
}
