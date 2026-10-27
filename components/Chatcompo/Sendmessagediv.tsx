'use client'

import { Router, Send, SendHorizonal } from "lucide-react"
import { Input } from "../ui/input"
import React, { useRef, useState } from "react"
import { Button } from "../ui/button"
import { sendMessage } from "@/lib/actions/sendmessage"
import { useRouter } from "next/navigation"



const Sendmessagediv = ({sender,receiver,productId}:{sender:string,receiver:string,productId:string}) => {
  const router=useRouter();

    const [usermessage,setusermessage]=useState<string>("")
    const reff=useRef(null)


const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try{
    const res=await sendMessage(sender,receiver,productId,usermessage);
    if(res.success){
      setusermessage("");
      router.refresh();
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
