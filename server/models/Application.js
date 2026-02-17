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
applicationSchema.pre('save',async function () {
    try{
        const jobExists=await mongoose.model('Jobs').exists({_id:this.job});

        if(!jobExists){
            throw new Error("Cannnot apply : This job ID does not exists.");
        }
        const userExists=await mongoose.model('Users').exists({_id:this.applicant});
        if(!userExists){
            throw new Error("Cannot apply : You need to signUp / login before apply")
        }
        const alreadyApplied=await mongoose.model('Application').exists({job:this.job,
            applicant:this.applicant
        })
        if(alreadyApplied){
            throw new Error("You have already applied for this job.");
        }
           
    }catch(error){
        throw error;
    }
    
});
module.exports=mongoose.model("Application",applicationSchema)