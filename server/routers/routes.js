const express = require("express");
const Routes = express.Router();
const { createJob , getAllJobs , updateJobs , deleteJob,getOneJob} = require("../controllers/jobsController");
const { createJobValidator } = require("../validator/createJobValidator");
const {userSignUp}=require('../controllers/authController')
const {authSignupValidator}=require('../validator/authValidator')

Routes.post("/jobs/", createJobValidator, createJob);// auth to added later.jwt.
Routes.get("/jobs", getAllJobs);
Routes.patch("/jobs/:id",updateJobs);
Routes.delete('/jobs/:id', deleteJob);
Routes.get('/jobs/:id',getOneJob);

Routes.post('/usersignup',authSignupValidator,userSignUp)

module.exports = Routes;
