import mongoose from "mongoose";
import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const todos = asyncHandler(async(req,res)=>{
    const id = req.session.userId.toString()
    const user = await User.findOne({
        _id: id
    })
    const todos = await Todo.find({
        email: user.email
    })
    res.status(200).json({
        name: user.name,
        todos,
    })
})

export {todos}