const { default: mongoose } = require("mongoose");
const company = require("../models/company");
const uploadToCloudinary = require("../utils/uploadToCLoudinary");
const application = require("../models/Application");
const checkRecruiterAcess = require("../utils/checkRecruiterOfJob");

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
exports.recruitersAllCompanies=async(req,res)=>{
        try{
            const companies=await company.find({recruiters:new mongoose.Types.ObjectId(req.user.id)}).sort({createdAt:-1});
            if(companies.length===0){
                return res.status(404).json({success:false,message:"your are not recruiter of any company"})
            }
            return res.status(200).json({
                success:true,
                data:companies
            })

        }catch(err){
            return res.status(500).json({success:false,message:"internal server error"})
        }
      
};


exports.getAllApplicants = async (req, res) => {
  const jobId = req.params.jobId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  try {
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination values",
      });
    }

    
    const totalApplicants = await application.countDocuments({ job: jobId });
    const totalPages = Math.ceil(totalApplicants / limit);

    const applications = await application
      .find({ job: jobId })
      .select("_id name email createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path:'job',
        select:'createdBy'
      });
      const result=  checkRecruiterAcess(applications,req.user.id);
      if(result.Error==="NOT_FOUND"){
        return res.status(404).json({
          success:false,
          messgae:"No data found"
        })
      }
      if(result.Error=="FORBIDDEN"){
        return res.status(403).json({
          success:false,
          message:"unauthorized"
        })
      }
    return res.status(200).json({
      success: true,
      pages: totalPages,
      currentPage: page,
      data: applications,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getOneApplication = async (req, res) => {
  const applicantId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(applicantId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Application id",
    });
  }
  try {
     const applicationData=await application.findById(applicantId).populate({
      path:"job",
      select:"createdBy"});
      
      
  //  const applicationData={};
    const result = await checkRecruiterAcess(applicationData, req.user.id);

    if (result.Error === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "no data found",
      });
    }

    if (result.Error === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: applicationData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      erorr: err.message,
    });
  }
};

exports.updateAplicationStatus=async(req,res)=>{
  const applicantId=req.params.apId;
  const {status}=req.body;
  if(!mongoose.Types.ObjectId.isValid(applicantId)){
    res.status(400).json({
      success:false,
      message:"invalid application"
    })
  }
try{
  const appVal=await application.findById(applicantId).populate({
    path:'job',
    select:'createdBy'
  });
  const data= checkRecruiterAcess(appVal,req.user.id);
  if(data.Error==="NOT_FOUND"){
    return res.status(404).json({
    success:false,
    message:'data cant find due to some error'
    })
  }
  if(data.Error==="FORBIDDEN"){
    
    return res.status(404).json({
    success:false,
    message:'UNAUTHORIZED '
    })
  }
  appVal.status=status;
  await appVal.save();
  return res.status(200).json({
    success:true,
    updatedVal:appVal
  })
}

catch(error){
  return res.status(500).json({
    success:false,
    message:"internal server error"
  })

}
}
