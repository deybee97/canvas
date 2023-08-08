// Get necessary elements
const addFloorButton = document.getElementById("add-floor-button");
const floorList = document.getElementById("floor-list");
const addElementButton = document.getElementsByClassName("add-element-button");
const assetOptions = document.getElementById('asset-options')
const assetOptionsCancelButton = assetOptions.querySelector("#cancel-button-div > svg ")
const assetSize = document.getElementById("asset-size")
const assetDesc = document.getElementById("asset-desc")
const assetColor = document.getElementById("asset-color")
const shapePickerButton = document.getElementById("shape-button")
const shapeContainer = document.getElementsByClassName("shape-container")
const assetButton = document.getElementById("image-upload-button")
const imageInput = document.getElementById("image-input")
window.imagePreview = document.getElementById("image-preview")
const saveOptionButton = document.getElementById("save-button")
const scaleCheckbox = document.getElementById("scale-checkbox")
const colorCheckbox = document.getElementById("color-checkbox")


//global variable
let profile = null
window.addedElements = localStorage.getItem('addedElements') ?  [...JSON.parse(localStorage.getItem('addedElements'))]: []
let selectedFloorId = 1
let selectedElementId = null
let selectedElement
let selectedElementType = null

//error?
// let visible = false





// Function to handle adding a new floor
function addFloor(existingFloor) {

  console.log(existingFloor)


  if(!profile){
  let profileId = existingFloor?.id || generateRandomId(12);


  // Create a new list item for the floor

  const floorItem = document.createElement("li");
  floorItem.classList.add("floor-item")
  floorItem.innerText = existingFloor.name || "new Profile"
  floorItem.id = profileId
  profile = {
    id: profileId,
    name:  existingFloor.id ? existingFloor.name : "new profile",
    type: "profile",
    imageUrl: existingFloor.imageUrl,
  }

  localStorage.setItem('profile',JSON.stringify(profile))

  // Create a nested list for the elements under the floor
  const elementList = document.createElement("ul");
  elementList.id = "profile-child"
  floorItem.classList.add("hierarchy-pane-floor")
  
  // Append the nested list to the floor item
  floorItem.appendChild(elementList);

  // Add the floor item to the hierarchy pane
  floorList.appendChild(floorItem);

  // Add click event listener to the floor item
  floorItem.addEventListener("click", selectFloor);
  floorItem.addEventListener("dblclick", handleProfileDoubleClick)
 }else{
  alert("floor already created")
 }
}



   addFloor(JSON.parse(localStorage.getItem('profile')))
    
 



// Function to handle selecting a floor
function selectFloor(event) {

 
  
  const selectedFloor = event.target;

  

  let close = false

 
  if(selectedFloor.classList.contains("floor-element")){
   
    return
  }

  if(selectedFloor.classList.contains("selected")){

    close = true
  }

  
  // Remove the selected class from all floor items
  const floorItems = document.querySelectorAll("#floor-list li");
  console.log(floorItems)
  floorItems.forEach((item) => {
    item.classList.remove("selected");
  });

  //remove all the content of the iframe
//  const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document;

 // Get all elements in the iframe
const allElements = window.iframeDoc.getElementsByClassName('iframe-element');

// Convert HTMLCollection to an array to iterate safely
const elementsArray = Array.from(allElements);

// Remove each element from the iframe content
elementsArray.forEach((element) => {
  element.remove();
});

  // Add the selected class to the clicked floor item

  
  //store the id of the selected floor to be used by the elements
  selectedFloorId = event.target.id
  
  console.log(selectedFloorId)

  // get all elements that belong to the floor
  const floorElement = addedElements.filter(elem=> elem.floor_id === selectedFloorId)
   

  // add elements to the iframe
  if(floorElement.length > 0){

   
      floorElement.forEach(elem=>{
       
        let position = {
          left: elem.left,
          top: elem.top,
        }
        // elem.type: e.g door-element, wall-element etc
         const element =  createCircle(elem.type, position)
         element.setAttribute("id",elem.id)
        
         window.iframeDoc.body.appendChild(element);
         element.addEventListener('mousedown', handleSquareMouseDown);
      })
     
      
  }


 

  // const elementContainer = document.querySelector(`#floor${selectedFloorId}.elements-container`)
  
 

  const floorElementContainer = document.querySelector(`#floor${selectedFloorId}.elements-container`)
  
  if(close){
    selectedFloor.classList.remove("selected")

    return
  }

  

  selectedFloor.classList.add("selected");

}

// Function to handle adding a new element under the selected floor
function addElementToPane(floor, element, elementTypeId, elementId) {

  // Get the selected floor
  let addedElementId = element ? element.id : elementId
 


  const selectedFloor = document.getElementById(floor?.id) || document.querySelector("#floor-list li");


  // if (window.selectedFloor) {
    // Create a new element item
    const elementItem = document.createElement("li");
    elementItem.classList.add("floor-element")
    elementItem.classList.add(elementTypeId)
    elementItem.setAttribute("id", addedElementId)
    elementItem.textContent = element?.name ? element.name : "New Element";

    // Append the element item to the selected floor's nested list
    console.log(selectedFloor)
    const elementList = selectedFloor.querySelector("ul");
    
    elementList.classList.add("elements-container")
    
    elementList.appendChild(elementItem);


    // event listener for elements in the hierarchy pane
    elementItem.addEventListener("click",(event)=>{handleHierarchyElement(event)})
  // } else {
  //   alert("Please select a floor first.");
  // }
}


//onclick element in the hierarchy, the right side pane appears with all the info of the elements

function handleProfileDoubleClick(event) {
    console.log(event.target)
    
    assetOptions.classList.add("profile")
    handleHierarchyElement(event,"profile")
}

const handleHierarchyElement = (event,elementType) => {
  
  if(selectedElement){
    selectedElement.classList.remove("selected")
  }
  
  selectedElementId = event.target.id
  selectedElementType = elementType
 // get the data of selected element from added elements
  
  const selectedElementInfo = elementType ? profile :addedElements.find(element=> element.id === selectedElementId)

  console.log(selectedElementInfo)
 
  imagePreview.innerHTML = ""
  imagePreview.classList.remove("visibility")
   
  // dynamically add the existing value for the selected element

     if(elementType){
      assetDesc.value = selectedElementInfo.name
      console.log(selectedElementInfo.imageUrl)
      if(selectedElementInfo.imageUrl){
        populateImagePreview(selectedElementInfo.imageUrl)
      }
      
     }else{
      const {name, color, imageUrl} = selectedElementInfo
      
      assetDesc.value = name

      if(imageUrl){
        // image url in this case is an array
        populateImagePreview(imageUrl[imageUrl.length-1])
      }
      
      assetColor.value = "#BEBCD3"

     }
    
    event.target.classList.add("selected")
    selectedElement = event.target
    console.log(selectedElement)
    assetOptions.classList.add("visibility")
}




//TODO: I might have to pass the actual elemts later 
// Elements that have been saved 
// JSON.parse(localStorage.getItem('floors')).forEach(floor=>{
  
  
//   let elements = addedElements.filter(element=> (element.floor_id )== floor.id)

  addedElements.forEach(element=> addElementToPane(null, element,element.type,null))
  


// Attach event listeners
addFloorButton.addEventListener("click", addFloor);


// add event listeners to all the asset buttons. Note that at this point there is only one asset button
// Array.from(addElementButton).forEach(element=>{

//   element.addEventListener("click", ()=>{addElementToPane(null,null,element.id)});
// })



