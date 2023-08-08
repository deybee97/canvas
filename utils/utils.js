

const populateImagePreview = (imageUrl) => {
    const imageElement = document.createElement("img");

    imageElement.src = imageUrl;
    imageElement.style.maxWidth = "100%";
    
    window.imagePreview.innerHTML = ""; // Clear previous preview
    window.imagePreview.appendChild(imageElement);
    window.imagePreview.classList.add("visibility")
    
}