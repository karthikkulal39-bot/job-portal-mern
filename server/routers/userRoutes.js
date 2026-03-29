const express=require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const { getMyDetail, updateProfile, viewAllAppliedJobs } = require('../controllers/userDashboardController');
const { updateProfileValidator } = require('../validator/updateProfileValidator');
const {
  applyJobs,
} = require('../controllers/applyJobs');
const uploadResume = require('../middlewares/uploadHandler');
const applicationValidation = require('../validator/applicationValidator');
const { checkAppliedForJob } = require('../middlewares/checkJobApplied');
const companyValidator = require('../validator/createCompanyValidator');
const userRoutes=express.Router();

// User routes
userRoutes.get('/mydetail', isAuthenticated,authorizeRole("user","recruiter"), getMyDetail);
userRoutes.patch('/update-profile/:id', isAuthenticated, authorizeRole("user","recruiter"), updateProfileValidator, updateProfile);
userRoutes.post('/user/viewappliedjob', isAuthenticated, authorizeRole("user"), companyValidator, viewAllAppliedJobs);
userRoutes.post(
  "/application",
  isAuthenticated,
  authorizeRole("user"),
  checkAppliedForJob,
  uploadResume,
  applicationValidation,
  applyJobs,
);

module.exports=userRoutes;