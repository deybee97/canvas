
// TO:DO: you could add the former parameters of the element being edited in order to create
//a better user experience. for instance you could check for the previous parameter when you change it
// then change it back to what was there before, so you wont have to go through the stress of
//resaving zero changes

const settings = {

 singularChange: {

 },
 applyToAll: {
  
 }


}




assetColor.addEventListener("change",(event)=>{
    saveOptionButton.removeAttribute("disabled")
    colorCheckbox.removeAttribute("disabled")
    settings.singularChange.color = event.target.value
})

assetDesc.addEventListener("change",(event)=>{
    saveOptionButton.removeAttribute("disabled")
    settings.singularChange.desc = event.target.value
})






assetOptionsCancelButton.addEventListener("click", ()=>{
    assetOptions.classList.remove("visibility")
    selectedFloorId = 0
    selectedElementId = null
    selectedElement.classList.remove("selected")

    saveOptionButton.setAttribute("disabled",true)
    scaleCheckbox.checked = false
    colorCheckbox.checked = false
    scaleCheckbox.setAttribute("disabled",true)
    colorCheckbox.setAttribute("disabled",true)

    settings = {

        singularChange: {
       
        },
        applyToAll: {
         
        }
       
       
       }
  
  })




  assetButton.addEventListener("click", ()=>{
    console.log("click")
    imageInput.click()
  })

  imageInput.addEventListener('change', (event)=>{
    const selectedFile = event.target.files;
    if (selectedFile) {
        displayImagePreview(selectedFile);
        saveOptionButton.removeAttribute("disabled")
    }
  })

  function displayImagePreview(file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageUrl = event.target.result;
      const imageElement = document.createElement("img");
      console.log(imageUrl)
      imageElement.src = imageUrl;
      imageElement.style.maxWidth = "100%";
      
      imagePreview.innerHTML = ""; // Clear previous preview
      imagePreview.appendChild(imageElement);
      imagePreview.classList.add("visibility")
    };

    reader.readAsDataURL(file);
  }


  