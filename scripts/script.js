

const canvasContainer = document.getElementById('canvas-container');
window.iframe = document.getElementById('canvas');
const addButton = document.getElementById('add-button');
// const addElementButton = document.getElementById('add-element-button')
const zoomRange = document.getElementById('zoom-range');
let initialScale = parseFloat(zoomRange.value);
let isMouseMoving = false;
let offsetX = 0;
let offsetY = 0;
let selectedSquare = null;



//functions for square drag

function handleSquareMouseDown(event) {
    selectedSquare = event.target;
    offsetX = event.clientX - selectedSquare.offsetLeft;
    offsetY = event.clientY - selectedSquare.offsetTop;
  }
  
  // Function to handle mousemove event on the document
  function handleMouseMove(event) {
    if (selectedSquare) {
      const x = event.clientX - offsetX;
      const y = event.clientY - offsetY;
      selectedSquare.style.left = `${x}px`;
      selectedSquare.style.top = `${y}px`;
    }
  }
  
  // Function to handle mouseup event on the document
  function handleMouseUp() {
    // console.log(selectedSquare.style.left, selectedSquare.style.top, selectedSquare.id)
    // addedElements.forEach(element=>{
    //     if(element.id === selectedSquare.id){
    //         console.log(element.element.style.left, selectedSquare.style.left, element.element.style.top, selectedSquare.style.top)
    //     }
    // })

    //  console.log(addedElements)
    localStorage.setItem("addedElements", JSON.stringify(addedElements))
    selectedSquare = null;
  }

  iframe.contentDocument.addEventListener('mousemove', handleMouseMove);
  iframe.contentDocument.addEventListener('mouseup', handleMouseUp);



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
canvasContainer.addEventListener('wheel', handleTrackpadZoom
);

function addElement() {

  if(window.selectedFloor){

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
   
  const element = createCircle(iframeDoc)

  element.id = addedElements.length
  

 console.log(element, selectedFloorId)
  
  addedElements.push({
    id: element.id,
    floor_id: selectedFloorId,
    left: element.style.left,
    top: element.style.top,
  })

  console.log(addedElements)

  iframeDoc.body.appendChild(element);
  element.addEventListener('mousedown', handleSquareMouseDown);

  localStorage.setItem("addedElements", JSON.stringify(addedElements))
}
}

addElementButton.addEventListener('click', addElement)


