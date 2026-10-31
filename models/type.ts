import mongoose from "mongoose"



export interface IUser{
    _id:string,
    clerkId:string,
    name:string,
    email:string
    location?:string
    contact:number
}

export interface IProduct{
    _id?:string,
    ownerId:mongoose.Types.ObjectId,
    name:string
    description:string
    price:string
    category:  "Electronics"
  | "Mobiles"
  | "Cars"
  | "Fashion"
  | "Home & Kitchen"
  | "Books"
  | "Sports"
  | "Gaming";
  photos:string[]
  year:number,
  createdAt:Date
  isUpforauction?:boolean

}

export type producttype={
  name:string,
  description:string,
  price:number,
  year:number,
  category:string
  isUpforauction:boolean
}


export interface IMessage{
  senderId:mongoose.Types.ObjectId
  receiverId:mongoose.Types.ObjectId
  productId:mongoose.Types.ObjectId
  text:string
  image:string
}

export interface IAuction{
  _id?:string
  ownerId:mongoose.Types.ObjectId
  productId:mongoose.Types.ObjectId
  startBid:number
  startTime:Date

}