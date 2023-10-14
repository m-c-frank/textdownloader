document.addEventListener('DOMContentLoaded', function() {
    const UIController = {
        elements: {
            locationInput: document.getElementById('location'),
            saveButton: document.getElementById('save')
        },

        updateLocationInput(value) {
            this.elements.locationInput.value = value || '';
        },

        initialize() {
            // Get initial states from storage
            chrome.storage.sync.get(['defaultLocation'], data => {
                this.updateLocationInput(data.defaultLocation);
            });
        }
    };

    const EventHandlers = {
        handleSaveClick() {
            const location = UIController.elements.locationInput.value;
            chrome.storage.sync.set({ defaultLocation: location }, () => {
                console.log('Default download location saved:', location);
            });
        }
    };

    // Event Listener Bindings
    UIController.elements.saveButton.addEventListener('click', EventHandlers.handleSaveClick);

    // Initialize UI state
    UIController.initialize();
});
