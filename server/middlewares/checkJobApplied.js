const Applications = require("../models/Application");

const checkAppliedForJob=async(req,res,next)=>{
    const userId=req.user.id;
    const jobId=req.body.job;
    const isApplied=await Applications.exists({applicant:userId,job:jobId})
    if(isApplied){
        return res.status(429).json(
            {
                success:false,
                message:"You have already applied for this job"
            }
        )
    }
    next();
}
module.exports={
    checkAppliedForJob
}