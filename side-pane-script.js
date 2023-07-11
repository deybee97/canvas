// Get necessary elements
const addFloorButton = document.getElementById("add-floor-button");
const floorList = document.getElementById("floor-list");
const addElementButton = document.getElementById("add-element-button");

let floorCount = 0;

// Function to handle adding a new floor
function addFloor() {
  floorCount++;

  // Create a new list item for the floor
  const floorItem = document.createElement("li");
  floorItem.textContent = "Floor " + floorCount;

  // Create a nested list for the elements under the floor
  const elementList = document.createElement("ul");

  // Append the nested list to the floor item
  floorItem.appendChild(elementList);

  // Add the floor item to the hierarchy pane
  floorList.appendChild(floorItem);

  // Add click event listener to the floor item
  floorItem.addEventListener("click", selectFloor);
}

// Function to handle selecting a floor
function selectFloor(event) {
  // Remove the selected class from all floor items
  const floorItems = document.querySelectorAll("#floor-list li");
  floorItems.forEach((item) => {
    item.classList.remove("selected");
  });

  // Add the selected class to the clicked floor item
  const selectedFloor = event.target;
  selectedFloor.classList.add("selected");
}

// Function to handle adding a new element under the selected floor
function addElement() {
  // Get the selected floor
  const selectedFloor = document.querySelector("#floor-list li.selected");

  if (selectedFloor) {
    // Create a new element item
    const elementItem = document.createElement("li");
    elementItem.textContent = "New Element";

    // Append the element item to the selected floor's nested list
    const elementList = selectedFloor.querySelector("ul");
    elementList.appendChild(elementItem);
  } else {
    alert("Please select a floor first.");
  }
}

// Attach event listeners
addFloorButton.addEventListener("click", addFloor);
addElementButton.addEventListener("click", addElement);
