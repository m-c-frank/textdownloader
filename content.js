let isHighlightMode = false;
const HIGHLIGHT_DATA_ATTRIBUTE = 'data-highlight-id';
let currentHighlightId = null;

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('mouseover', handleMouseOver);
document.addEventListener('mouseout', handleMouseOut);
document.addEventListener('mousedown', handleMouseDown);
