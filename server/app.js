require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connectDB}=require('./configs/configDB')
const authRoutes = require("./routers/authrouters");
const userRoutes = require("./routers/userRoutes");
const adminRoutes = require("./routers/adminrouters");
const cookieParser=require('cookie-parser');
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);

app.listen(process.env.PORT, () => {
  try{
    connectDB();
    console.log(`server is listening in port no ${process.env.PORT}`);
  }
  catch(err){
    console.log(err);
  }
}); 

app.listen(process.env.PORT, () => {
  try{
    connectDB();
    console.log(`server is listening in port no ${process.env.PORT}`);
  }
  catch(err){
    console.log(err);
  }
});
