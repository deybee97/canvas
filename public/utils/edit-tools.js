

function editToolFunctions(editType, iframeDoc){
    console.log(editType.id)
    if(editType.id ==="delete"){
        handleDelete(iframeDoc)
    }
    else if(editType.id === "copy"){
        handleCopy(iframeDoc)
    }
}

async function handleDelete () {
    // const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document
    //  console.log(window.addedElements.length)
    if(window.prevSelected && iframeDoc){
        window.addedElements = window.addedElements.filter(element=>element.id !== window.prevSelected.id)
        window.prevSelected.remove()
    
    console.log(window.addedElements.length)
    localStorage.setItem("addedElements", JSON.stringify(window.addedElements))

      try {
        const res = await axios.delete(`http://localhost:3000/api/v1/elements?profileId=${window.dynamicURL}&elementId=${window.prevSelected.id}`)
        console.log(res)
      } catch (error) {
        
      }
    }
}

async function handleCopy(){
    alert("copy")
    // const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document
    if(window.prevSelected && iframeDoc){
    const copiedElement = window.addedElements.find(element=>element.id === window.prevSelected.id)
    console.log(copiedElement)

    const  newElement = {
        ...copiedElement,
        id: generateRandomId(12),
        top: "10px",
        left: "10px",
    }
    console.log(newElement)

    const element = createCircle(newElement.type)
    element.setAttribute("id", newElement.id)

    iframeDoc.body.appendChild(element)
    element.addEventListener('mousedown', window.handleSquareMouseDown);

    window.addedElements.push(newElement)
    localStorage.setItem("addedElements", JSON.stringify(window.addedElements))

    try {
        // add element to database
       const res = await axios.post(`http://localhost:3000/api/v1/elements?profileId=${window.dynamicURL}&elementId=${element.id}`,
         newElement,
         {
          'Content-Type':'application/json'
        }
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
}    

}