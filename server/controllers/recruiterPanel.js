const company = require("../models/company");

exports.registerCompany=async(req,res)=>{
    const allowedFields=['name','slug','description','website','location','logo','foundedYear','recruiters'];
    const data={};
    allowedFields.forEach((ele)=>{
        if(req.body[ele]!==undefined){
            data[ele]=req.body[ele];
        }
    });
    try{
        const isExists=await company.exists({slug:data.slug});
        if(isExists){
            return res.status(409).json({
                success:false,
                message:"company with this slug already exists"
            })
        }
        const companyReg=await company.insertOne({
            ...data,
            createdBy:req.user.id,
        })

        return res.status(201).json({
            success:true,
            data:companyReg
        })
    }catch(err){
    if(err.code==11000){
        return res.status(409).json({
            success:false,
            message:"Company slug already exists"
        })
    }
        return res.status(500).json({
            success:false,
            error:"Internal server error"
        })
    }


};
exports.getAllCompany=(req,res)=>{

}
