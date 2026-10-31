import mongoose from "mongoose"
import { IAuction } from "./type";





const auctionSchema=new mongoose.Schema({

   ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
  
    productId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    startBid:{
        type:Number
    },
    startTime:{
        type:Date
    }
    
    
},{timestamps:true})


const Auction=mongoose.models.auction || mongoose.model<IAuction>("auction",auctionSchema);

export default Auction;
