
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



const resetOptionPane =  ()=>{
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

}

assetOptionsCancelButton.addEventListener("click",  resetOptionPane)




  assetButton.addEventListener("click", ()=>{
    console.log("click")
    imageInput.click()
  })

  imageInput.addEventListener('change', async (event)=>{
    const selectedFiles = event.target.files;
    
    console.log(selectedFiles)
    Array.from(selectedFiles).forEach(selectedFile => {
      if (selectedFile) {
        displayImagePreview(selectedFile,(imageUrl)=>{
           if(imageUrl){
              saveOptionButton.removeAttribute("disabled")
              // console.log(selectedElementType)
              if(selectedElementType){
                addImageToFrame(imageUrl)
              }
           }else{
            console.log("error returning url")
           }
        });
       
        
    }
    });
    
  })

  function displayImagePreview(file, callback) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageUrl = event.target.result;
      populateImagePreview(imageUrl)
      if(selectedElementType){
      settings.singularChange.imageUrl = imageUrl
      }else{
         settings.singularChange.imageUrl = settings.singularChange.imageUrl?.length >0  ? [...settings.singularChange.imageUrl]:[]
         settings.singularChange.imageUrl.push(imageUrl)
      }
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
     resetOptionPane()
  })


  