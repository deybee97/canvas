
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
    settings.singularChange.name = event.target.value
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

  imageInput.addEventListener('change', async (event)=>{
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        displayImagePreview(selectedFile,(imageUrl)=>{
           if(imageUrl){
              saveOptionButton.removeAttribute("disabled")
              // console.log(selectedElementType)
              if(selectedElementType){
                window.iframeDoc.body.appendChild(imageUrl)
              }
           }else{
            console.log("error returning url")
           }
        });
       
        
    }
  })

  function displayImagePreview(file, callback) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageUrl = event.target.result;
      populateImagePreview(imageUrl)
      settings.singularChange.imageUrl = imageUrl
      callback(imageUrl)
    };

    reader.readAsDataURL(file);
  }


  saveOptionButton.addEventListener("click",(event)=>{


    console.log(settings.singularChange)

     if(selectedElementType === "profile"){

      profile = {
        ...profile,
        ...settings.singularChange
       }

       localStorage.setItem('profile',JSON.stringify(profile))
      
     }else{
       
       addedElements = addedElements.map(element=>{
          if(element.id === selectedElementId){
            return {
              ...element,
              ...settings.singularChange
            }
          }else{
            return element
          }
       })
       localStorage.setItem('addedElements',JSON.stringify(addedElements))
     }
  })


  