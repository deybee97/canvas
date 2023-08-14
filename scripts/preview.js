

const fullViewCancelButton = document.querySelector("#cancel-button-div svg")
const detailDiv = document.querySelector(".detail div")
const fullView = document.querySelector(".full-view")
const iframe = document.getElementById("display-iframe")
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
const mainImageDiv = document.querySelector(".main-image div")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const cachedProfile = JSON.parse(localStorage.getItem('profile'))
const cachedElements= JSON.parse(localStorage.getItem('addedElements'))
const fullViewImageDiv = document.querySelector('.full-view-image')
let fullVIewVisibility = false


//global variables

let elementIndex = 0
let imageIndex = 0
let prevElement = null
console.log(cachedElements[0].imageUrl)

fullViewCancelButton.addEventListener('click',()=>{

    fullView.classList.remove("visibility")
    fullVIewVisibility = !fullVIewVisibility
})

detailDiv.addEventListener("click",()=>{
    if(fullVIewVisibility){
        fullView.classList.remove("visibility")
       
    }else{
        fullView.classList.add("visibility")
    }

    fullVIewVisibility = !fullVIewVisibility
    const imageElement = document.createElement("img");

    imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
    imageElement.style.maxWidth = "100%"
    fullViewImageDiv.innerHTML = ""
    fullViewImageDiv.appendChild(imageElement)
    
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

    mainImageDiv.appendChild(image.cloneNode())

  }

  //copy and pasted: review


if(cachedProfile && cachedElements){


   
    cachedElements.forEach((elem,index)=>{

        console.log(elem)
     
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
         
         console.log(cachedElements[index])
        //copied and pasted: review
         const imageElement = document.createElement("img");
         elementIndex = index 
        imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
        imageElement.style.maxWidth = "100%";

        detailDiv.innerHTML = ""
        detailDiv.appendChild(imageElement);
       })
      
       iframeDoc.body.appendChild(element);
       
   
    })
    
  }

  //copied and pasted: review

  const imageElement = document.createElement("img");

  imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
  imageElement.style.maxWidth = "100%";


  detailDiv.appendChild(imageElement);


  prevBtn.addEventListener("click", ()=>{
    if(imageIndex > 0){
    --imageIndex
    detailDiv.innerHTML = ""
    imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
    detailDiv.appendChild(imageElement);
    fullViewImageDiv.innerHTML =""
    fullViewImageDiv.appendChild(imageElement.cloneNode())
    }
  })

  nextBtn.addEventListener("click", ()=>{
    if(imageIndex < cachedElements[elementIndex].imageUrl.length -1 )
    {
    ++imageIndex
    detailDiv.innerHTML = ""
    imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
    detailDiv.appendChild(imageElement);
    fullViewImageDiv.innerHTML =""
    fullViewImageDiv.appendChild(imageElement.cloneNode())
    }
  })


