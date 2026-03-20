const company = require("../models/company");
const uploadToCloudinary = require("../utils/uploadToCLoudinary");

exports.registerCompany=async(req,res)=>{
    const allowedFields=['name','slug','description','website','location','foundedYear','recruiters'];
    const data={};
    allowedFields.forEach((ele)=>{
        if(req.body[ele]!==undefined){
            data[ele]=req.body[ele];
        }
    });
    try{
        
        let logoData=null;
        if(req.file){
            const result=await uploadToCloudinary(req.file.buffer,'logos');
            logoData={
                url:result.secure_url,
                public_id:result.public_id
            }
        }
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
            logo:logoData
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
