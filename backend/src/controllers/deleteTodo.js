import mongoose from "mongoose";
import Todo from "../models/todoModel.js";
import asyncHandler from "express-async-handler";

const deleteTodo = asyncHandler(async(req,res)=>{
    const id = req.params.id

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
        message : "Todo deleted successfully"
    }
    )
})

export {deleteTodo}