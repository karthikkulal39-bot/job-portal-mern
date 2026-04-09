const users = require("../models/users");
const { comparePass } = require("../utils/comparedHashPAss");
const decodeJWT=require('../utils/decodeJWT')
const sendToken = require("../utils/sendToken");
const Session=require('../models/authModel');

const generateOtp=require('../utils/generateOTP');

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
    const otp=generateOtp();
   
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
   
    const isMatch = await comparePass(password, foundUser.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    } 
    return sendToken(foundUser,req, res);
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.refreshYourTokens=async (req,res)=>{
  try{
    
    const {refreshToken}=req.cookies;
    if(!refreshToken){
      return res.status(401).json({
        success:false,
        message:"unauthorised"
      })
    }
    const oldData=await Session.findOne({refreshToken,revoke:false}).select('+refreshToken');
    
    if(!oldData){
      return res.status(401).json({
        success:false,
        message:"token expired. login again"
      })
    }


    if(refreshToken.toString() !== oldData.refreshToken.toString()){
      return res.status(401).json({
        success:false,
        message:"invalid Tokens"
      })
    }
    const verifyTokenData=decodeJWT(refreshToken);

    if(!verifyTokenData){
      return res.status(403).json({
        success:false,
        message:"invalid token"
      })
    }

    if(verifyTokenData._id.toString() !== oldData.userId.toString()){
      return res.status(401).json({
        success:false,
        message:"invalid token owner"
      })
    }

    await Session.findByIdAndUpdate(oldData._id,{revoke:true});
    return sendToken(verifyTokenData,req,res);
  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}
exports.logOutFromAll=async(req,res)=>{
  try{
    const userId=req.user.id;
    await Session.updateMany(
      {userId,revoke:false},
      {revoke:true}
    )

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success:true,
      message:"logged out from all devices"
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"internal server error"
    })
  }
}




exports.logOut = async (req, res) => {
  try {
    const {refreshToken}=req.cookies;
    if(refreshToken){
      await Session.findOneAndUpdate({refreshToken},{revoke:true});
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
      return res
        .status(404)
        .json({ success: false, message: "user not find" });
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
