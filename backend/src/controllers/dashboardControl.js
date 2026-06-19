import User from "../models/userModel.js";
import Todo from "../models/todoModel.js"
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const dashboard = asyncHandler(async(req,res)=>{
    const id = req.session.userId.toString()

    console.log(id)

    const user = await User.findOne({
        _id : id
    })

    console.log(user.name)

    // const todos = await Todo.find({ email : user.email})

    // console.log(todos)

    res.status(200).json({
        // todos,
        name: user.name
    })
})

export {dashboard}