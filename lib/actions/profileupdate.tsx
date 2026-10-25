'use server'

import { auth } from "@clerk/nextjs/server"
import { connectDB } from "../db"
import User from "@/models/user.model"
import { newinfoType } from "@/components/Profileform"

export async function profileUpdate(updateInfo:newinfoType){
    try{

        await connectDB()

        const {userId}=await auth()

        if(!userId){
            return{
                success:false
            }
        }


        const currUser=await User.findOne({clerkId:userId});
        if(!currUser){
            return{
                success:false
            }
        }


        const updatedProfile=await User.updateOne({clerkId:userId},{
            $set:{
                name:updateInfo.name,
                location:updateInfo.location,
                contact:updateInfo.contact,
            }
            

        })


        return {
            success:true,
            payload:JSON.parse(JSON.stringify(updatedProfile))
        }

    }
    catch(err){
        console.log(err);
        return{
                success:false
            }
    }
}