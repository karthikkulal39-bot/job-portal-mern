const express = require("express");
const Routes = express.Router();
const { createJob , getAllJobs , updateJobs , deleteJob,getOneJob} = require("../controllers/jobsController");
const { createJobValidator } = require("../validator/createJobValidator");

Routes.post("/jobs/", createJobValidator, createJob);// auth to added later.jwt.
Routes.get("/jobs", getAllJobs);
Routes.patch("/jobs/:id",updateJobs);
Routes.delete('/jobs/:id', deleteJob);
Routes.get('/jobs/:id',getOneJob);

module.exports = Routes;
