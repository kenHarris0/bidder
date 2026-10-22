import mongoose from "mongoose"
import { IUser } from "./type";



const userSchema=new mongoose.Schema({
    clerkId:{
        type:String,
        unique:true
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    location:{
        type:String
    }
},{timestamps:true})


const User=mongoose.models.user || mongoose.model<IUser>("user",userSchema);

export default User;
