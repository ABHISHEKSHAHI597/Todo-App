import express from "express"
import colors from "colors"
import cors from "cors"
import { login } from "./src/controllers/loginControl.js"
import { register } from "./src/controllers/registerControl.js"
import { dashboard } from "./src/controllers/dashboardControl.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { protect } from "./src/middleware/sessionId.js"
import session from "express-session";

dotenv.config()
const app = express()
const port = 5000

// Storing user information in cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

await mongoose.connect(process.env.MONGO_URI)

app.post('/login', login)
app.post('/register', register)
app.get('/dashboard',protect, dashboard)

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`.cyan.underline.bold)
})