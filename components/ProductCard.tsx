'use client'

import { IProduct } from "@/models/type"
import Image from "next/image"
import { Calendar1 } from 'lucide-react';
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";





const ProductCard = ({data}:{data:IProduct}) => {

  const router=useRouter()


  const [isPostedToday, setPostedToday] = useState(false)
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    const currDate = new Date()
    const createdAt = new Date(data.createdAt)

    setPostedToday(
      currDate.getDate() === createdAt.getDate() &&
      currDate.getMonth() === createdAt.getMonth() &&
      currDate.getFullYear() === createdAt.getFullYear()
    )

    setFormattedDate(
      createdAt.toLocaleDateString("en-IN")
    )
  }, [data.createdAt])


    
  return (
    <div className="flex flex-col w-80 h-100 border overflow-hidden rounded-2xl shadow-md hover:shadow-xl cursor-pointer hover:scale-[1.02] transition-all 0.3s"
    onClick={()=>router.push(`/product/${data._id}`)}>

        <div className="w-full h-[70%] relative ">
            <Image src={data?.photos[0]} alt={data?.name} fill sizes="320px" className="object-cover rounded-2xl"/>
        </div>

        <div className="w-full  h-[30%] flex">
            <div className="w-2 h-full bg-orange-500">

            </div>
            <div className="w-full p-3 flex flex-col h-[30%] gap-1">
                <div className="flex justify-between items-center ">
    <h1 className="text-2xl">${data?.price}</h1>
    <div className="flex items-center justify-center gap-1">
        <Calendar1 className="w-3 h-3"/>
        <span className="text-xs">{isPostedToday ? "Today" : formattedDate}</span>

    </div>
            

</div>
            
            <p className="text-xs">{data?.year}</p>
            <h4 className="text-sm font-mono">{data?.name}</h4>



            </div>


        </div>
      
    </div>
  )
}

export default ProductCard
