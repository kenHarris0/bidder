import { IAuction } from "@/models/type"
import Auctiontimer from "./auctionSubcomponents/Auctiontimer"


const Auctionbox = ({auctionData}:{auctionData:IAuction}) => {
  return (
    <div className='w-full h-full border rounded-2xl'>

    {/* timer and live indiacator */}
    <Auctiontimer startTime={auctionData?.startTime.toISOString()}/>
      
    </div>
  )
}

export default Auctionbox
