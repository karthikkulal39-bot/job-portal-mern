const jwt = require("jsonwebtoken");
const Session=require('../models/authModel');
const sendToken = async(User,req, res) => {
  try{  
  const accessToken = jwt.sign(
    {
      _id: User._id ,
      role: User.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '5m' },
  );
  const refreshToken=jwt.sign({
    _id:User._id,
    role:User.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn:'7d'
  });
 
  const sessionSave=new Session({
    userId:User._id,
    refreshToken:refreshToken,
    userAgent:req.headers['user-agent'],
    clientIp:req.ip,
  }) 
  sessionSave.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res.status(200).json({
    success: true,
    accessToken,
    user: {
      id: User._id,
      email: User.email,
      role: User.usertype,
    },
  });
}catch(err){
  res.status(500).json({
    success:false,
    message:err.message
  })
}
};
module.exports = sendToken;
