const { body, validationResult } = require("express-validator");
const applicationValidation = [
  body("name").notEmpty().withMessage("please enter your name").trim(),
  body("email")
    .notEmpty()
    .withMessage("please provide your email address")
    .normalizeEmail()
    .trim(),
  body("coverLetter")
    .notEmpty()
    .withMessage("please provide a cover letter")
    .trim(),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
      res.status(400).json({
        success: false,
        err: error.array(),
      });
    }
    if (!req.file) {
      return res.status(401).json({
        success: false,
        message: "resume file required",
      });
    }

    next();
  },
];
module.exports=applicationValidation;