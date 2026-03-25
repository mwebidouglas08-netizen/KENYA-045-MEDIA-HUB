try {
  require("dotenv").config();
} catch (e) {
  console.log("dotenv not found, skipping...");
}
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

let bookings = [];

// Admin login
app.post("/api/admin/login", (req,res)=>{
  const {username,password}=req.body;
  if(username==="KENYA045 MEDIA HUB" && password==="@KENYA045 MEDIA HUB"){
    return res.json({success:true});
  }
  res.status(401).json({success:false});
});

// Booking endpoint
app.post("/api/book", (req,res)=>{
  bookings.push(req.body);
  res.json({success:true,message:"Booking received"});
});

app.get("/api/bookings",(req,res)=>{
  res.json(bookings);
});

// Serve frontend
app.use(express.static(path.join(__dirname,"../client/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../client/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log("Running on "+PORT));
