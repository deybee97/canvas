
// TO:DO: you could add the former parameters of the element being edited in order to create
//a better user experience. for instance you could check for the previous parameter when you change it
// then change it back to what was there before, so you wont have to go through the stress of
//resaving zero changes

let settings = {

 singularChange: {

 },
 applyToAll: {
  
 }


}




assetColor.addEventListener("change",(event)=>{
    saveOptionButton.removeAttribute("disabled")
    //  colorCheckbox.removeAttribute("disabled")
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
  // scaleCheckbox.checked = false
  // colorCheckbox.checked = false
  // scaleCheckbox.setAttribute("disabled",true)
  // colorCheckbox.setAttribute("disabled",true)

  settings = {

      singularChange: {
     
      },
      applyToAll: {
       
      }
     
     
     }
     assetOptions.classList.remove("profile")

}

assetOptionsCancelButton.addEventListener("click",  resetOptionPane)




  assetButton.addEventListener("click", ()=>{
    console.log("click")
    imageInput.click()
  })


  imageInput.addEventListener('change', async (event)=>{
    const selectedFiles = event.target.files;
    
    console.log(selectedFiles)
    let url = ""
    
    //check if its profile or not to determine with api end point to call
    if(selectedElementType === "profile"){
      url =`http://localhost:3000/api/v1/profile/uploads`
    }else{
      url = `http://localhost:3000/api/v1/elements/uploads`
    }

    Array.from(selectedFiles).forEach(selectedFile => {
      if (selectedFile) {
        displayImagePreview(selectedFile,url,(imageUrl)=>{
           if(imageUrl){
              saveOptionButton.removeAttribute("disabled")
              // console.log(selectedElementType)
              if(selectedElementType === "profile"){
                
                 addImageToFrame(imageUrl,iframeDoc)
            
              }
           }else{
            console.log("error returning url")
           }
        });
       
        
    }
    });
    
  })

  async function displayImagePreview(file, url, callback) {
    // const reader = new FileReader();

    // reader.onload = function(event) {
    //   const imageUrl = event.target.result;
    //   populateImagePreview(imageUrl, imagePreview)
    //   if(selectedElementType === "profile"){
    //   settings.singularChange.imageUrl = imageUrl
    //   }else{
    //      settings.singularChange.imageUrl = settings.singularChange.imageUrl?.length >0  ? [...settings.singularChange.imageUrl]:[]
    //      settings.singularChange.imageUrl.push(imageUrl)
    //   }
    //   callback(imageUrl)
    // };

    // reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('image',file)
    try {
     const {data:{image:{src}}} = await axios.post(`${url}`,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     })

      populateImagePreview(src, imagePreview)
      if(selectedElementType === "profile"){
      settings.singularChange.imageUrl = src
      }else{
         settings.singularChange.imageUrl = settings.singularChange.imageUrl?.length >0  ? [...settings.singularChange.imageUrl]:[]
         settings.singularChange.imageUrl.push(src)
      }
      callback(src)
    } catch (error) { 
  
     console.log(error);
    }

  }


  saveOptionButton.addEventListener("click",async(event)=>{


    console.log(settings.singularChange, selectedElementType)

     if(selectedElementType === "profile"){
      
      profile = {
        ...profile,
        ...settings.singularChange
       }

       localStorage.setItem('profile',JSON.stringify(profile))

       //save settings to database
       try {
        const res = await axios.put(`http://localhost:3000/api/v1/profile/settings?profileId=${dynamicURL}`,
        {
         ...settings.singularChange
        },
         {
           "Content-Type":"application/json"
         }
        )
        console.log(res)
       
      } catch (error) {
       
      }

      
     }else{

      console.log("entereed", selectedElementType )
       
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

       //save settings to database
       try {
         const res = await axios.put(`http://localhost:3000/api/v1/elements/settings?profileId=${dynamicURL}&elementId=${selectedElementId}`,
         {
          ...settings.singularChange
         },
          {
            "Content-Type":"application/json"
          }
         )
         console.log(res)
        
       } catch (error) {
        
       }
     }

     resetOptionPane()
     
  })


  