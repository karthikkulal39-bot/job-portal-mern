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
const { userSignUp, userLogin, logOut, changePassword } = require("../controllers/authController");
const {
  authSignupValidator,
  authLoginValidator,
  changePasswordValidator,
} = require("../validator/authValidator");
const { isAuthenticated } = require("../middlewares/auth");
const { authorizeRole } = require("../middlewares/roleMiddleware");

const {
  applyJobs,
  getAllApplicants,
  getOneApplication,
  updateAplicationStatus,
} = require("../controllers/applyJobs");
const uploadResume = require("../middlewares/uploadHandler");
const applicationValidation = require("../validator/applicationValidator");
const { updateStatusVal } = require("../validator/updateStatuValidator");
const { registerCompany } = require("../controllers/recruiterPanel");
const { getMyDetail } = require("../controllers/userDashboardController");

Routes.post("/registerCompany",isAuthenticated,registerCompany);

Routes.post(
  "/jobs/",
  isAuthenticated,
  authorizeRole("recruiter"),
  createJobValidator,
  createJob,
);
 // auth to added later.jwt.
Routes.get("/jobs", getAllJobs);
Routes.patch(
  "/jobs/:id",
  isAuthenticated,
  authorizeRole("recruiter"),
  updateJobs,
);
Routes.delete(
  "/jobs/:id",
  isAuthenticated,
  authorizeRole("recruiter"),
  deleteJob,
);
Routes.get(
  "/jobs/getme/:id",
  isAuthenticated,
  authorizeRole("recruiter", "user"),
  getOneJob,
);

Routes.post("/usersignup", authSignupValidator, userSignUp);
Routes.post("/userslogin", authLoginValidator, userLogin);

Routes.post(
  "/application",
  isAuthenticated,
  authorizeRole("user"),
  uploadResume,
  applicationValidation,
  applyJobs,
);

Routes.get(
  "/recruiter/jobspostedbyme",
  isAuthenticated,
  authorizeRole("recruiter"),
  jobsPostedByMe,
);
Routes.get(
  "/recruiter/:jobId/applicants",
  isAuthenticated,
  authorizeRole("recruiter"),
  getAllApplicants,
);
Routes.get(
  "/recruiter/:id",
  isAuthenticated,
  authorizeRole("recruiter"),
  getOneApplication,
);
Routes.post("recruiter/updateJobStatus/:apID",isAuthenticated,authorizeRole('recruiter'),updateStatusVal,updateAplicationStatus);
Routes.get('/mydetail',isAuthenticated,getMyDetail);

Routes.post('/auth/logout',isAuthenticated,logOut);
Routes.patch('/auth/change-password',isAuthenticated,changePasswordValidator,changePassword);

module.exports = Routes;
