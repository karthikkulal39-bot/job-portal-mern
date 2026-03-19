const { validationResult, body } = require("express-validator");

exports.createJobValidator = [
  body("title").trim().notEmpty().withMessage("Job title cannot be empty"),

  body("company")
  .trim()
    .notEmpty()
    .withMessage("company Name cannot be Empty ")
    ,

  body("location")
    .notEmpty()
    .withMessage("Job location must be specified")
    .trim(),

  body("salary")
    .notEmpty()
    .withMessage("salary cannot be empty")
    .isInt({ min: 10000 })
    .withMessage("minimum salary must be greater than 10000")
    .toInt(),

  body("jobType")
    .notEmpty()
    .withMessage("select a jobType")
    .isIn(["full-time", "part-time", "internship"])
    .withMessage("select a valid jobType"),

  body("minExperience")
    .optional()
    .isInt({ min: 0 })
    .withMessage("minExperience must be a non-negative integer")
    .toInt(),

  body("skills")
    .exists()
    .withMessage("skills must be defined")
    .isArray({ min: 1 })
    .withMessage("skills must be an array with at least one item"),

  body("skills.*").isString().trim().withMessage("each skill must be a string"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("job description cannot be empty"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("this accepts only boolean true or false")
    .toBoolean(),

  body("companyId")
  .notEmpty()
  .withMessage("provide your companyId or create a company before creating jobs")
  .trim(),

  
  (req, res, next) => {
    const errors = validationResult(req);
    //error returns an object if error is there 
    //.isempty is false we need true to enter 
    if(!errors.isEmpty()){
      return res.status 
      (400).json({
        success:false,
        message:"validation error",
        errors:errors.array()
      });
    }

    // only allow defined fields 
    const allowed = [
      "title",
      "company",
      "location",
      "salary",
      "jobType",
      "minExperience",
      "skills",
      "description",
      "isActive",
      "companyId",
    ];

    req.body = allowed.reduce((obj,key)=>{
      if(req.body.hasOwnProperty(key)){
         obj[key]=req.body[key];
      }
      return obj;
    },{})

    next();
  },
];
