const express=require('express');
const recruiterRoutes=express.Router();
const {createJob}=require('../controllers/RecruiterController')
const {createJobValidator}=require('../validator/createJobValidator')

console.log(createJob)
recruiterRoutes.post('/createjob/',
    createJobValidator,
    createJob)

module.exports=recruiterRoutes