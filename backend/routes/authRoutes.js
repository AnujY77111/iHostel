const express=require('express');
const {body, ExpressValidator, validationResult}=require('express-validator');
const router=express.Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const JWT_SECRET="your_jwt_secret";
const bcrypt= require('bcrypt');
const authMiddlewares = require('../middlewares/authMiddlewares');
router.post(
    '/signup',[
        body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {name,email,password,role}=req.body;
        try{
            const existingUser=await User.findOne({email});
            if(existingUser){
               return res.status(400).json({message:"Email is already in use."});
            }
            const newUser=new User({name:name,email:email,password:password,role:role||'resident'});
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ token, user: { id: newUser._id, name, email, role: newUser.role } });
        }
        catch(errors){
            res.status(500).json({message:"Server error",error:errors.message});
        }
    }
);
router.post(
    '/login',
    
        [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
    async (req,res)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password}=req.body;
        try{
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"The account with this email does not exist"});
        }
        const isMatch=await existingUser.comparePassword(password);
        // console.log("THIS IS PASSWORD :",password);
        if(!isMatch){
           return res.status(400).json({message:"password is incorrect"}); 
        }
            const token=jwt.sign({ id: existingUser._id, name:existingUser.name,role: existingUser.role }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({
                    token,
                    user:existingUser 
                    ,
            });
         }
         catch(e){
                res.status(500).json({message:"Sever error",error:e.message});
         }
    }
)
router.get('/me', authMiddlewares, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router;
// 