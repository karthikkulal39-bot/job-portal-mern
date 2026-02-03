require("dotenv").config();
const express = require("express");
const cors = require("cors");
const UserRouter = require("./routers/userRouter");
const { connectDB } = require("./DB/configDB");
const recruiterRoutes = require("./routers/recruiterRouter");
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user/", UserRouter);
app.use("/", recruiterRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server is listening in port no 5000");
});
