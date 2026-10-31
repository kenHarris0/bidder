import Chatbox from "@/components/Chatcompo/Chatbox";
import Chatcontainer from "@/components/Chatcompo/Chatcontainer";
import OwnerSidebar from "@/components/Chatcompo/OwnerSidebar";
import Sendmessagediv from "@/components/Chatcompo/Sendmessagediv";
import { connectDB } from "@/lib/db";
import Message from "@/models/message";
import Product from "@/models/product.model";
import { IMessage } from "@/models/type";
import User from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";



export  default async function Chatpage({params,searchParams}:{params:Promise<{id:string}>,searchParams:Promise<{productId:string}>}){


    const {id:receiverId}=await params;
    const {productId}=await searchParams;

    await connectDB()

    const {userId}=await auth()

    if(!userId){
        throw new Error("no user logged in")
    }

    const sender=await User.findOne({clerkId:userId})
if(!sender){
        throw new Error("no sender found")
    }

    const receiver=await User.findById(receiverId);
if(!receiver){
        throw new Error("no receiver found")
    }

    const currProduct=await Product.findById(productId)
if(!currProduct){
        throw new Error("no product found")
    }

    //get all messages buddy here
    const messages:IMessage[]=await Message.find({productId:currProduct._id,$or:[{senderId:sender._id,receiverId:receiver._id},{senderId:receiver._id,receiverId:sender._id}]}).sort({createdAt:1}).lean()





    return(
    <div className="w-[90%] h-screen flex flex-col  m-auto">
        <Chatbox receiver={JSON.parse(JSON.stringify(receiver))} sender={JSON.parse(JSON.stringify(sender))} currProduct={JSON.parse(JSON.stringify(currProduct))} messages={messages} />







</div>








    
)}