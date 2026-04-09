const company = require("../models/company");


exports.checkCompanyExists=async(req,res,next)=>{
    const userid=req.user.id;
    const slug=req.body.slug;
    const isExists=await company.exists({
        createdBy:userid,
        slug:slug
    });
    if(isExists){
        return res.status(409).json({
            success:false,
            message:"company already created by this slug and user"
        })
    }
    next();

}