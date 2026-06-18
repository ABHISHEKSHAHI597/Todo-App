import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"

const register = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body
    
    const user = await User.findOne({ email })

    if(user){
        res.status(409).json({
            message: "User with this email id already exists"
        })
        throw new Error('User already exists')
    }
    
    await User.create({
        name,
        email,
        password
    })

    res.status(201).json({
        message: "Registration successfull"
    })
})

export {register}