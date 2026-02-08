const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: foundUser._id,
          role: foundUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRE },
      );
      res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"Strict",
      })
      res.status(200).json({
        success: true,
        token,
        user:{
            id:foundUser._id,
            email:foundUser.email,
            role:foundUser.usertype,
        }
      });
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Invalid credentials"
        })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
