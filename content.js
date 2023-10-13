let hoveredElement = null;

document.addEventListener('mouseover', function(event) {
    if (hoveredElement) {
        hoveredElement.style.outline = '';
    }
    hoveredElement = event.target;
    hoveredElement.style.outline = '2px solid red';
});

document.addEventListener('mouseout', function(event) {
    if (hoveredElement) {
        hoveredElement.style.outline = '';
    }
});
