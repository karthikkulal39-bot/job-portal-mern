const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const otpModule=new mongoose.Schema({
    email:{
        type:String,
        reuqired:true
    }
})