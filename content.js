let selectedElement;

// Listen for runtime messages
chrome.runtime.onMessage.addListener((message) => {
    switch(message.type) {
        case 'toggleUpdate':
            handleToggleUpdate(message.isToggled);
            break;
    }
});

// Key listener for toggling
document.addEventListener('keydown', (event) => {
    if (event.key === 't') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName &&
            !['input', 'textarea'].includes(activeElement.tagName.toLowerCase())) {
            chrome.runtime.sendMessage({ type: 'requestToggle' });
        }
    }
});

document.addEventListener('mouseover', (event) => {
    if (event.target.tagName && event.target.tagName.toLowerCase() === 'div') {
        event.target.classList.add('highlighted');
    }
});

document.addEventListener('mouseout', (event) => {
    if (event.target.tagName && event.target.tagName.toLowerCase() === 'div' && event.target !== selectedElement) {
        event.target.classList.remove('highlighted');
    }
});

document.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;
    if (event.target.classList.contains('highlighted')) {
        selectElement(event.target);
    }
});

function handleToggleUpdate(isToggled) {
    if (!isToggled && selectedElement) {
        deselectElement();
    }
}

function selectElement(element) {
    if (selectedElement) {
        deselectElement();
    }
    selectedElement = element;
    selectedElement.style.outline = '4px dashed blue';
    displaySelectionOptions(element);
}

function deselectElement() {
    if (selectedElement) {
        selectedElement.style.outline = '';
        selectedElement.classList.remove('highlighted');
        hideSelectionOptions();
    }
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
            if (selectedElement && selectedElement.parentElement) {
                selectedElement.parentElement.classList.add('highlighted');
                selectElement(selectedElement.parentElement);
            }
        };
        optionsDiv.appendChild(highlightParentButton);

        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Download Content';
        downloadButton.onclick = () => {
            if (selectedElement) {
                const divText = selectedElement.innerText || selectedElement.textContent;
                downloadText(divText);
            }
        };
        optionsDiv.appendChild(downloadButton);

        const deselectButton = document.createElement('button');
        deselectButton.innerText = 'Deselect';
        deselectButton.onclick = deselectElement;
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
