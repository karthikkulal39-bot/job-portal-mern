const Jobs = require("../models/jobs");

exports.createJob = async (req, res) => {
  try {
    const job = await Jobs.create(req.body);
    return res.status(201).json({
      success: true,
      data: job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const allJobs = await Jobs.find();
    return res.status(200).json({
      success: true,
      data: allJobs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.updateJobs = async (req, res) => {
  const updateData = req.body;
  const id = req.params.id;
  const allowedUpdates = [
    "title",
    "company",
    "location",
    "salary",
    "minExperience",
    "skills",
    "description",
    "isActive",
  ];
  const allowedResult = {};
  allowedUpdates.forEach((feilds) => {
    if (updateData[feilds] !== undefined) {
      allowedResult[feilds] = updateData[feilds];
    }
  });
  if (Object.keys(allowedResult).length === 0) {
    return res.status(400).json({ message: "No valid fields" });
  }

  try {
    const updatedJobs = await Jobs.findByIdAndUpdate(
      { _id: id },
      { $set: allowedResult },
      { runValidators: true },
      {new:true}, //this line return updated value
    );
    return res.status(200).json({
      success: true,
      updatedRes: updatedJobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteJob = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deleteData = await Jobs.findByIdAndDelete({ _id: id });

    console.log(deleteData);
    if (!deleteData) {
      return res.status(403).json({
        success: false,
        message: "job not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: deleteData,
    });
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getOneJob=async(req,res)=>{
  const jobId=req.params.id;
  try{
    const job= await Jobs.findOne({_id:jobId})
    console.log(job)
    res.status(200).json({
      success:true,
      data:job
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })

  }
}
