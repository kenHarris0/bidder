



'use server'
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "../db"
import User from "@/models/user.model";
import Auction from "@/models/auction.model";



export async function addAuctionData(auctiondata:{startBid:number,startTime:Date},productId:string,ownerId:string){
    try{

          await connectDB();
                const {userId}=await auth();
                if(!userId){
                    return{
                        success:false,
                        message:"no user logged in"
                    }
                }
        
                const currUser=await User.findOne({clerkId:userId})
        
                if(!currUser){
                    return{
                        success:false,
                        message:"no user logged in"
                    }
                }
//check auction already exist

const auctionexist=await Auction.findOne({productId,ownerId});
if(auctionexist){
    return{
        success:false,
        message:"auction already exists"
    }
}
                

                if(auctiondata.startTime.getTime()<=Date.now()){
return{
    success:false,
    message:"invalid auction setup date"
}
                }


                const newAuction=await Auction.create({
                    ownerId,
                    productId,
                    ...auctiondata

                })


                return {
                    success:true,
                    payload:JSON.parse(JSON.stringify(newAuction))
                }
        

    }
    catch(err){
        console.log(err)
        return{
                        success:false,
                        message:err
                    }
    }
}