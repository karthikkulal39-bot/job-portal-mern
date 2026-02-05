const users = require("../models/users");

exports.userSignUp=async(req,res)=>{
    const userdata=req.body;
    const allowedFeilds=["firstname","lastname","email","password","role"];
    const allowedValues={};
    allowedFeilds.forEach(element => {
        if(element in userdata){
            allowedValues[element]=userdata[element]
        }
        
    });
    try {
        const user= new users(allowedValues);
        const data=await user.save();
        return res.status(201).json({
            success:true,
            data:data
        })
    } catch (error) {
        return res.status(501).json({
            success:false,
            message:error.message
        })
        
    }
}
