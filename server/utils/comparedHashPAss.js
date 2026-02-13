const bcrypt=require('bcryptjs')
exports.comparePass=async (password,hashedPass)=>{
    return await bcrypt.compare(password,hashedPass)

}