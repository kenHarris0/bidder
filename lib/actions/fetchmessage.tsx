'use server'

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "../db"
import User from "@/models/user.model";
import Product from "@/models/product.model";
import Message from "@/models/message";


export async function fetchMessages(senderId:string,receiverId:string,productId:string){
    try{
        await connectDB()

        

        const sender=await User.findById(senderId)

        if(!sender){
            return{
                success:false,
                message:"no user logged in"
            }
        }
        const receiver=await User.findById(receiverId)

        if(!receiver){
            return{
                success:false,
                message:"no user logged in"
            }
        }

        const product=await Product.findById(productId)
        if(!product){
            return{
                success:false,
                message:"no user logged in"
            }
        }

        const messages=await Message.find({senderId,receiverId,productId})


        return {
            success:true,
            payload:JSON.parse(JSON.stringify(messages))
        }



    }
    catch(err){
        console.log(err)
        return{
            success:false
        }
    }

}