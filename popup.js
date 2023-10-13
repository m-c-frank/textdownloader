document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded for popup.js");

    document.getElementById('toggle').addEventListener('click', function() {
        console.log("Toggle button clicked in popup.js");

        chrome.storage.local.get(['isToggled'], function(result) {
            const newState = !result.isToggled;
            console.log("Setting toggled state to:", newState);
            chrome.storage.local.set({isToggled: newState});
            chrome.runtime.sendMessage('toggle');
        });
    });
});
