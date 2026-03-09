const express=require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const { viewAllAppliedJobs } = require('../controllers/userDashboardController');
const companyValidator = require('../validator/createCompanyValidator');
const userRoutes=express.Router();
userRoutes.post('/user/viewappliedjob',isAuthenticated,authorizeRole("user"),companyValidator,viewAllAppliedJobs);


module.exports=userRoutes;