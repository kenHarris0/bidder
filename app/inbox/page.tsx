import OwnerSidebar from "@/components/Chatcompo/OwnerSidebar"
import Rightchatbar from "@/components/Rigthchatbar"
import { connectDB } from "@/lib/db"
import Message from "@/models/message"
import Product from "@/models/product.model"
import User from "@/models/user.model"
import { auth } from "@clerk/nextjs/server"






export default async function OwnerInbox(){

    await connectDB()
    const {userId}=await auth()

    const curruser=await User.findOne({clerkId:userId})

     const userProducts=await Product.find({ownerId:curruser._id});

     const ProductBuyers=await Promise.all(
        userProducts.map(async(product)=>{
        const buyers=await Message.find({productId:product._id,receiverId:curruser._id}).select("senderId");

        const buyerIds=[... new Set(buyers.map(buyer=>buyer.senderId.toString()))]

        const buyerss=await User.find({
            _id:{$in:buyerIds}
        })
        return{
            product,
            buyerss
        }
     })

    )

console.log(ProductBuyers)


    return(



    <div className="w-[90%] h-screen flex justify-between ">

        <div className="w-[27%] h-full border">
            <OwnerSidebar data={ProductBuyers} receiver={JSON.parse(JSON.stringify(curruser))}/>

        </div>

        <div className="w-[70%] h-full border">

            <Rightchatbar/>
            

            

        </div>

    </div>



)}