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
        const isExists=await company.findOne({slug:data.slug});
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

        res.status(200).json({
            success:true,
            data:companyReg
        })
    }catch(err){
        return res.status(401).json({
            success:false,
            error:err.message
        })
    }


}