// const {validationResult,body}= require('express-validator');
// exports.updateValidator=[
//     body('_id').notEmpty().withMessage("missing value for update").trim(),
//     (req,res,next)=>{
//         const errors=validationResult(req);
//         if(!errors.isEmpty()){
//             return res.status(500).json({
//                 sucess:false,
//                 errors:errors.array()
//             })
//         }
//         next();
//     }

// ]