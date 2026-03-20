const multer=require('multer');
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const cloudinary=require('../configs/cloudinaryConfig');

const storage= multer.memoryStorage();

// new CloudinaryStorage({
//     cloudinary:cloudinary,
//     params:{
//         folder:'logos',
//         resource_type:'image',
//         public_id:(req,file)=> Date.now() + "-" + file.originalname
//     }
// });
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb("only jpeg or png format is allowed",false);
    }
}
const uploads=new multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:5*1024*1024}
})
module.exports=uploads;