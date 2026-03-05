const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Company'
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      min: [10000, "salary must be atleast 10000"],
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "fulltime",
    },
    minExperience: {
      type: Number,
      default:0
    },
    skills: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
      createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Jobs", jobSchema);
