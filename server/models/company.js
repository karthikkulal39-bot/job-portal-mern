const mongoose=require('mongoose');
const companySchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        slug:{
             type: String, unique: true 
        },
        description:{
            type:String,
            trim:true,
    
        },
        website:{type:String},
        location:{type:String,required:true},
        logo:{
            type:String
        },
        foundedYear:{type:Number},
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        recruiters:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        isVerified:{type:Boolean,default:false},
        createdAt: { type: Date, default: Date.now }
    }
);
module.exports=mongoose.model("Company",companySchema);
