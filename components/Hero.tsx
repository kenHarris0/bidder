'use client'


import Aucimage from "@/assets/image.png"
import Image from "next/image"






const Hero = () => {
  return (
    <div className="w-full h-fit border-b-white mb-10 mt-10 flex items-center justify-between">

<div className="w-1/2 p-5 ">

        <h1 className="text-8xl ">
          Explore What You Love With Our <span className="font-serif text-orange-400/90">Auctions</span> 
        </h1>
</div>

<div className="w-1/2 p-1  flex items-center justify-end">
  <Image src={Aucimage} alt="auc image" width={600} height={400} className="rounded-4xl hover:-translate-y-1.5 transition-all 0.5s  "/>
</div>




      </div>
  )
}

export default Hero
