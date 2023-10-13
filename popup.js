document.addEventListener('DOMContentLoaded', function() {
    const UIController = {
        elements: {
            toggleButton: document.getElementById('toggle'),
            locationInput: document.getElementById('location'),
            saveButton: document.getElementById('save')
        },

        updateToggleButtonText(isToggled) {
            this.elements.toggleButton.innerText = `Toggle Highlight (${isToggled ? 'ON' : 'OFF'})`;
        },

        updateLocationInput(value) {
            this.elements.locationInput.value = value || '';
        },

        initialize() {
            // Get initial states from storage
            chrome.storage.sync.get(['defaultLocation', 'isToggled'], data => {
                this.updateLocationInput(data.defaultLocation);
                const isToggled = data.isToggled || false;
                this.updateToggleButtonText(isToggled);
            });
        }
    };

    const EventHandlers = {
        handleToggleClick() {
            chrome.storage.local.get('isToggled', data => {
                const newState = !data.isToggled;
                chrome.storage.local.set({ isToggled: newState }, () => {
                    UIController.updateToggleButtonText(newState);
                    chrome.runtime.sendMessage('toggle');
                    
                    // Execute the toggleHighlight function in the content script
                    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                        chrome.scripting.executeScript({
                            target: { tabId: tabs[0].id },
                            function: toggleHighlight,  // assuming toggleHighlight function is present in content script
                        });
                    });
                });
            });
        },

        handleSaveClick() {
            const location = UIController.elements.locationInput.value;
            chrome.storage.sync.set({ defaultLocation: location }, () => {
                console.log('Default download location saved:', location);
            });
        }
    };

    // Event Listener Bindings
    UIController.elements.toggleButton.addEventListener('click', EventHandlers.handleToggleClick);
    UIController.elements.saveButton.addEventListener('click', EventHandlers.handleSaveClick);

    // Initialize UI state
    UIController.initialize();
});
