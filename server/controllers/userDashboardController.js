const Application = require("../models/Application");

const viewAllAppliedJobs=async(req,res)=>{
    const userId=req.user.id;
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    const skip=(page-1)*limit;
    const totalDocuments=await Application.countDocuments({applicant:userId});

    try{
        const totalPages=Math.ceil(totalDocuments/limit);

        const allAppliedJobs=await Application.find({applicant:userId})
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .populate({
            path:'jobs',
            select:'title company location jobType'
        })
        if(allAppliedJobs.applicant!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"UNAUTHORIZED"
            })
        }
        if(!allAppliedJobs){
            return res.status(404).json({
                sucess:false,
                message:"no data found"
            })
        }
        return res.status(200).json({
            success:true,
            totalPage:totalPages,
            currentPage:page,
            data:allAppliedJobs
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={
    viewAllAppliedJobs
}