import { Server } from "socket.io";


declare global{

    var io:Server | undefined

    var mapUseridtosockets:Map<string,Set<string>> | undefined

}

export function getIO(){
    if(!globalThis.io){
        throw new Error("no socket server initialized")
    }

    return globalThis.io;
}


export function getSocketmap(){
    if(!globalThis.mapUseridtosockets){
        globalThis.mapUseridtosockets=new Map()
    }

    return globalThis.mapUseridtosockets;


}