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
            chrome.storage.local.get(['defaultLocation', 'isToggled'], data => {
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
                    // Send the toggle message to the content script
                    chrome.runtime.sendMessage('toggleHighlight');
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
