
const {db} = require("../config")

const createElement = async(req,res) => {
    
    const elementData = req.body
    const {profileId,elementId} = req.query
   
    try {
        const elementRef = db.collection("profile").doc(profileId).collection("elements").doc(elementId);
        await elementRef.set(elementData);
        res.json({ success: true})
      } catch (error) {
        console.error("Error creating element:", error);
      }
    }
const deleteElement = async (req,res) => {
    const {profileId,elementId} = req.query
    try {
        const elementRef = db.collection("profile").doc(profileId).collection("elements").doc(elementId);
    
        await elementRef.delete();
        res.json({ success: true})
      } catch (error) {
        console.error("Error deleting element:", error);
      }
}

const modifyElement = (req,res) => {
    
}


//updates position of the element
const changePosition = async(req,res) => {

    const positionCoord = req.body
    const {profileId, elementId} = req.query
     
    console.log(profileId, elementId)
    try {
        const elementRef = db.collection("profile").doc(profileId).collection("elements").doc(elementId);
    
        await elementRef.update(positionCoord);
        res.json({ success: true})
      } catch (error) {
        console.error("Error updating element:", error);
      }
    
}

const getElements = async(req,res)=> {

    const {profileId} = req.query
    
    try {
        const elementsRef = db.collection("profile").doc(profileId).collection("elements");
         
        const snapshot = await elementsRef.get();
        
        const elements = [];
        snapshot.forEach((doc) => {
          elements.push({ id: doc.id, ...doc.data() });
        });
        
        res.json({ success: false, data:elements})
       
      } catch (error) {
        console.error("Error fetching elements:", error);
        res.json({success:false, message: "an error occurred"})
      }

    

}

module.exports = {
    createElement,
    deleteElement,
    modifyElement,
    changePosition,
    getElements
}