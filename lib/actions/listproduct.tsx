'use server'

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "../db"
import User from "@/models/user.model";
import { IProduct, producttype } from "@/models/type";
import cloudinary from "../cloudinary";
import Product from "@/models/product.model";



export async function ListProduct(productdata:producttype,photos:string[]){
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


        let images:string[]=[];


        if(!photos || photos.length ===0){
            return {
                success:false,
                message:"please add images to list item fro crediblity"
            }

        }




        const cloudnaryimg=await Promise.all(
            photos.map(async(photo)=>await cloudinary.uploader.upload(photo))
        )

        images=cloudnaryimg.map(photo=>photo.secure_url)

        const newProduct=await Product.create({
            ...productdata,
            photos:images,
            ownerId:currUser?._id
        })



        return {
            success:true,
            payload:JSON.parse(JSON.stringify(newProduct))
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




