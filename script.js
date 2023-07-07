
const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas')
const addSquareButton = document.getElementById('add-square-button')
const addButton = document.getElementById('add-button')
const zoomRange = document.getElementById('zoom-range');
let initialScale = parseFloat(zoomRange.value);
let isMouseMoving = false;
let initialMouseX = 0;
let initialMouseY = 0;


addButton.addEventListener('click',()=>{
    alert('added')
})

//init
const scale = initialScale
canvasContainer.style.transform = `scale(${scale})`
// Function to handle zooming
function handleZoom() {
  const scale = parseFloat(zoomRange.value);
  const centerX = canvasContainer.clientWidth / 2;
  const centerY = canvasContainer.clientHeight / 2;

  canvasContainer.style.transformOrigin = `${centerX}px ${centerY}px`;
  canvasContainer.style.transform = `scale(${scale})`;
}

// Event listener for zoom range input
zoomRange.addEventListener('input', handleZoom);

// Function to handle mouse movement
// function handleMouse(event) {
//   if (isMouseMoving) {
//     const offsetX = event.clientX - initialMouseX;
//     const offsetY = event.clientY - initialMouseY;

//     canvasContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomRange.value})`;
//   }
// }

// Event listeners for mouse movement
canvasContainer.addEventListener('mousedown', function(event) {
  if (event.button === 0) {
    event.preventDefault();
    isMouseMoving = true;
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;
  }
});
// document.addEventListener('mousemove', handleMouse);
document.addEventListener('mouseup', function(event) {
  if (event.button === 0) {
    isMouseMoving = false;
    canvasContainer.style.transform = `scale(${zoomRange.value})`;
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
   console.log('hello')
   
    const square = document.createElement('div');
    square.className = 'element';
    square.style.left = '10px';
    square.style.top = '10px';
    
    canvas.appendChild(square);


    // Function to handle square movement
    function handleSquareMove(event) {
      if (isMouseMoving) {
        const offsetX = event.clientX - initialMouseX;
        const offsetY = event.clientY - initialMouseY;
        square.style.left = `${parseInt(square.style.left) + offsetX}px`;
        square.style.top = `${parseInt(square.style.top) + offsetY}px`;
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
      }
    }

    square.addEventListener('mousedown', function(event) {
        if (event.button === 0) {
          event.preventDefault();
          isMouseMoving = true;
          initialMouseX = event.clientX;
          initialMouseY = event.clientY;
        }
      });
      document.addEventListener('mousemove', handleSquareMove);
      document.addEventListener('mouseup', function(event) {
        if (event.button === 0) {
          isMouseMoving = false;
        }
      });
 }

    // Event listener for adding a square
   

addSquareButton.addEventListener('click',addSquare);