const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is mandatory"],
      unique: [true, "this email already registered"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is mandatory"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "recruiter"],
      required: true,
      default: "user",
    },
    verified:{
      type:Boolean,
      enum:[true,false],
      default:false
    },
  },
  { timestamps: true },
);
userschema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = mongoose.model("Users", userschema);
