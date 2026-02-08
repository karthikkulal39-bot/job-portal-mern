const express = require("express");
const Routes = express.Router();
const { createJob , getAllJobs , updateJobs , deleteJob,getOneJob} = require("../controllers/jobsController");
const { createJobValidator } = require("../validator/createJobValidator");
const {userSignUp,userLogin}=require('../controllers/authController')
const {authSignupValidator,authLoginValidator}=require('../validator/authValidator');
const { isAuthenticated } = require("../middlewares/auth");
const { authorizeRole } = require("../middlewares/roleMiddleware");

Routes.post("/jobs/",isAuthenticated,authorizeRole("recruiter"),createJobValidator, createJob);// auth to added later.jwt.
Routes.get("/jobs", getAllJobs);
Routes.patch("/jobs/:id",isAuthenticated,updateJobs);
Routes.delete('/jobs/:id',isAuthenticated,deleteJob);
Routes.get('/jobs/:id',isAuthenticated,getOneJob);

Routes.post('/usersignup',authSignupValidator,userSignUp)
Routes.post('/userslogin',authLoginValidator,userLogin)

module.exports = Routes;
