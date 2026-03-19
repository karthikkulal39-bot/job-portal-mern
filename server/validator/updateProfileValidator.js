const {body,validationResult,matchedData,param}=require('express-validator');

exports.updateProfileValidator=[
    param('id').isMongoId().notEmpty(),

    body('firstname').optional().trim().notEmpty().withMessage('first name cannot be empty'),

    body('lastname').optional().notEmpty().trim().withMessage('lastname cannot be empty'),

    body('email').optional().normalizeEmail().isEmail(),

    (req,res,next)=>{
        const err=validationResult(req);
        if(!err.isEmpty()){
            res.status(400).json({
                success:false,
                message:"Missing values",
                err:err.array()
            })
        }
        req.cleanedData=matchedData(req,{locations:['body']});
        next();
    }
]