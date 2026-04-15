const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const otpModule=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:users,
        required:true,
    },
    email:{
        type:String,
        reuqired:true,
        unique:true
    },
    otp:{
        type:Number,
        required:true,
        createdAt:{
            type:date,
            default:now.Date(),
            expires:300
        }
    }
});
otpModule.pre("save",async()=>{
    try{
        this.otp=await bcrypt.hash(this.otp,10);
    }catch(err){
        throw new Error(err);
    }
})
module.exports=mongoose.model("otpModels",otpModule);