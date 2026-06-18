import express from "express"
import colors from "colors"
import cors from "cors"

const port = 5000
const app = express()

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`.cyan.underline.bold)
})