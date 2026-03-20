const company = require("../models/company");


exports.checkCompanyExists=async(req,res,next)=>{
    const userid=req.user.id;
    try{
        console.log(req.body)
    }
    catch(err){
        console.log(err)
    }
    const slug=req.body.slug;
    const isExists=await company.exists({
        createdBy:userid,
        slug:slug
    });
    if(isExists){
        return res.status(509).json({
            success:false,
            message:"company already created by this slug and user"
        })
    }
    next();

}