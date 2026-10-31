'use server'
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "../db"
import User from "@/models/user.model";
import Auction from "@/models/auction.model";

export async function delAuction(auctionId:string|undefined){
    try{

         await connectDB();
                        const {userId}=await auth();
                        if(!userId || !auctionId){
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

                       


                    const currauction=await Auction.findById(auctionId);
                     if(!currauction){
                            return{
                                success:false,
                                message:"no auction found"
                            }
                        }
 if(currUser._id.toString()!==currauction.ownerId.toString()){
    return{
                                success:false,
                                message:"unautorized"
                            }
 }

                        await Auction.findByIdAndDelete(auctionId);


                        return {
                            success:true,
                            message:"auction deleted successfully"
                        }

    }
    catch(err){
        console.log(err)

        return{
            success:false
        }
    }
}