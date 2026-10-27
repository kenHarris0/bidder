import mongoose from "mongoose"
import { IMessage } from "./type";




const messageSchema=new mongoose.Schema({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    text:{
        type:String
    },
    image:{
        type:String,
        
    }
    
    
},{timestamps:true})


const Message=mongoose.models.message || mongoose.model<IMessage>("message",messageSchema);

export default Message;
