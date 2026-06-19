import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: String,
    email: String,
    desc: String,
    isDone: Boolean,
},{
    timestamps: true,
})

export default mongoose.model('Todo', todoSchema)