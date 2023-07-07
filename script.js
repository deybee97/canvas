const canvasContainer = document.getElementById('canvas-container');
const iframe = document.getElementById('canvas');
const addButton = document.getElementById('add-button');
const addSquareButton = document.getElementById('add-square-button')
const zoomRange = document.getElementById('zoom-range');
let initialScale = parseFloat(zoomRange.value);
let isMouseMoving = false;
let initialMouseX = 0;
let initialMouseY = 0;

// Init iframe size
// iframe.style.width = `${canvasContainer.clientWidth}px`;
// iframe.style.height = `${canvasContainer.clientHeight}px`;

addButton.addEventListener('click', () => {
  addSquare();
});

// Function to handle zooming
function handleZoom() {
  const scale = parseFloat(zoomRange.value);
  const centerX = canvasContainer.clientWidth / 2;
  const centerY = canvasContainer.clientHeight / 2;

  canvasContainer.style.transformOrigin = `${centerX}px ${centerY}px`;
  canvasContainer.style.transform = `scale(${scale})`;
  iframe.style.transformOrigin = `${centerX}px ${centerY}px`;
  iframe.style.transform = `scale(${scale})`;
}

// Event listener for zoom range input
zoomRange.addEventListener('input', handleZoom);

// Function to handle mouse movement
function handleMouse(event) {
  if (isMouseMoving) {
    const offsetX = event.clientX - initialMouseX;
    const offsetY = event.clientY - initialMouseY;

    canvasContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomRange.value})`;
    iframe.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomRange.value})`;
  }
}

// Event listeners for mouse movement
canvasContainer.addEventListener('mousedown', function(event) {
  if (event.button === 0) {
    event.preventDefault();
    isMouseMoving = true;
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;
  }
});
document.addEventListener('mousemove', handleMouse);
document.addEventListener('mouseup', function(event) {
  if (event.button === 0) {
    isMouseMoving = false;
    canvasContainer.style.transform = `scale(${zoomRange.value})`;
    iframe.style.transform = `scale(${zoomRange.value})`;
  }
});

// Function to handle pinch-to-zoom on trackpad
function handleTrackpadZoom(event) {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault();
    const scale = parseFloat(zoomRange.value);
    const delta = Math.max(-1, Math.min(1, event.deltaY || -event.wheelDelta || event.detail));
    const zoomStep = 0.1;

    if (delta < 0) {
      zoomRange.value = Math.min(scale + zoomStep, 2);
    } else {
      zoomRange.value = Math.max(scale - zoomStep, 0.2);
    }

    handleZoom();
  }
}

// Event listener for trackpad pinch-to-zoom
canvasContainer.addEventListener('wheel', handleTrackpadZoom);

function addSquare() {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const squareSize = 50;
  const posX = 10;
  const posY = 10;

  const square = iframeDoc.createElement('div');
  square.style.position = 'absolute';
  square.style.width = `${squareSize}px`;
  square.style.height = `${squareSize}px`;
  square.style.left = `${posX}px`;
  square.style.top = `${posY}px`;
  square.style.backgroundColor = 'red';

  iframeDoc.body.appendChild(square);
}


addSquareButton.addEventListener('click', addSquare)
