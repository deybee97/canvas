

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
    
    console.log(window.prevSelected)
   alert("delete")
}

function handleCopy(){
    alert("copy")

}