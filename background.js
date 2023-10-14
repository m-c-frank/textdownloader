let isToggled = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'requestToggle') {
        isToggled = !isToggled;
        // Notify content script of the updated state
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'toggleUpdate', isToggled: isToggled });
        });
    }
});
