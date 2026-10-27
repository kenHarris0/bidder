'use server'

import { auth } from "@clerk/nextjs/server"
import { connectDB } from "../db"
import User from "@/models/user.model"
import Product from "@/models/product.model"
import Message from "@/models/message"



export async function sendMessage(senderId:string,receiverId:string,productId:string,text:string){


    try{

        await connectDB()

         const {userId}=await auth()

        if(!userId){
            return{
                success:false
            }
        }


        const sender=await User.findOne({clerkId:userId});
        if(!sender){
            return{
                success:false
            }
        }

        const receiver=await User.findById(receiverId);
        if(!receiver){
            return{
                success:false
            }
        }
        const product=await Product.findById(productId)
 if(!product){
            return{
                success:false
            }
        }


        const newMessage=await Message.create({
            senderId,
            receiverId,
            productId,
            text
        })

        return{
            success:true,
            payload:JSON.parse(JSON.stringify(newMessage))
        }




    }
    catch(err){
        console.log(err);
        return{
            success:false,
            error:err
        }
    }
}