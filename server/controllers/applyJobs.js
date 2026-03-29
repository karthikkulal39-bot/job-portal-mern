const { default: mongoose } = require("mongoose");
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

module.exports = {
  applyJobs
};
