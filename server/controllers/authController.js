const users = require("../models/users");
const { comparePass } = require("../utils/comparedHashPAss");
const decodeJWT = require("../utils/decodeJWT");
const sendToken = require("../utils/sendToken");
const Session = require("../models/authModel");

const generateOtp = require("../utils/generateOTP");
const { sendEmail } = require("../utils/sendEmail");
const otpModel = require("../models/otpModel");

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
    const checkUser = await users.findOne({ email: allowedValues.email }).select("+verified");
    if (checkUser?.verified) {
      return res.status(404).json({
        success: false,
        message: "user already exists.",
        data: null,
        error: {
          code: "USER_ALREADY_EXISTS",
        },
      });
    }
    if(!checkUser?.verified){ 
      return res.status(403).json({
        success:false,
        message:"verify otp",
        error:{
          code:"VERIFY_OTP"
        }
      })
    }

    const user = new users(allowedValues);
    const { firstname, lastname, email, usertype } = await user.save();
    return res.status(201).json({
      success: true,
      data: { firstname, lastname, email, usertype },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await users.findOne({ email: email });
    // console.log(foundUser);
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials ",
      });
    }
    if(!foundUser?.verified){
      return res.status(401).json({
        success:false,
        message:"not verified please verify otp",
        error:{
          code:OTP_VERIFICATION_PENDING
        }
      })
    }

    const isMatch = await comparePass(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    return sendToken(foundUser, req, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.refreshYourTokens = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "unauthorised",
      });
    }
    const oldData = await Session.findOne({
      refreshToken,
      revoke: false,
    }).select("+refreshToken");

    if (!oldData) {
      return res.status(401).json({
        success: false,
        message: "token expired. login again",
      });
    }

    if (refreshToken.toString() !== oldData.refreshToken.toString()) {
      return res.status(401).json({
        success: false,
        message: "invalid Tokens",
      });
    }
    const verifyTokenData = decodeJWT(refreshToken);

    if (!verifyTokenData) {
      return res.status(403).json({
        success: false,
        message: "invalid token",
      });
    }

    if (verifyTokenData._id.toString() !== oldData.userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "invalid token owner",
      });
    }

    await Session.findByIdAndUpdate(oldData._id, { revoke: true });
    return sendToken(verifyTokenData, req, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.logOutFromAll = async (req, res) => {
  try {
    const userId = req.user.id;
    await Session.updateMany({ userId, revoke: false }, { revoke: true });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "logged out from all devices",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await Session.findOneAndUpdate({ refreshToken }, { revoke: true });
    }

    res.clearCookie("refreshToken", {
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
    const user = await users.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "user not find" });
    }

    const checkOldPass = await comparePass(oldPassword, user.password);
    if (!checkOldPass) {
      return res.status(401).json({
        success: false,
        message: "old password is wrong",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    // console.log("change password error:",error)
    return res
      .status(500)
      .json({ success: false, message: "problem while changing password" });
  }
};
exports.otpSend = async (req, res) => {
  const { firstName, email } = req.body;
  try {
    const userData = await users
      .findOne({ email: email })
      .select("+_id +verified");
      if(!userData){
        res.status(404).json({
          success:false,
          message:"user not found",
          error:{
            code:"USER_NOT_FOUND"
          }
        })
      }
    if (userData.verified) {
      return res.status(403).json({
        success: false,
        message: "already verified.",
        error: {
          code: "ALREADY_VERIFIED",
        },
      });
    }

    const verify = new otpModel({
      userid: userData._id,
      email: email,
      otp: otp,
    });
    await verify.save();
    const otp = generateOtp();
    const options = {
      email: email,
      subject: `${firstName} your job portal email verification code.`,
      detail: otp,
    };

    await sendEmail(options);
    res.status(200).json({
      success:true,
      message:"Otp sent successfully"
    })
  } catch (err) {
    if(err.code===11000){
      return res.status(400).json({
        success:false,
        message:"check you email for otp. try again after when timer ends",
        error:{
          code:"ENTER_OTP"
        }
      })

    }
    return res.status(500).json({
      success:false,
      message:"internal server error",
      error:{
        code:"INTERNAL_SERVER_ERROR"
      }
    })
  }
};

exports.otpVerify=async(req,res)=>{
  const {email,otp}=req.body;
  const user=await otpModel.findOne({email:email}).select("+otp +email").populate("userId","_id");
  if(!user){
       return res.status(409).json({
          success:false,
          message:"user not found",
          error:{
            code:"USER_NOT_FOUND"
          }
        })
      }
      if(email!==user.email){
        return res.status(403).json({
          success:false,
          message:"this action not allowed",
          error:{
            code:"FORBIDDEN_ACTION"
          }
        })
      }
      const checkOtp=await comparePass(otp,user.otp);
      if(!checkOtp){
        return res.status(400).json({
          success:false,
          message:"your otp is wrong please try again",
          error:{
            code:"INVALID_OTP"
          }
        })
      }
      
}