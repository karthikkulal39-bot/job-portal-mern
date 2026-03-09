const {body,validationResult}=require('express-validator')
const companyValidator=[
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({min:2, max:100})
    .withMessage('Company name must be between 2 and 100 characters'),
    
    body('slug')
    .trim()
    .notEmpty()
    .withMessage("Company slug is required")
    .isSlug()
    .withMessage('Slug must be a valid slug format'),
    
    body('location')
    .trim()
    .notEmpty()
    .withMessage('Company location is required')
    .isLength({min:2})
    .withMessage('Location must be at least 2 characters'),
    
    body('description')
    .optional()
    .trim()
    .isLength({min:10, max:5000})
    .withMessage('Description must be between 10 and 5000 characters'),
    
    body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid website URL'),
    
    body('foundedYear')
    .optional()
    .isInt({min:1800, max:new Date().getFullYear()})
    .withMessage('Founded year must be a valid year'),
    
    body('logo')
    .optional()
    .trim()
    .isURL()
    .withMessage('Logo must be a valid image URL'),
    
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        next();
    }
]

module.exports=companyValidator;