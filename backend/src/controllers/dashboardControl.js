import User from "../models/userModel.js";
import Todo from "../models/todoModel.js"
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const dashboard = asyncHandler(async (req, res) => {
    const id = req.session.userId.toString()

    const user = await User.findOne({
        _id: id
    })

    const inProgressTodos = await Todo.find({ email: user.email, inProgress: true })
    const isPriorityTodos = await Todo.find({ email: user.email, isPriority: true })

    const total = await Todo.countDocuments({ email: user.email })
    const completed = await Todo.countDocuments({ email: user.email, isDone: true })
    const pending = total - completed
    const progress = inProgressTodos.length



    res.status(200).json({
        name: user.name,
        total,
        completed,
        pending,
        progress,
        inProgressTodos,
        isPriorityTodos,
    })
})

export { dashboard }