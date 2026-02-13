const jwt = require("jsonwebtoken");

const sendToken = (foundUser, res) => {
  const token = jwt.sign(
    {
      id: foundUser._id,
      role: foundUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRE },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({
    success: true,
    token,
    user: {
      id: foundUser._id,
      email: foundUser.email,
      role: foundUser.usertype,
    },
  });
};
module.exports = sendToken;
