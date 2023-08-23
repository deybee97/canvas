
const init = async()=> {



    // if(cachedProfile){
    //     addFloor(cachedProfile)
        
    //     addedElements.forEach(element=> addElementToPane(null, element,element.type,null))

    //     if(cachedProfile?.imageUrl){
    //         addImageToFrame(cachedProfile.imageUrl, iframeDoc)
              
    //       }
          
    //       if(addedElements.length > 0 && profile){
          
          
             
    //         addedElements.forEach(elem=>{
             
    //           let position = {
    //             left: elem.left,
    //             top: elem.top,
    //           }
    //           // elem.type: e.g door-element, wall-element etc
    //            const element =  createCircle(elem.type, position, elem.color)
    //            element.setAttribute("id",elem.id)
              
    //            iframeDoc.body.appendChild(element);
    //            element.addEventListener('mousedown', handleSquareMouseDown);
    //         })
            
    //       }

    // }else{
   const {profile, elements}= await getProfileDataInit()
    console.log(profile)
   if(profile){
    addFloor(profile)

    if(elements){

        elements.forEach(element=> addElementToPane(null, element,element.type,null))

        elements.forEach(elem=>{
   
            let position = {
              left: elem.left,
              top: elem.top,
            }
            // elem.type: e.g door-element, wall-element etc
             const element =  createCircle(elem.type, position, elem.color)
             element.setAttribute("id",elem.id)
            
             iframeDoc.body.appendChild(element);
             element.addEventListener('mousedown', handleSquareMouseDown);
          })
    }

    if(profile.imageUrl){
        addImageToFrame(response.imageUrl, iframeDoc)
        }
      

   }
// }
   
floorItemButton.addEventListener('click', selectFloor )

}


 init()