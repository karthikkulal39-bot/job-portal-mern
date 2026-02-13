const jwt=require('jsonwebtoken');
const decodeToken = require('../utils/decodeJWT');

exports.isAuthenticated=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"not authenticated"
            })
        }
        const decoded=decodeToken(token);
        req.user=decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"invalid token"
        })
        
    }

}