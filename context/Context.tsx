'use client'

import { socket } from "@/lib/socket"
import { IProduct, IUser } from "@/models/type"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { createContext, useEffect, useState } from "react"






interface ContextType{
  userdata:IUser | null
  user:ReturnType<typeof useUser>["user"]
  chatdetails:Chattype
  setchatdetails:React.Dispatch<React.SetStateAction<Chattype>>


}

export type Chattype={
  sender:IUser,
  receiver:IUser,
  product:IProduct
} |null

export const bidderContext=createContext<ContextType | null>(null)

const Context = ({children}:{children:React.ReactNode}) => {


  const {user,isLoaded,isSignedIn}=useUser();

  const [userdata,setuserdata]=useState<IUser | null>(null)


  const [chatdetails,setchatdetails]=useState<Chattype>(null)


  useEffect(()=>{

    const reqhitter=async()=>{
      const res=await axios.post('/api/user/syncuser');
      if(res.data.success){

        setuserdata(res.data.user);

      }
    }

    if(isLoaded && isSignedIn){
    reqhitter()
    }



  },[isLoaded,isSignedIn])


  useEffect(()=>{
if(!userdata?._id) return;


const connectSocket=async()=>{
  socket.emit("register-user",userdata?._id)
}

socket.on("connect",connectSocket);

socket.connect();


return ()=>{
  socket.off("connect", connectSocket);
  socket.disconnect()
}
  },[userdata?._id])


    
console.log(chatdetails)


    let data:ContextType={
      userdata,
      user,chatdetails,setchatdetails

    }


  return (
    <div>

        <bidderContext.Provider value={data}>
            {children}

        </bidderContext.Provider>
      
    </div>
  )
}

export default Context
