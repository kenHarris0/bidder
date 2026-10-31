'use client'

import { Router, Send, SendHorizonal } from "lucide-react"
import { Input } from "../ui/input"
import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import { Button } from "../ui/button"
import { sendMessage } from "@/lib/actions/sendmessage"
import { useRouter } from "next/navigation"
import { IMessage, IProduct, IUser } from "@/models/type"



const Sendmessagediv = ({sender,receiver,productId,setusermessages}:{sender:IUser,receiver:IUser,productId:IProduct,setusermessages:Dispatch<SetStateAction<IMessage[]>>}) => {
  const router=useRouter();

    const [usermessage,setusermessage]=useState<string>("")
    const reff=useRef(null)


const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try{
    const res=await sendMessage(sender._id.toString(),receiver._id.toString(),productId._id!.toString(),usermessage);
    if(res.success){

      const isSameProduct=res.payload.productId.toString()===productId?._id!.toString()

      const isSameConversation=(res.payload.senderId.toString()===sender?._id.toString() && res.payload.receiverId.toString()===receiver._id.toString()) ||
      (res.payload.senderId.toString()===receiver?._id.toString() && res.payload.receiverId.toString()===sender._id.toString())
setusermessage("");
      if (!isSameProduct || !isSameConversation) {
            return;
        }

        setusermessages(prev=>[...prev,res.payload])

      
    }


  }
  catch(err){
    console.log(err)
  }

}


  return (
    <div className="w-full h-full flex ">

        <form className="w-full flex items-center justify-start p-3 gap-6" onSubmit={handleSubmit}>
            <Input type="text" placeholder="enter your message..." className="w-250" id="message" value={usermessage} onChange={(e)=>setusermessage(e.target.value)}/>
            
            <Button type="submit"><SendHorizonal className="w-8 h-8 cursor-pointer"   /></Button>
        </form>
      
    </div>
  )
}

export default Sendmessagediv
