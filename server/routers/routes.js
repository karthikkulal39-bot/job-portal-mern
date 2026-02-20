const express = require("express");
const Routes = express.Router();
const {
  createJob,
  getAllJobs,
  updateJobs,
  deleteJob,
  getOneJob,
  jobsPostedByMe,
} = require("../controllers/jobsController");
const { createJobValidator } = require("../validator/createJobValidator");
const { userSignUp, userLogin } = require("../controllers/authController");
const {
  authSignupValidator,
  authLoginValidator,
} = require("../validator/authValidator");
const { isAuthenticated } = require("../middlewares/auth");
const { authorizeRole } = require("../middlewares/roleMiddleware");

const {applyJobs,getAllApplicants}=require('../controllers/applyJobs');
const uploadResume = require("../middlewares/uploadHandler");
const applicationValidation = require("../validator/applicationValidator");


Routes.post(
  "/jobs/",
  isAuthenticated,
  authorizeRole("recruiter"),
  createJobValidator,
  createJob,
); // auth to added later.jwt.
Routes.get("/jobs", getAllJobs);
Routes.patch("/jobs/:id", isAuthenticated,authorizeRole("recruiter"), updateJobs);
Routes.delete("/jobs/:id", isAuthenticated,authorizeRole("recruiter"), deleteJob);
Routes.get("/jobs/:id", isAuthenticated,authorizeRole("recruiter","user"), getOneJob);

Routes.post("/usersignup", authSignupValidator, userSignUp);
Routes.post("/userslogin", authLoginValidator, userLogin);

Routes.post('/application',isAuthenticated,authorizeRole("user"),uploadResume,applicationValidation,applyJobs);

Routes.get('/recruiter/jobspostedbyme',isAuthenticated,authorizeRole("recruiter"),jobsPostedByMe);
Routes.get('/recruiter/:jobsId/applicants',isAuthenticated,authorizeRole('recruiter'),getAllApplicants)
module.exports = Routes;
