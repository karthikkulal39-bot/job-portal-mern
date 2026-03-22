const express = require("express");
const adminRoutes = express.Router();
const {
  createJob,
  getAllJobs,
  updateJobs,
  deleteJob,
  getOneJob,
  jobsPostedByMe,
} = require("../controllers/jobsController");
const { createJobValidator } = require("../validator/createJobValidator");
const { isAuthenticated } = require("../middlewares/auth");
const { authorizeRole } = require("../middlewares/roleMiddleware");
const {
  getAllApplicants,
  getOneApplication,
  updateAplicationStatus,
} = require("../controllers/applyJobs");
const { updateStatusVal } = require("../validator/updateStatuValidator");
const { registerCompany, recruitersAllCompanies } = require("../controllers/recruiterPanel");
const { uploadLogo } = require("../middlewares/logoUpload");
const companyValidator = require("../validator/createCompanyValidator");
const { checkCompanyExists } = require("../middlewares/checkCompanyExist");

// Admin/Recruiter routes
adminRoutes.post("/registerCompany", isAuthenticated, uploadLogo,
  authorizeRole("user","recruiter"), checkCompanyExists, companyValidator, registerCompany);

adminRoutes.post(
  "/jobs/",
  isAuthenticated,
  authorizeRole("recruiter"),
  createJobValidator,
  createJob,
);

adminRoutes.get("/jobs", getAllJobs);

adminRoutes.patch(
  "/jobs/:id",
  isAuthenticated,
  authorizeRole("recruiter"),
  updateJobs,
);

adminRoutes.delete(
  "/jobs/:id",
  isAuthenticated,
  authorizeRole("recruiter"),
  deleteJob,
);

adminRoutes.get(
  "/jobs/getme/:id",
  isAuthenticated,
  authorizeRole("recruiter", "user"),
  getOneJob,
);

adminRoutes.get(
  "/recruiter/jobspostedbyme",
  isAuthenticated,
  authorizeRole("recruiter"),
  jobsPostedByMe,
);

adminRoutes.get(
  "/recruiter/:jobId/applicants",
  isAuthenticated,
  authorizeRole("recruiter"),
  getAllApplicants,
);

adminRoutes.get(
  "/recruiter/:id",
  isAuthenticated,
  authorizeRole("recruiter"),
  getOneApplication,
);

adminRoutes.post("recruiter/updateJobStatus/:apID", isAuthenticated, authorizeRole('recruiter'), updateStatusVal, updateAplicationStatus);

adminRoutes.get('/get-all-recruiters-companies', isAuthenticated, authorizeRole('recruiter'), recruitersAllCompanies);

module.exports = adminRoutes;