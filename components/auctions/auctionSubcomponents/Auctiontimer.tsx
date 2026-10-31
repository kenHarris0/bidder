'use client'

import { difference } from "next/dist/build/utils";
import { useEffect, useState } from "react"

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


const Auctiontimer = ({startTime}:{startTime:string}) => {

const [timerdetail,settimerdetail]=useState<TimeLeft>({
    days:0,
    hours:0,
    minutes:0,
    seconds:0
})

const [islive,setislive]=useState(false)

useEffect(()=>{


    const updateTimer=()=>{

    const auctionTime=new Date(startTime).getTime();

    const difference=auctionTime-Date.now();

    if(difference<=0){
        setislive(true);
        return;

    }

    const totalSeconds=difference/1000;  // covnerting millsecs to seconds ,now we have total seconds in the diff

    const days= Math.floor(totalSeconds / (24*60*60) );

    const totalhrs=Math.floor((totalSeconds % (24*60*60)) / 3600) ;

    const minutes= Math.floor((totalSeconds % 3600 ) / 60 );

    const seconds=Math.floor((totalSeconds % 60))

    settimerdetail(prev=>({
        ...prev,
        days,
        hours:totalhrs,
        minutes,
        seconds}))

    setislive(false)

}

updateTimer()

 const interval=setInterval(() => {
    updateTimer()
    
}, 1000);


return()=>{
    clearInterval(interval)
}



},[startTime])


  if (islive) {
    return (
      <div className="text-green-500 font-semibold w-full h-40  flex items-center justify-center text-3xl">
        🔴 AUCTION LIVE
      </div>
    );
  }






  return (
    <div className="w-full h-40 border flex  flex-col items-center gap-4 p-2">
        <h1 className="text-xl text-blue-800">Auction Starts in :</h1>

        {!islive && (<div className=" w-full flex justify-evenly gap-5">

            <div className=" w-20 h-20  flex flex-col items-center justify-center gap-2 border rounded-2xl">
                <h1 className="text-orange-600">Days</h1>
                <p className="text-xl font-black">{timerdetail?.days}</p>

            </div>

            <div className=" w-20 h-20  flex flex-col items-center justify-center gap-2 border rounded-2xl">
                <h1 className="text-orange-600">Hours</h1>
                <p className="text-xl font-black">{timerdetail?.hours}</p>

            </div>


            <div className=" w-20 h-20  flex flex-col items-center justify-center gap-2 border rounded-2xl">
                <h1 className="text-orange-600">Minutes</h1>
                <p className="text-xl font-black">{timerdetail?.minutes}</p>

            </div>


            <div className=" w-20 h-20 flex flex-col items-center justify-center gap-2 border rounded-2xl">
                <h1 className="text-orange-600">Seconds</h1>
                <p className="text-xl font-black">{timerdetail?.seconds}</p>

            </div>

        </div>)}
        


      
    </div>
  )
}

export default Auctiontimer
