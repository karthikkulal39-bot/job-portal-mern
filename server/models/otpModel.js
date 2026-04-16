const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const otpModule=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    email:{
        type:String,
        reuqired:true,
        unique:true
    },
    otp:{
        type:String,
        required:true,
       
    },
    createdAt:{
            type:Date,
            default:Date.now,
            expires:3600
        }
});
otpModule.pre("save",async function(){
    
    try{
        if(!this.otp){
            throw new Error("OTP is required");

        }
        if(!this.isModified("otp")){
            return ;
        }
        this.otp=await bcrypt.hash(String(this.otp),10);
    }catch(err){
       throw new Error(err.message);
    }
})
module.exports=mongoose.model("otpModels",otpModule);