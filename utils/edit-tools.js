

function editToolFunctions(editType){
    console.log(editType.id)
    if(editType.id ==="delete"){
        handleDelete(editType)
    }
    else if(editType.id === "copy"){
        handleCopy(editType)
    }
}

function handleDelete () {
    // const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document
    //  console.log(window.addedElements.length)
    if(window.prevSelected && window.iframeDoc){
        window.addedElements = window.addedElements.filter(element=>element.id !== window.prevSelected.id)
        window.prevSelected.remove()
    
    console.log(window.addedElements.length)
    localStorage.setItem("addedElements", JSON.stringify(window.addedElements))
    }
}

function handleCopy(){
    alert("copy")
    // const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document
    if(window.prevSelected && iframeDoc){
    const copiedElement = window.addedElements.find(element=>element.id === window.prevSelected.id)
    console.log(copiedElement)

    const  newElement = {
        ...copiedElement,
        id: generateRandomId(12)
    }
    console.log(newElement)

    const element = createCircle(newElement.type)
    element.setAttribute("id", newElement.id)

    window.iframeDoc.body.appendChild(element)
    element.addEventListener('mousedown', window.handleSquareMouseDown);

    window.addedElements.push(newElement)
    localStorage.setItem("addedElements", JSON.stringify(window.addedElements))
}    

}