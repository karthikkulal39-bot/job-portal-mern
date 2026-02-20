const application = require("../models/Application");
const jobs = require("../models/jobs");
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
    const sucecssApply = await apply.save();
    res.status(200).json({
      success: true,
      message: "JobAppplication submitted",
      data: sucecssApply,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};
const getAllApplicants = async (req, res) => {
  const jobId = req.params.jobsId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  try {
    const job = await jobs.findById(jobId);
    if(!job){
        return res.status(404).json({
            success:false,
            message:"cant find job"
        })
    }
    if (req.user.id.toString() !== job.createdBy.toString()) {
      return res.status(400).json({
        success: false,
        message: "cannot access others job",
      });
    };

    const totalApplicants=await application.countDocuments({job:jobId});
    const totalPages=Math.ceil(totalApplicants/limit);

    const applications = await application
      .find({ job: jobId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      
    return res.status(200).json({
      success: true,
      pages:totalPages,
      data: applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      
    });
    console.log(err);
  }
};
module.exports = {
  applyJobs,
  getAllApplicants,
};
