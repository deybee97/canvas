// frontend

const UI = {
    fullViewCancelButton : document.querySelector("#cancel-button-div svg"),
    detailDiv : document.querySelector(".detail div"),
    fullView : document.querySelector(".full-view"),
    iframe : document.getElementById("display-iframe"),
   
    mainImageDiv : document.querySelector(".main-image div"),
    prevBtn : document.querySelector(".prev-btn"),
    nextBtn : document.querySelector(".next-btn"),
    
    fullViewImageDiv : document.querySelector('.full-view-image'),
}





//global variables
const cachedProfile = JSON.parse(localStorage.getItem('profile'))
const cachedElements = JSON.parse(localStorage.getItem('addedElements'))
const iframeDoc = UI.iframe.contentDocument || UI.iframe.contentWindow.document
let elementIndex = 0
let imageIndex = 0
let prevElement = null
let fullVIewVisibility = false



UI.fullViewCancelButton.addEventListener('click',()=>{

    UI.fullView.classList.remove("visibility")
    fullVIewVisibility = !fullVIewVisibility
})

UI.detailDiv.addEventListener("click",()=>{
    if(fullVIewVisibility){
        UI.fullView.classList.remove("visibility")
       
    }else{
        UI.fullView.classList.add("visibility")
    }

    fullVIewVisibility = !fullVIewVisibility
    const imageElement = document.createElement("img");

    imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
    imageElement.style.maxWidth = "100%"
    UI.fullViewImageDiv.innerHTML = ""
    UI.fullViewImageDiv.appendChild(imageElement)
    
})



//copy and pasted: review
if(cachedProfile?.imageUrl){
    var image = new Image();
    image.src = cachedProfile.imageUrl;
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
    image.style.objectPosition = 'center';
    iframeDoc.body.appendChild(image)

    UI.mainImageDiv.appendChild(image.cloneNode())

  }

  //copy and pasted: review


if(cachedProfile && cachedElements){


   
    cachedElements.forEach((elem,index)=>{


     
      let position = {
        left: elem.left,
        top: elem.top,
      }
      // elem.type: e.g door-element, wall-element etc
       const element =  createCircle(elem.type, position, elem.color)
       element.setAttribute("id",elem.id)
       if(index === elementIndex){
        element.style.border ="2px solid grey"
        prevElement = element
       }
       element.addEventListener("click",()=>{
        prevElement.style.border = "none"
         element.style.border ="2px solid grey"
         prevElement = element
         
        //copied and pasted: review
         const imageElement = document.createElement("img");
         elementIndex = index 
        imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
        imageElement.style.maxWidth = "100%";

       UI.detailDiv.innerHTML = ""
       UI.detailDiv.appendChild(imageElement);
       })
      
       iframeDoc.body.appendChild(element);
       
   
    })
    
  }

  //copied and pasted: review

  const imageElement = document.createElement("img");

  imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
  imageElement.style.maxWidth = "100%";


 UI.detailDiv.appendChild(imageElement);


  UI.prevBtn.addEventListener("click", ()=>{
    if(imageIndex > 0){
    --imageIndex
   UI.detailDiv.innerHTML = ""
    imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
   UI.detailDiv.appendChild(imageElement);
    UI.fullViewImageDiv.innerHTML =""
    UI.fullViewImageDiv.appendChild(imageElement.cloneNode())
    }
  })

  UI.nextBtn.addEventListener("click", ()=>{
    if(imageIndex < cachedElements[elementIndex].imageUrl.length -1 )
    {
    ++imageIndex
   UI.detailDiv.innerHTML = ""
    imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
   UI.detailDiv.appendChild(imageElement);
    UI.fullViewImageDiv.innerHTML =""
    UI.fullViewImageDiv.appendChild(imageElement.cloneNode())
    }
  })


