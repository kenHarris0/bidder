
'use client'

import { IMessage, IProduct, IUser } from "@/models/type"
import Chatcontainer from "./Chatcontainer"
import Sendmessagediv from "./Sendmessagediv"




const Chatbox = ({sender,receiver,currProduct,messages}:{sender:IUser,receiver:IUser,currProduct:IProduct,messages:IMessage[]}) => {


  return (
    <div className="w-full h-full flex flex-col">


            {/* header */}
        <div className="w-full min-h-13   border-b border-red-700 flex p-4 items-center justify-between">
            <h1 className="text-2xl font-sans"><span className="font-bold text-xl pr-2 text-orange-500">Owner:</span>{receiver?.name}</h1>
            <p className="font-mono text-sm"><span className="font-bold text-xl pr-2 text-orange-500">Product:</span>{currProduct?.name}</p>

        </div>
{/* chat body */}

<div className="w-full h-160  mt-10 p-6">
    <Chatcontainer messages={messages}/>

</div>


<div className="w-full h-15 ">
    <Sendmessagediv
  sender={sender?._id?.toString() ?? ""}
  receiver={receiver?._id?.toString() ?? ""}
  productId={currProduct?._id?.toString() ?? ""}
/>
</div>


      
    </div>
  )
}

export default Chatbox
