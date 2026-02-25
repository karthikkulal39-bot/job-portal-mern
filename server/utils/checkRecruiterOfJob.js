
const checkRecruiterAcess=async(applicationData,userId)=>{
    // const applicationData=await application.findById(applicantId).populate({
    //   path:"job",
    //   select:"createdBy"});
   
    if(!applicationData || !applicationData.job){
      return {Error: " NOT_FOUND"};
    }
    if(userId.toString()!==applicationData.job.createdBy.toString()){
      return {Error:" FORBIDDEN"};
    }
    return {success:true}
};
module.exports=checkRecruiterAcess;