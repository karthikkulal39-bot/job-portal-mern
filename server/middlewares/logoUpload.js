const upload=require('../middlewares/logoParser');
exports.uploadLogo=(req,res,next)=>{
    const uploadFunc=upload.single('logo');
    uploadFunc(req,res,(err)=>{
        if(err){
            return res.status(400).json({
                success:false,
                message:err
            })
        }
        next() 
    })
}
