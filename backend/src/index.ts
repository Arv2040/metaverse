import  express,{Request,Response}  from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";

const app=express();
dotenv.config();

const PORT=process.env.PORT;

app.get('/',(req: Request,res:Response)=>{
    res.send("Home Page");
})

app.listen(PORT,()=>{
    console.log(`Server is running on the Port: ${PORT}`);
})
