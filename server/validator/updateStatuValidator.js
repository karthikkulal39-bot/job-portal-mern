const {body,validationResult}=require('express-validator')

exports.updateStatusVal=[
    body('status').trim().notEmpty().withMessage("please submit status value"),
    (req,res,next)=>{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                sucecss:false,
                errors:error.array()

            });
        }
        next();
    }
]