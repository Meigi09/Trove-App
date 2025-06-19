import express from 'express';
import User from '../model/User';
import bcrptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/signup",async (req,res) =>{
  const {username,name,email,password,role} = req.body

  try {
    if (!username || !email || !password || !name || !role) {
      throw new Error("All fileds are quired");  
      }

    const emailExists = await User.findOne({email});

    if (emailExists) {
      return res.status(400).json({message: "Email already exists"});      
    }

    const usernameExists = await User.findOne({username});

    if (usernameExists) {
      return res.status(400).json({message: "Username already exists"});      
    }

    const hashedPassword = await bcrptjs.hash(password,10);

    const userDoc = await User.create({
      username,
      email,
      role,
      password : hashedPassword,
    })

    if(userDoc){
      const token = jwt.sign({id:userDoc._id},proccess.env.JWT_SECRET,{
        expiresIn:"7d",
      });

      res.cookie("token",token,{
        httpOnly:true,
        secure: proccess.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.status(201).json({user: userDoc, message:"User created successfully"});
 
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

export default router;