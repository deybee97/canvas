
const createProfileBtn = document.getElementById("create-profile")
const profileName = document.getElementById("profile-name")
const url = "http://localhost:3000/"

createProfileBtn.addEventListener("click",async()=>{
    const id = generateRandomId(12)
try {
    const res = await axios.post(`${url}api/v1/profile/`,
    {
      id,
      profileName: profileName.value
    },
   {
    headers:{
     'Content-Type':'application/json'
    }
   })

   console.log(res)
    
   //redirect to profile/dynamic.page
   if (res.status === 200) {
    // Redirect to profile/dynamic.page
    window.location.href = `/profile/${id}`;
} else {
    console.log("Error creating profile.");
}
} catch (error) {
    console.log(error)
}
  

      
})