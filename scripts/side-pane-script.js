// Get necessary elements
const addFloorButton = document.getElementById("add-floor-button");
const floorList = document.getElementById("floor-list");
const addElementButton = document.getElementById("add-element-button");
const floors = []
let addedElements = [...JSON.parse(localStorage.getItem('addedElements'))]
let selectedFloorId = 0




// Function to handle adding a new floor
function addFloor(existingFloor) {

  let floorCount = existingFloor?.id - 1 || floors.length;
  floorCount++;

  // Create a new list item for the floor
  const floorItem = document.createElement("li");
  floorItem.textContent = "Floor " + floorCount;
  floorItem.id = floorCount

  floors.push({
    id: floorCount,
    name: floorItem.textContent,
  })

  localStorage.setItem('floors',JSON.stringify(floors))

  // Create a nested list for the elements under the floor
  const elementList = document.createElement("ul");

  // Append the nested list to the floor item
  floorItem.appendChild(elementList);

  // Add the floor item to the hierarchy pane
  floorList.appendChild(floorItem);

  // Add click event listener to the floor item
  floorItem.addEventListener("click", selectFloor);
}



JSON.parse(localStorage.getItem('floors')).forEach(floor=>{
     addFloor(floor)
})



// Function to handle selecting a floor
function selectFloor(event) {

  // Remove the selected class from all floor items
  const floorItems = document.querySelectorAll("#floor-list li");
  floorItems.forEach((item) => {
    item.classList.remove("selected");
  });

  //remove all the content of the iframe
 const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document;

 // Get all elements in the iframe
const allElements = iframeDoc.getElementsByClassName('iframe-element');

// Convert HTMLCollection to an array to iterate safely
const elementsArray = Array.from(allElements);

// Remove each element from the iframe content
elementsArray.forEach((element) => {
  element.remove();
});

  // Add the selected class to the clicked floor item
  const selectedFloor = event.target;
  
  //store the id of the selected floor to be used by the elements
  selectedFloorId = event.target.id


  // get all elements that belong to the floor
  const floorElement = addedElements.filter(elem=> elem.floor_id === selectedFloorId)

  console.log(floorElement)
 
  if(floorElement.length > 0){
      console.log(floorElement)
   
      floorElement.forEach(elem=>{
       
        let position = {
          left: elem.left,
          top: elem.top,
        }
         const element =  createCircle(iframeDoc, position)
         iframeDoc.body.appendChild(element);
         element.addEventListener('mousedown', handleSquareMouseDown);
      })
     
      
  }

  selectedFloor.classList.add("selected");
}

// Function to handle adding a new element under the selected floor
function addElementToPane(floor) {
  // Get the selected floor
 
  window.selectedFloor = document.getElementById(floor?.id) || document.querySelector("#floor-list li.selected");
  if (window.selectedFloor) {
    // Create a new element item
    const elementItem = document.createElement("li");
    elementItem.textContent = "New Element";

    // Append the element item to the selected floor's nested list
    const elementList = window.selectedFloor.querySelector("ul");
    elementList.appendChild(elementItem);
  } else {
    alert("Please select a floor first.");
  }
}


//TODO: I might have to pass the actual elemts later 
JSON.parse(localStorage.getItem('floors')).forEach(floor=>{
  console.log(floor.id)
  let elements = addedElements.filter(element=> (element.floor_id )== floor.id)
  elements.forEach(element=> addElementToPane(floor))
  
})

// Attach event listeners
addFloorButton.addEventListener("click", addFloor);
addElementButton.addEventListener("click", addElementToPane);
