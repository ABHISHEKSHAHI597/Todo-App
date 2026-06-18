import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"

const login = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    
    const user = await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error('User does not exist')
    }

    if(password !== user.password){
        res.status(400)
        throw new Error('Password did not match') 
    }
    
    res.status(200).json({
        email
    })
})

export {login}