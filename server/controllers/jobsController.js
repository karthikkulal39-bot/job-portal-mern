
const Jobs = require("../models/jobs");

exports.createJob = async (req, res) => {
  try {
    const job = await Jobs.create({ ...req.body, createdBy: req.user.id });
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
    const {
      search,
      location,
      minSalary,
      maxSalary,
      jobTypes,
      experience,
      pages = 1,
      limit = 10,
    } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = Number(minSalary);
      if (maxSalary) filter.salary.$lte = Number(maxSalary);
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (jobTypes) {
      const allowedTypes = ["full-time", "part-time", "internship"];
      if (jobTypes && !allowedTypes.includes(jobTypes)) {
        return res
          .status(400)
          .json({ success: false, message: "invalid jobType" });
      }
      filter.jobType = jobTypes;
    }
    if (experience) {
      filter.experience = Number(experience);
    }

    const skip=(pages-1)*limit;
    const tPages=await Jobs.countDocuments(filter);
    const totalPage=Math.ceil(tPages/limit);

    const allJobs = await Jobs.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(-1);

    return res.status(200).json({
      success: true,
      totalPages:totalPage,
      currentPage:pages,
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
  const jobs = await Jobs.findById(id);
  if (jobs.createdBy.toString() !== req.user.id) {
    return res.status(400).json({
      sucecss: false,
      message: "cannnot update other's ",
    });
  }
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
      { new: true }, //this line return updated value
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
  const jobs = await Jobs.findById(id);
  if (jobs.createdBy !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "cannot delete someones jobs post",
    });
  }
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

exports.getOneJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Jobs.findOne({ _id: jobId });
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.jobsPostedByMe = async (req, res, next) => {
  const recruiterId = req.user.id;
  console.log("req recieved");
  try {
    const AllJobsCreatedByMe = await Jobs.find({ createdBy: recruiterId });
    res.status(400).json({
      succecss: true,
      data: AllJobsCreatedByMe,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
