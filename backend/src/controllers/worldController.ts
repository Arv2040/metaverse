import {Request,Response} from 'express'
import { usersocketmap } from '../helpers/startsocketserver';
import { socketServer } from '..';

const createWorld = (req:Request,res:Response)=>{

}

const deleteWorld = (req:Request,res:Response)=>{

}


const joinWorld = (req:Request,res:Response)=>{
    const {World , userID} = req.body;
    const socketID = usersocketmap[userID];
    if(!socketID){
        return res.status(404).json({
            message:"User not connected with the web socket server"
        })
    }
    const socket=socketServer.sockets.sockets.get(socketID); 
    if(!socket){
        return res.status(404).json({
            success:false,
            message:"socket not found"
        })
    }
    socket.join(World);
    return res.status(200).json({
        success:true,
        message:"user joined the room"
    });
}



