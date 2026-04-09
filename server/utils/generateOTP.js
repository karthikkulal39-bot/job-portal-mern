const generateOtp=()=>{
    const otp=Math.floor(Math.random()*(999999-100000))+100000;
    
    return otp;
}
module.exports={
   generateOtp 
}