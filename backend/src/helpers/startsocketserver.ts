import { socketServer } from "..";
import { usm } from "../interfaces/worldInterfaces";

export const usersocketmap:usm = {};



export const startSocketServer = ()=>{
   
    socketServer.on('connection',(socket)=>{
        console.log('A user has connected');
        socketServer.on('register',(userID:string)=>{
            usersocketmap[userID] = socket.id;
        })
        socket.on('disconnect',()=>{
            
            for(const userID in usersocketmap){
                if(usersocketmap[userID] == socket.id){
                    delete usersocketmap[userID];
                    break;
                }

            }
            console.log('A user disconnected');
        })
    });
}


