# textdownloader

textdownloader is a user-friendly browser extension designed to simplify the process of saving plain text from web pages to your personal knowledge database or notes. With the ability to quickly highlight and download interesting text content, this tool ensures that users can efficiently save web content for future reference.

## Features

- Easy-to-use text highlighting and selection.
- Activates with a simple keyboard shortcut (Shift + 'T').
- Offers streamlined interaction for parent highlighting, content downloading, and deselection.
- Compatible with popular web browsers like Google Chrome and Mozilla Firefox.

## Directory Structure

```bash
.
├── LICENCE.md           # License file for the project
├── README.md            # Project's README file
├── background.js        # Background script for the extension
├── content.js           # Content script handling page interactions
├── eventHandlers.js     # Event handlers for the extension
├── icons                # Directory containing icons for the extension
│   ├── LICENSE          # License for the icons
│   ├── close.svg        # Close icon SVG
│   ├── download.svg     # Download icon SVG
│   ├── folder.svg       # Folder icon SVG
│   ├── icon.svg         # Main icon SVG
│   ├── icon_128.png     # Icon (128x128 pixels)
│   ├── icon_16.png      # Icon (16x16 pixels)
│   └── icon_48.png      # Icon (48x48 pixels)
├── manifest.json        # Extension manifest file
├── optionHandlers.js    # Handlers for extension options
├── popup.html           # Popup UI for the extension
├── popup.js             # Logic for the popup UI
└── styles.css           # Styling for the extension UI
```

## Setup

1. Clone the repository:

    ```bash
    git clone [repository_url]
    cd textdownloader
    ```

2. Load the unpacked extension:
   - Open your browser and navigate to the extension management page (e.g., `chrome://extensions/` for Chrome or `about:addons` for Firefox).
   - Enable "Developer mode" by toggling the switch in the upper-right corner of the page.
   - Click the "Load unpacked" button and select the directory where you cloned the textdownloader repository.

## Usage

1. Open a web page in your browser.
2. Press Shift + 'T' to activate the highlight mode.
3. Hover over HTML `<div>` elements to highlight and click to select them.
4. Use the provided interface buttons to interact with highlighted elements.

## Related Tools
<!--START_TOKEN-->
**Note Utilities Ecosystem**: A suite of tools designed to streamline and enhance your note-taking and information processing workflows.

- **[dirbuilder](https://github.com/m-c-frank/dirbuilder)** - Builds a directory structure from `tree`
- **[workflowlibrary](https://github.com/m-c-frank/workflowlibrary)** - Centralizes and synchronizes the "Related Tools" section across the ecosystem.
- **[noteutilsyncer](https://github.com/m-c-frank/noteutilsyncer)** - A centralized tool that automates the synchronization of the "Related Tools" section across READMEs in the noteutils ecosystem.
- **[conceptsplitter](https://github.com/m-c-frank/conceptsplitter)** - Extract atomic concepts from a given text using the OpenAI API.
- **[textdownloader](https://github.com/m-c-frank/textdownloader)** - A browser extension to automatically generate text dumps for processing.
- **[contenttree](https://github.com/m-c-frank/contenttree)** - A utility to print a repository's tree structure and file content
<!--END_TOKEN-->

## Contributing

Contributions to the textdownloader browser extension are appreciated. If you have ideas for enhancements or new features, please feel free to submit issues, suggestions, or pull requests in this repository or reach out directly!

## License

The textdownloader browser extension is open-source and licensed under the [GOS License](https://github.com/m-c-frank/textdownloader/blob/main/LICENCE.md).

## Credits

textdownloader is developed and maintained by [Martin Christoph Frank](https://github.com/m-c-frank). For inquiries or assistance, please contact [martin7.frank7@gmail.com](martin7.frank7@gmail.com).
