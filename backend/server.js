const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDb=require('./db');
const app = express();
const path=require('path');
app.use(express.json());
app.use(cors());
connectDb();
const userRouter=require('./routes/userRoutes');
const authroutes=require('./routes/authRoutes');
const PORT = process.env.PORT || 5000;
const User =require("./models/User");
app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('*', (req, res) => {

//   res.sendFile("C:\Users\ANUJ\Desktop\iHostel\frontend\build\index.html");
// });

//  app.use('/api/users',userRouter);
app.use('/api/users',authroutes);

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
})
// app.post('/signup',async (req,res)=>{
//   try{
//   const {name,password,email,role}=req.body;
//   const newUser=new User({name,password,email,role});
//    await newUser.save();
//   console.log("new user added");
//   res.status(200).json({
//     message:"YAYYYY",
//     success:true
//   })
//   }
//   catch(err){
//     res.status(500).json({
//       message:err.message,
//       success:false
//     })
//   }
// });
// app._router.stack.forEach((middleware) => {
//   if (middleware.route) {
//     console.log(`Registered route: ${middleware.route.path}`);
//   }
// });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
