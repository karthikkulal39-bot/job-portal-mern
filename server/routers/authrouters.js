const express = require("express");
const authRoutes = express.Router();
const { userSignUp, userLogin, logOut, logOutFromAll, changePassword, refreshYourTokens } = require("../controllers/authController");
const {
  authSignupValidator,
  authLoginValidator,
  changePasswordValidator,
} = require("../validator/authValidator");
const { isAuthenticated } = require("../middlewares/auth");


authRoutes.post("/usersignup", authSignupValidator, userSignUp);


authRoutes.post("/userslogin", authLoginValidator, userLogin);

authRoutes.get("/refreshToken",refreshYourTokens);


authRoutes.post('/auth/logout', isAuthenticated, logOut);

authRoutes.post('/auth/logout-all', isAuthenticated, logOutFromAll);


authRoutes.patch('/auth/change-password', isAuthenticated, changePasswordValidator, changePassword);

module.exports = authRoutes;