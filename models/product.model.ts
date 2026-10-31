import mongoose from "mongoose"
import { IProduct } from "./type";




const productSchema=new mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    photos:{
        type:[String]
    },
    category:{
    type: String,
    enum: [
      "Electronics",
      "Mobiles",
      "Cars",
      "Fashion",
      "Home & Kitchen",
      "Books",
      "Sports",
      "Gaming",]
    },
    year:{
        type:Number
    },
    isUpforauction:{
        type:Boolean,
        default:false
    }






},{timestamps:true})


const Product=mongoose.models.product || mongoose.model<IProduct>("product",productSchema);

export default Product;
