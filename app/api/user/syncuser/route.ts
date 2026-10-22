import { connectDB } from "@/lib/db"
import { IUser } from "@/models/type";
import User from "@/models/user.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";




export async function POST(){
    try{

        await connectDB();

        const {userId}=await auth()


        let user=await User.findOne({clerkId:userId})
        

        if(!user){
            const currUser=await currentUser()

            const name=currUser?.firstName || currUser?.lastName || currUser?.emailAddresses[0].emailAddress.split('@')[0];
            const email=currUser?.emailAddresses[0]?.emailAddress;

             user= await User.create({
                clerkId:currUser?.id,
                name,
                email,

            })
        }

        return NextResponse.json({user:JSON.parse(JSON.stringify(user)),success:true})


    }
    catch(err){
        console.log(err)
    }
}