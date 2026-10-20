import mongoose from 'mongoose'

const MONGO_URI=process.env.MONGO_URI

if(!MONGO_URI){
    throw new Error("no connection string found")
}

interface Mongodbconnection{
    conn:typeof mongoose | null,
    promise:Promise<typeof mongoose> | null
}

declare global{
    var mongoose:Mongodbconnection
}

let cached=global.mongoose;

if(!cached){
    cached=global.mongoose ??= {conn:null,promise:null}
}



export async function connectDB(){
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts={
            bufferCommands:false
        }

        cached.promise=mongoose.connect(MONGO_URI as string,opts);
    }

    cached.conn=await cached.promise

    return cached.conn;
}
