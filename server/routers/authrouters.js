const express = require("express");
const authRoutes = express.Router();
const { userSignUp, userLogin, logOut, logOutFromAll, changePassword, refreshYourTokens, otpSend, otpVerify } = require("../controllers/authController");
const {
  authSignupValidator,
  authLoginValidator,
  changePasswordValidator,
  sendotpValidator,
  verifyOtpValidator,
} = require("../validator/authValidator");
const { isAuthenticated } = require("../middlewares/auth");


authRoutes.post("/usersignup", authSignupValidator, userSignUp);


authRoutes.post("/userslogin", authLoginValidator, userLogin);

authRoutes.get("/refreshToken",refreshYourTokens);


authRoutes.post('/auth/logout', isAuthenticated, logOut);

authRoutes.post('/auth/logout-all', isAuthenticated, logOutFromAll);


authRoutes.patch('/auth/change-password', isAuthenticated, changePasswordValidator, changePassword);

authRoutes.post('/auth/send-otp',sendotpValidator,otpSend);
authRoutes.post('/auth/verify-otp',verifyOtpValidator,otpVerify);

module.exports = authRoutes;