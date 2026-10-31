'use client'

import { bidderContext } from "@/context/Context"
import { IUser } from "@/models/type"
import { IProduct } from "@/models/type"
import { User } from "lucide-react"
import { useContext, useEffect } from "react"

type Productbuyertype={
  product:IProduct,
  buyerss:IUser[]
}

const OwnerSidebar = ({data,receiver}:{data:Productbuyertype[],receiver:IUser}) => {

  const {chatdetails,setchatdetails} = useContext(bidderContext)!





  return (
    <div className="w-full h-full flex flex-col p-5 gap-10">

        <h1 className="text-2xl font-bold text-orange-500">Buyer's</h1>

        <div className="w-full h-150 border p-5 overflow-auto flex flex-col gap-5">

        
        {data.map((item)=>{

          return(
            <div className="w-full min-h-30  flex flex-col gap-5 border p-2">
              <h1>{item?.product?.name}</h1>

              <div className="w-full flex flex-col min-h-15 h-fit  overflow-auto p-2" >
                {item?.buyerss.map((buyer)=>{
                  return(
                    <p className="inline-block w-full h-8 bg-gray-300 p-1 text-sm rounded cursor-pointer hover:scale-[1.04] transition-all 0.3s"
                    onClick={()=>setchatdetails(prev=>({...prev,receiver:buyer,sender:receiver,product:item?.product}))}
                    ><User className="inline w-5 h-5 pr-1"/>{buyer?.name}</p>
                  )
                })}

              </div>

            </div>
          )
            
        })}

        </div>


      
    </div>
  )
}

export default OwnerSidebar
