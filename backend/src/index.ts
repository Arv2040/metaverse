import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authroutes from "./routes/routes";
import { createServer } from "node:http";
import {Server} from 'socket.io';
import cors from 'cors';
import { startSocketServer } from "./controllers/worldController";

const app = express();
const corsOptions = {
    origin:`http://localhost:${process.env.FRONTEND_PORT}`
}
app.use(cors(corsOptions));
const server  = createServer(app);
export const socketServer = new Server(server);
dotenv.config();
app.use(express.json());



async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL || " ");
    console.log("DB CONNECTED");
  } catch (error: any) {
    console.log("DB not connected", error.message);
  }
}
connectDB();
startSocketServer();

app.use("/auth", authroutes);



const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on the Port: ${PORT}`);
});
