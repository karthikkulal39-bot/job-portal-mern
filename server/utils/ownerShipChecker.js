exports.checkOwner=(userId,creatorId)=>{
    (req,res)=>{
        if(userId.id.toString()!==creatorId.toString()){
            return res.status(401).json({
                success:false,
                messgae:"access denied"
            })
    }

    }
}