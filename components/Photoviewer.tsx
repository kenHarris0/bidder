'use client'

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft,ChevronRight } from 'lucide-react';

const Photoviewer = ({photos}:{photos:string[]}) => {

    const [currphoto,setcurrphoto]=useState<number>(0);
    const totlen=photos.length




  return (
    <div className="w-full h-150 border flex items-center justify-center gap-10">

   <ChevronLeft className="w-10 h-10 cursor-pointer hover:scale-[1.03] transition-all 0.3s" onClick={()=>setcurrphoto(prev=>{
    if(prev===0 ){
      return totlen-1;

   }
   else{
    return prev-1;
   }}
   )}/>
        <div className="w-[70%] m-auto h-[80%] relative">

            <Image src={photos[currphoto % totlen]} fill sizes="768" alt="x" className="object-contain"/>

        </div>

    <ChevronRight className="w-10 h-10 cursor-pointer hover:scale-[1.03] transition-all 0.3s" onClick={()=>setcurrphoto(prev=>prev+1)}/>
      
    </div>
  )
}

export default Photoviewer
