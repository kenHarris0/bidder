'use client'

import { IMessage } from "@/models/type"

import {Bubble, BubbleContent} from '@/components/ui/bubble'

const Chatcontainer = ({messages,sender}:{messages:IMessage[],sender:string}) => {



  return (
    <div className="w-full h-full flex flex-col gap-5 overflow-auto">
        {messages.map((msg:IMessage,ind:number)=>{
          const msgsender=msg.senderId.toString();
          const isSender=msgsender===sender


return(
  <Bubble align={`${isSender?"end":"start"}`} variant="secondary">
    <BubbleContent >{msg.text}</BubbleContent>
  </Bubble>
   
)
        })}
      
    </div>
  )
}

export default Chatcontainer
