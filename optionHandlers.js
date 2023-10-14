
function displaySelectionOptions() {
    const optionsDiv = getOptionsDiv();
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

    const highlightParentButton = createButton('icons/folder.svg', 'Highlight Parent', highlightParentHandler);
    optionsDiv.appendChild(highlightParentButton);

    const downloadButton = createButton('icons/download.svg', 'Download Content', downloadContentHandler);
    optionsDiv.appendChild(downloadButton);

    const deselectButton = createButton('icons/close.svg', 'Deselect', deselectHandler);
    optionsDiv.appendChild(deselectButton);

    return optionsDiv;
}

function createButton(iconPath, text, onClick) {
    const fullIconPath = chrome.runtime.getURL(iconPath);
    const btn = document.createElement('button');
    btn.innerHTML = `<img src="${fullIconPath}" alt="${text}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">${text}`;
    btn.onclick = onClick;
    return btn;
}

function hideSelectionOptions() {
    const optionsDiv = document.getElementById('selectionOptions');
    if (optionsDiv) {
        optionsDiv.style.display = 'none';
    }
}

function highlightParentHandler() {
    const highlightedElement = getHighlightedElement();
    if (highlightedElement && highlightedElement.parentElement) {
        addHighlight(highlightedElement.parentElement);
        selectElement(highlightedElement.parentElement);
    }
}

function downloadContentHandler() {
    const highlightedElement = getHighlightedElement();
    if (highlightedElement) {
        const divText = highlightedElement.innerText || highlightedElement.textContent;
        downloadText(divText);
    }
}

function deselectHandler() {
    const highlightedElement = getHighlightedElement();
    if (highlightedElement) {
        highlightedElement.classList.remove('selected-div');
        hideSelectionOptions();
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
