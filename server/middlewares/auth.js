const jwt=require('jsonwebtoken');
const decodeToken = require('../utils/decodeJWT');

exports.isAuthenticated=(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        const bearerToken=authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null;
        const token=bearerToken || req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"not authenticated"
            })
        }
        const decoded=decodeToken(token);
        req.user={...decoded,
            id:decoded._id
        };
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"invalid token"
        })
        
    }

}