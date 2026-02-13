const mongoose=require('mongoose')
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo connected ");

    }catch(err){
        console.log("error whole mongo conenction",err.message);
        process.exit(1)
    }
}

module.exports={connectDB}