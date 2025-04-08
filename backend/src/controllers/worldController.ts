import { Request, Response } from "express";
import { usersocketmap } from "../helpers/startsocketserver";
import { socketServer } from "..";


const createWorld = (req: Request, res: Response) => {
  try {
    const { world, uid } = req.body;
    //save the roomname in the db after schema after checking if the room doesnt exist and add a check from the uid that the user is an admin otherwise return an error.
    const socketID = usersocketmap[uid];
    if (!socketID) {
      return res.status(404).json({
        success: false,
        message: "User not connected with the web socket server",
      });
    }
    const socket = socketServer.sockets.sockets.get(socketID);
    if (!socket) {
      return res.status(404).json({
        success: false,
        message: "socket not found",
      });
    }
    socket.join(world);
    res.status(200).json({
      success: true,
      message: "user created and joined the room",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

const deleteWorld = async (req: Request, res: Response) => {
  try {
    const { world, uid } = req.body;
    //check if the world name exists and check if the user if admin else return error.

    const sockets = await socketServer.in(world).fetchSockets();
    sockets.forEach((socket) => {
      socket.leave(world);
    });
    res.status(200).json({
      success: true,
      message: "the World has been deleted",
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const joinWorld = (req: Request, res: Response) => {
  try {
    const { World, userID } = req.body;
    //write check to see if the room already exists and user doesnt need to be an admin
    const socketID = usersocketmap[userID];
    if (!socketID) {
      return res.status(404).json({
        message: "User not connected with the web socket server",
      });
    }
    const socket = socketServer.sockets.sockets.get(socketID);
    if (!socket) {
      return res.status(404).json({
        success: false,
        message: "socket not found",
      });
    }
    socket.join(World);
    return res.status(200).json({
      success: true,
      message: "user joined the room",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Internal server error",
    });
  }
};

const leaveWorld = async (req:Request,res:Response)=>{
    try{
        const {World,uid} = req.body;
        const socketID = usersocketmap[uid];
        if(!socketID){
            return res.status(404).json({
                success:false,
                message:"socket not assigned to the user"
            })
        }
        const socket = socketServer.sockets.sockets.get(socketID);
        if(!socket){
            return res.status(404).json({
                success:false,
                message:"Socket not connected to the web socket server."
            })
        }
       
        socket.leave(World);
        return res.status(200).json({
            success:true,
            message:"User  has left the room"
        })

    }
    catch(error:any){
        return res.status(500).json({
            error:error.message,
            message:"Internal Server Error"

        })
    }
    
}