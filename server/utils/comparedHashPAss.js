const bcrypt=require('bcryptjs')
exports.comparePass=async (password,hashedPass)=>{
    return await bcrypt.compare(String(password),String(hashedPass));

}