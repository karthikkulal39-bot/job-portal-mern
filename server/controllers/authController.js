const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { comparePass } = require("../utils/comparedHashPAss");
const sendToken = require("../utils/sendToken");
exports.userSignUp = async (req, res) => {
  const userdata = req.body;
  const allowedFeilds = ["firstname", "lastname", "email", "password", "role"];
  const allowedValues = {};
  allowedFeilds.forEach((element) => {
    if (element in userdata) {
      allowedValues[element] = userdata[element];
    }
  });
  try {
    const user = new users(allowedValues);
    const { firstname, lastname, email, usertype } = await user.save();
    return res.status(201).json({
      success: true,
      data: { firstname, lastname, email, usertype },
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await users.findOne({ email: email });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = comparePass(password, foundUser.password);
    if (isMatch) {
      sendToken(foundUser, res);
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
