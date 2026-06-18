import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"

const login = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    
    const user = await User.findOne({email})

    if(!user || (password !== user.password)){
        res.status(401).json({
            message: "Logged in failed"
        })
        throw new Error('Login failed')
    }

    req.session.userId = user._id

    res.status(200).json({
        message: "Succesfully logged in"
    })

})

export {login}