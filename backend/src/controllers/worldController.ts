import {socketServer} from '../index';
import {Request,Response} from 'express'

export const startSocketServer = ()=>{
    
    socketServer.on('connection',(socket)=>{
        console.log('A user has connected');
        socket.on('disconnect',()=>{
            console.log('A user disconnected');
        })
    });
}


