
const {db} = require("../config")

const createProfile = (req,res) => {

    
  
    //get profile details from request body

    const {id:profileId, profileName} = req.body
    console.log(profileId, profileName)
   try {
    const profileRef = db.collection("profile").doc(profileId)
    profileRef.set({
        profileName,
    })
    res.status(200).json({success:true})
   } catch (error) {
     console.log(error)
   }
    
}

const deleteProfile = async (req, res) => {
    // Get profile ID from request parameters or body
    const profileId = req.params.profileId; // Assuming you're passing profileId as a URL parameter
  
    try {
      const profileRef = db.collection("profile").doc(profileId);
  
      // Check if the document exists before deleting
      const profileDoc = await profileRef.get();
      if (!profileDoc.exists) {
        res.status(404).json({ success: false, message: "Profile not found" });
        return;
      }
  
      // Delete the profile
      await profileRef.delete();
  
      res.status(200).json({ success: true, message: "Profile deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
};
  

const modifyProfile = async (req, res) => {
    // Get profile ID from request parameters or body
    const profileId = req.params.profileId; // Assuming you're passing profileId as a URL parameter
  
    // Get updated profile details from request body
    const { profileName, imageUrl, description } = req.body;
  
    try {
      const profileRef = db.collection("profile").doc(profileId);
  
      // Check if the document exists before updating
      const profileDoc = await profileRef.get();
      if (!profileDoc.exists) {
        res.status(404).json({ success: false, message: "Profile not found" });
        return;
      }
  
      // Update the profile fields if they are provided in the request body
      const updatedFields = {};
      if (profileName !== undefined) {
        updatedFields.profileName = profileName;
      }
      if (imageUrl !== undefined) {
        updatedFields.imageUrl = imageUrl;
      }
      if (description !== undefined) {
        updatedFields.description = description;
      }
  
      // Apply the updates using profileRef.update()
      await profileRef.update(updatedFields);
  
      res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  };

  const getProfile = async (req, res) => {
    // Get profile ID from request parameters
    const {profileId} = req.query; // Assuming you're passing profileId as a URL parameter
     console.log(profileId)
    try {
      const profileRef = db.collection("profile").doc(profileId);
  
      // Get the profile document
      const profileDoc = await profileRef.get();
  
      if (!profileDoc.exists) {
        res.status(404).json({ success: false, message: "Profile not found" });
        return;
      }
  
      const profileData = profileDoc.data();
    
      res.status(200).json({ success: true, profile: profileData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  };
  
  

module.exports = {
    createProfile,
    deleteProfile,
    modifyProfile,
    getProfile,
}