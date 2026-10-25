'use client'

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft,ChevronRight } from 'lucide-react';

const Photoviewer = ({photos}:{photos:string[]}) => {

    const [currphoto,setcurrphoto]=useState<number>(0);
    const totlen=photos.length




  return (
    <div className="w-full h-150 border flex items-center justify-center gap-10">

   <ChevronLeft className="w-10 h-10 "/>
        <div className="w-[70%] m-auto h-[80%] relative">

            <Image src={photos[currphoto % totlen]} fill sizes="720" alt="x" className="object-cover"/>

        </div>

    <ChevronRight className="w-10 h-10 "/>
      
    </div>
  )
}

export default Photoviewer
