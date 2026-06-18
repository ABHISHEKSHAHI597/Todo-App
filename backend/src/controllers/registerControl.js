import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const register = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body
    
    const user = await User.findOne({ email })

    if(user){
        res.status(409).json({
            message: "User with this email id already exists"
        })
        throw new Error('User already exists')
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    req.session.userId = newUser._id

    res.status(201).json({
        message: "Registration successfull"
    })
})

export {register}