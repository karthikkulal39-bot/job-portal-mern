const mongoose=require('mongoose');
const applicationSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobs",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required :true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:[true, "application with this email already exists"],
        trim:true,   
    },
    coverLetter:{
        type:String,
        required:true,
        trim:true,
    },
    resumeUrl:{
        type:String,
        required:[true, "resume must be summitted"],
        trim:true,
    },
    resumePublicId:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:['pending','reviewed','shortlisted','rejected'],
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
},)

module.exports=mongoose.model("Application",applicationSchema)