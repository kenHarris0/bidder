
'use client'

import { IMessage, IProduct, IUser } from "@/models/type"
import Chatcontainer from "./Chatcontainer"
import Sendmessagediv from "./Sendmessagediv"

import {socket} from '@/lib/socket'
import { useEffect, useState } from "react"



const Chatbox = ({sender,receiver,currProduct,messages}:{sender:IUser,receiver:IUser,currProduct:IProduct,messages:IMessage[]}) => {

  const [usermessages,setusermessages]=useState<IMessage[]>(messages);
  


useEffect(()=>{
  if(!socket) return;

  const getrtmsgs=(newMessage:IMessage)=>{
  console.log("RECEIVER GOT MESSAGE:", newMessage);
     const isSameProduct=newMessage.productId.toString()===currProduct._id?.toString()

      const isSameConversation=(newMessage.senderId.toString()===sender?._id.toString() && newMessage.receiverId.toString()===receiver._id.toString()) ||
      (newMessage.senderId.toString()===receiver?._id.toString() && newMessage.receiverId.toString()===sender._id.toString())

      if (!isSameProduct || !isSameConversation) {
            return;
        }
    setusermessages((prev)=>[...prev,newMessage])

  }

  socket.on("new-msg",getrtmsgs);


  return()=>{
    socket.off("new-msg",getrtmsgs)
  }

},[sender._id, receiver._id, currProduct._id])


useEffect(() => {
    setusermessages(messages);
}, [messages]);


  return (
    <div className="w-full h-full flex flex-col">


            {/* header */}
        <div className="w-full min-h-13   border-b border-red-700 flex p-4 items-center justify-between">
            <h1 className="text-2xl font-sans"><span className="font-bold text-xl pr-2 text-orange-500">Owner:</span>{receiver?.name}</h1>
            <p className="font-mono text-sm"><span className="font-bold text-xl pr-2 text-orange-500">Product:</span>{currProduct?.name}</p>

        </div>
{/* chat body */}

<div className="w-full h-160  mt-10 p-6">
    <Chatcontainer messages={usermessages} sender={sender._id.toString()}/>

</div>


<div className="w-full h-15 ">
    <Sendmessagediv
  sender={sender}
  receiver={receiver}
  productId={currProduct}
  setusermessages={setusermessages}
/>
</div>


      
    </div>
  )
}

export default Chatbox
