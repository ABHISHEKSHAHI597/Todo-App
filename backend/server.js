import express from "express"
import colors from "colors"
import cors from "cors"
import {login} from "./src/controllers/loginControl.js"
import {register} from "./src/controllers/registerControl.js"
import mongoose from "mongoose"

const port = 5000
const app = express()
app.use(express.json())
app.use(cors())

await mongoose.connect("mongodb+srv://shahiabhishek597_db_user:WqAhOv1ETPRhq4sN@cluster0myd.9wmepy7.mongodb.net/todoApp")

app.post('/login', login)
app.post('/register', register)

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`.cyan.underline.bold)
})