'use client'

import { IMessage } from "@/models/type"

const Chatcontainer = ({messages}:{messages:IMessage[]}) => {
  return (
    <div className="w-full h-full flex flex-col">
        {messages.map((msg:IMessage,ind:number)=>{


return(
    <p>{msg.text}</p>
)
        })}
      
    </div>
  )
}

export default Chatcontainer
