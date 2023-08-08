

const canvasContainer = document.getElementById('canvas-container');


const iframe = document.getElementById('canvas');
window.iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
// const addButton = document.getElementById('add-button');
// const addElementButton = document.getElementById('add-element-button')
const zoomRange = document.getElementById('zoom-range');

const parentDiv = document.querySelector('.top-pane-tools');

// Select all the SVG elements within the parent div
const svgElements = parentDiv.querySelectorAll('svg');

// Loop through the selected SVG elements
svgElements.forEach((svgElement) => {
  // Do something with each SVG element
  svgElement.addEventListener('click',()=>editToolFunctions(svgElement))
});

let initialScale = parseFloat(zoomRange.value);
let isMouseMoving = false;
let offsetX = 0;
let offsetY = 0;
let selectedSquare = null;
window.prevSelected = selectedSquare



//functions for square drag



window.handleSquareMouseDown = (event)=> {
    prevSelected ? prevSelected.style.border = "none": null
    selectedSquare = event.target;
    selectedSquare.style.border = "2px solid grey"
    console.log(selectedSquare)
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

    addedElements.forEach(element=>{
        if(element.id === selectedSquare.id){
      
            element.left = selectedSquare.style.left
            element.top = selectedSquare.style.top
        }
    })


    localStorage.setItem("addedElements", JSON.stringify(addedElements))
    prevSelected = selectedSquare
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

function addElement(event,elementId) {

 console.log(event.target.id)

if(profile){

  
   
  const element = createCircle(event.target.id)

  // element.id = addedElements.length
  element.setAttribute("id",elementId)
  


  
  addedElements.push({
    id: element.id,
    floor_id: selectedFloorId,
    left: element.style.left,
    top: element.style.top,
    type: event.target.id,
    name: "New Element",
    color: "#BEBCD3"
  })



  iframeDoc.body.appendChild(element);
  element.addEventListener('mousedown', handleSquareMouseDown);


  localStorage.setItem("addedElements", JSON.stringify(addedElements))
}
}

addImageToFrame(JSON.parse(localStorage.getItem('profile')).imageUrl)


Array.from(addElementButton).forEach((element)=> element.addEventListener('click', (event)=>{

  // this id comes from the id of the button you use to add the element element.id === elementType
  const elementType = element.id

  const id = generateRandomId(12)
  addElement(event, id)
  addElementToPane(null,null,elementType,id)
}))


