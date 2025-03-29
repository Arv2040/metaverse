import  express,{Request,Response}  from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import {router} from "./routes/v1/routes"

const app=express();
dotenv.config();

const PORT=process.env.PORT;
app.use("/api/v1",router);
app.listen(PORT,()=>{
    console.log(`Server is running on the Port: ${PORT}`);
})
