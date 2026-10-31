import {createServer} from 'http'
import next from 'next';
import {Server} from 'socket.io'
import { getSocketmap } from './lib/socket-server';

const dev=process.env.NODE_ENV!=="production";
const hostname="localhost"
const port=3000


const app=next({dev,hostname,port});
const handler=app.getRequestHandler();

app.prepare().then(()=>{
    const httpServer=createServer(handler);


    const io=new Server(httpServer,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST"]
        }
    });

    globalThis.io=io;

    io.on("connection",(socket)=>{
        console.log("connected to socket - ",socket.id)

        socket.on("register-user",(userId)=>{
            const socketmap=getSocketmap();

            if(!socketmap.has(userId)){
                socketmap.set(userId,new Set())
            }
            socketmap.get(userId)?.add(socket.id)

            console.log(socketmap)
        })



        socket.on("disconnect",()=>{
            console.log("disconnected to socket - ",socket.id)

            const socketmap=getSocketmap()

            for(const [userId,sockets] of socketmap){
                sockets.delete(socket.id);

                if(sockets.size===0){
                    socketmap.delete(userId)
                }
            }
        })
    })


    httpServer.listen(3000,()=>{
        console.log("ready at port 3000")
    })
})