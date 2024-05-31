import express from 'express'
import cors from "cors"
import connectDB from '../db/dbconnect.js'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
dotenv.config();
const app=express()
const port=8000

const corsOption={
    origin:"*"
}

app.use(cors(corsOption))
app.use(cookieParser( ))
app.use(express.json({limit:"20kb"}))

app.get("/",(req,res)=>{
    res.send("darubazz")
})



import userRouter from './router/user.router.js'
app.use('/api/user',userRouter)

app.listen(port,async()=>{
    await connectDB()
    console.log("the server is listening on port ",port);
})