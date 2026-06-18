import mongoose, { BaseCollection } from "mongoose";

const todoSchema = new mongoose.Schema({
    email: String,
    desc: String,
    isDone: Boolean,
},{
    timestamps: true,
})

export default mongoose.model('User', userSchema)