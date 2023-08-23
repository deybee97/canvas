const express = require("express")
const path = require("path")
const profileRouter = require("./routes/profileRoutes")
const elementRouter = require("./routes/elementsRoutes")
const fileUpload = require('express-fileupload');
const cors = require("cors")

const app = express()

app.use(cors(
    {
      origin:'http://localhost:3000',
  
  }))

app.use(express.json())
  
app.use(fileUpload({ useTempFiles: true }));

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/elements', elementRouter)

// Dynamic profile route
app.get('/profile/:profileId', (req, res) => {
    const profileId = req.params.profileId;
    
    // Here, you can dynamically read the appropriate HTML file based on profileId
    // and send it as the response.
    // For example:
    const filePath = path.join(__dirname, `public/profile.html`); // Adjust the path as needed
    
    res.sendFile(filePath);
  });

  app.use('/public', express.static(path.join(__dirname, 'public')));


app.listen(port,()=>{
    console.log(`listening on ${port}`)
}
)