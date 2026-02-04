require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connectDB}=require('./DB/configDB')
const Routes = require("./routers/routes");
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", Routes);

app.listen(process.env.PORT, () => {
  try{
    connectDB();
    console.log(`server is listening in port no ${process.env.PORT}`);
  }
  catch(err){
    console.log(err);
  }
});
