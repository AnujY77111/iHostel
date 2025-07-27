

const mongoose =require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;
const loc=__dirname;
const ConnectDb =async()=>{
    try{
        const conn= await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
        });
        console.log("MONGODB is connected");
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
};
module.exports=ConnectDb;
