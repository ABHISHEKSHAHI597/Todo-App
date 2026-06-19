import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    email: String,
    desc: String,
    isDone: Boolean,
    isPriority: Boolean,
    inProgress: Boolean,
},{
    timestamps: true,
})

export default mongoose.model('Todo', todoSchema)