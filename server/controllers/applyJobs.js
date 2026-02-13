const application=require('../models/Application');

const applyJobs=(req,res)=>{
    const applicationData=req.body;
    const allowedFields=['name','email','coverLetter','resumeUrl'];
    const finalRes={};
    allowedFields.forEach(feilds=>{
        if(applicationData[feilds]!==undefined){
            finalRes[feilds]=applicationData[feilds];
        }
    })
    const path=req.file.path;
    const fileName=req.file.filename;

    


    res.status(200).json({
        success:true
    })
    
}
module.exports=applyJobs;