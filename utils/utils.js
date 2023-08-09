

const populateImagePreview = (imageUrl) => {
    const imageElement = document.createElement("img");

    imageElement.src = imageUrl;
    imageElement.style.maxWidth = "100%";
    
    window.imagePreview.innerHTML = ""; // Clear previous preview
    window.imagePreview.appendChild(imageElement);
    window.imagePreview.classList.add("visibility")
    
}


const addImageToFrame = (imageUrl) => {
    var existingImage = window.iframeDoc.querySelector('img');

    if (existingImage) {
        existingImage.parentNode.removeChild(existingImage);
    }

    var image = new Image();
    image.src = imageUrl;
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
    image.style.objectPosition = 'center';
    window.iframeDoc.body.appendChild(image)
}

function rgbStringToHex(rgbString) {
    const components = rgbString.match(/\d+/g); // Extract numerical values
    if (!components || components.length !== 3) {
      return null; // Invalid input
    }
  
    const r = parseInt(components[0]);
    const g = parseInt(components[1]);
    const b = parseInt(components[2]);
  
    return rgbToHex(r, g, b);
  }