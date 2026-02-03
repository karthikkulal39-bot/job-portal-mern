const express=require("express");
const UserRouter=express.Router();
const userController=require('../controllers/UserController')

UserRouter.get("/",userController.textuser)

module.exports=UserRouter;