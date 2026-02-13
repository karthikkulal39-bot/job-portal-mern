const uploads=require('../middlewares/resumeParse.js');

const uploadResume=(req,res,next)=>{
    uploads.single('resume')(req,res,function(err){
        if(err){
            return res.status(400).json({
                succes:false,
                message:err.message
            })
        }
        next();
    })
}
module.exports=uploadResume;