require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connectDB}=require('./configs/configDB')
const Routes = require("./routers/routes");
const cookieParser=require('cookie-parser');
const userRoutes = require("./routers/userRoutes");
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/", Routes);
app.use("/",userRoutes); 

app.listen(process.env.PORT, () => {
  try{
    connectDB();
    console.log(`server is listening in port no ${process.env.PORT}`);
  }
  catch(err){
    console.log(err);
  }
});
