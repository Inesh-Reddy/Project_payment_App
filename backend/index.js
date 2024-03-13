const express = require('express');
const app = express();
// mongodb://localhost:27017
app.get("/", function(req,res){
    res.send("Hello Welcome to backend");
})
app.listen(3000, ()=>{
    console.log("Server listening on port : 3000");
})