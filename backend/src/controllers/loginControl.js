import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    const matchPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!user || !matchPassword) {
        res.status(401).json({
            message: "Login failed"
        })
        throw new Error('Login failed')
    }

    req.session.userId = user._id

    res.status(200).json({
        message: "Succesfully logged in"
    })

})

export { login }