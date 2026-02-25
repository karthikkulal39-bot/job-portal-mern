const { default: mongoose } = require("mongoose");
const application = require("../models/Application");
const jobs = require("../models/jobs");
const checkRecruiterAcess = require("../utils/checkRecruiterOfJob");

const applyJobs = async (req, res) => {
  const applicationData = req.body;
  const allowedFields = ["job", "name", "email", "coverLetter"];
  const finalRes = {};
  allowedFields.forEach((feilds) => {
    if (applicationData[feilds] !== undefined) {
      finalRes[feilds] = applicationData[feilds];
    }
  });
  const path = req.file.path;
  const fileName = req.file.filename;
  try {
    const apply = new application({
      ...finalRes,
      resumeUrl: path,
      resumePublicId: fileName,
      applicant: req.user.id,
    });
    const successApply = await apply.save();
    res.status(200).json({
      success: true,
      message: "JobAppplication submitted",
      data: successApply,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "you have already applied to this job",
      });
    }
    return res.status(403).json({
      success: false,
      err: err.message,
    });
  }
};
const getAllApplicants = async (req, res) => {
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

    // const job = await jobs.findById(jobId);
    // if (!job) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "cant find job",
    //   });
    // }

    // if (req.user.id.toString() !== job.createdBy.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "cannot access others job",
    //   });
    // }

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
      const result= await checkRecruiterAcess(applications,req.user.id);
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

const getOneApplication = async (req, res) => {
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
console.log(result);
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

const updateAplication=(req,res)=>{
  
}
module.exports = {
  applyJobs,
  getAllApplicants,
  getOneApplication,
  updateAplication
};
