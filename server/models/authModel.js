const mongoose=require('mongoose');
const authSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    refreshToken:{
        type:String,
        required:true
    },
    userAgent:{
        type:String,
        required:true
    },
    clientIp:{
        type:String,
        required:true
    },
    revoke:{
        type:Boolean,
        default:false,
        enum:[true,false]
    },
    created:{
        type:Date,
        default:Date.now,
        expires:'7d'
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Session',authSchema)