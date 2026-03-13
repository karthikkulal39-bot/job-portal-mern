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

exports.logOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      message: "logged Out sucessfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "newPassword must be different",
      });
    }
    const user = await users.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user cant find" });
    }

    const checkOldPass = await comparePass(oldPassword, userDBPass);
    if (!checkOldPass) {
      return res.status(401).json({
        sucecss: false,
        message: "password changing failed",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ sucess: false, message: "problme while changing password" });
  }
};
