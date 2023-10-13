document.getElementById('downloadText').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString()'
  }, function(selection) {
    const blob = new Blob([selection[0]], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: 'selectedText.txt'
    });
  });
});
