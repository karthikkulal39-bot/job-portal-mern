const { validationResult, body, matchedData } = require("express-validator");
exports.authLoginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty or invalid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("password cannot be empty or invalid password"),
  (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: err.array(),
      });
    }
    next();
  },
];


exports.authSignupValidator = [
  body("firstname").trim().notEmpty().withMessage("first cannot empty"),
  body("lastname").trim(),
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("email cannot be empty or invalid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character")
    .trim(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password did not macthed");
      }
      return true;
    }),
    body("role").optional().isIn(["user","recruiter"]).withMessage("invalid role selected "),

    (req,res,next)=>{
        const err=validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:err.array()
            })
        }
        console.log("backend calllled");
        next();

    }


];

exports.changePasswordValidator=[
    body("newPassword")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character")
    .trim(),
    body("confirmNewPassword")
    .trim()
    .custom((value,{req})=>{
        if(value!==req.newPassword){
            return new Error("new password incorrect")

        }
        return true;
    }),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                error:errors.array()
            })
        }
        next();

}];


exports.verifyOtpValidator = [
  body("firstname").trim().notEmpty().withMessage("first cannot empty"),
  body("lastname").trim(),
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("email cannot be empty or invalid email")
    .normalizeEmail(),
  body("otp").isLength({ min: 6, max: 6 })
  .withMessage("OTP must be 6 digits")
  .isNumeric()
  .withMessage("OTP must contain only numbers"),
  
    body("role").optional().isIn(["user","recruiter"]).withMessage("invalid role selected "),

    (req,res,next)=>{
        const err=validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:err.array()
            })
        }
        req.body=matchedData(req,{onlyValidData:true})
        next();

    }

    
];
exports.sendotpValidator=[
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty or invalid email")
    .normalizeEmail(),
    body("firstname").trim().notEmpty().withMessage("first cannot empty"),
   (req,res,next)=>{
        const err=validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:err.array()
            })
        }
        req.body=matchedData(req,{onlyValidData:true})
        next();

    }

]