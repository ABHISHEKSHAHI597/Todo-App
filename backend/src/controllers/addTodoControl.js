import User from "../models/userModel.js";
import Todo from "../models/todoModel.js";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"

const addTodo = asyncHandler(async (req, res) => {
    const id = req.session.userId.toString()

    const user = await User.findOne({
        _id: id
    })

    const {desc, isDone, isPriority, inProgress, } = req.body

    const todo = await Todo.findOne({ desc })

    if(todo){
        return res.status(209).json({
            message: "Todo with this description already exists"
        })
    }

    await Todo.create({
        email: user.email,
        desc,
        isDone,
        isPriority,
        inProgress,
    })

    return res.status(201).json({
        message: 'Todo created, redirecting to Dashboard'
    })

})

export { addTodo }