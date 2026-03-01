const Application = require("../models/Application");

const viewAllAppliedJobs=async(req,res)=>{
    const userId=req.user.id;
    const filter={applicant:userId};
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    const skip=(page-1)*limit;
    if(page<1 || limit<1){
        return res.status(400).json({
            success:false,
            message:"Invalid Pagination value"
        })

    }
    const allowedStatus=['pending','reviewed','shortlisted','rejected'];
    if(req.query.status&& !allowedStatus.includes(req.query.status)){
        return res.status(400).json({
            success:false,
            message:"invalid filter value"
        })
    }

    try{
       if(req.query.status){
        filter.status=req.query.filter;
       }
       
      
        const totalDocuments=await Application.countDocuments(filter);

        const totalPages=Math.ceil(totalDocuments/limit);

        const allAppliedJobs=await Application.find(filter)
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .populate({
            path:'job',
            select:'title company location jobType'
        });
        
        if(allAppliedJobs.length===0){
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