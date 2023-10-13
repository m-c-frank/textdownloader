let highlighting = false;

chrome.runtime.onMessage.addListener(function(message) {
    console.log("Message received in content.js:", message);

    if (message === 'toggle') {
        chrome.storage.local.get(['isToggled'], function(result) {
            highlighting = result.isToggled;
            console.log("Highlighting state set to:", highlighting);
        });
    }
});

document.addEventListener('mouseover', function(e) {
    if (highlighting) {
        e.target.style.border = "2px solid red";
        console.log("Mouse over:", e.target);
    }
});

document.addEventListener('mouseout', function(e) {
    if (highlighting) {
        e.target.style.border = "";
        console.log("Mouse out:", e.target);
    }
});

document.addEventListener('click', function(e) {
    if (highlighting) {
        console.log("Click detected on:", e.target);
        let text = e.target.innerText || e.target.textContent;
        let filename = `${Date.now()}_${document.title.replace(/[\/:*?"<>|]/g, '_')}.txt`;
        let blob = new Blob([text], {type: 'text/plain'});

        let url = URL.createObjectURL(blob);
        chrome.runtime.sendMessage({content: url, filename: filename});

        e.preventDefault();
        e.stopPropagation();
    }
});
