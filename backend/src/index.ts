import  express,{Request,Response}  from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authroutes from "./routes/v1/routes"

const app=express();
dotenv.config();
app.use(express.json());
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL||" ");
        console.log("DB CONNECTED");
    }
    catch(error:any){
        console.log("DB not connected",error.message);
    }

}
connectDB();
const PORT=process.env.PORT;
app.use("/auth",authroutes);
app.listen(PORT,()=>{
    console.log(`Server is running on the Port: ${PORT}`);
})
