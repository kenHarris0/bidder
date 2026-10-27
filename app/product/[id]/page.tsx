import Photoviewer from "@/components/Photoviewer";
import { Button } from "@/components/ui/button";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { LocationEdit, MessageCircle, PhoneCall, User2Icon } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({params}:{params:Promise<{id:string}>}){

    const {id}=await params;
    const {userId}=await auth()

    const currProduct=await Product.findById(id);
    if(!currProduct){
        throw new Error("no product found")
    }

     const currUser=await User.findOne({clerkId:userId});
     if(!currUser){
        throw new Error("no logged in user found")
    }

    const ownerInfo=await User.findById(currProduct?.ownerId);
     if(!ownerInfo){
        throw new Error("no product owner found")
    }

    const isOwner=currUser._id.toString()===ownerInfo._id.toString()





    return(
    <div className="w-full min-h-screen flex flex-col items-center">

     <div className="w-full h-150 mt-5">
         <Photoviewer photos={currProduct.photos}/>
        
     </div>

     {/* first block */}

     <div className="w-full h-60  mt-10 flex justify-between p-5">

       
<div className=" min-w-0 w-160 h-50 border rounded-2xl p-6 flex flex-col justify-center gap-4 bg-white shadow-sm">

  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
    {currProduct.name}
  </h1>

  <div className="flex flex-wrap items-center gap-3">

    <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
      <span className="text-gray-500">Year</span>
      {currProduct.year}
    </span>

    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
      <span className="text-gray-500">Category</span>
      {currProduct.category}
    </span>

  </div>

  <p className="text-sm text-gray-500">
    Product details and specifications
  </p>

</div>


        <div className="w-120 h-50 border p-5 flex flex-col gap-5"> 

            <h1 className="text-6xl font-semibold pb-2">${ currProduct?.price}</h1>

            <Button className="bg-blue-500 border-4 border-blue-200 text-xl w-full h-16 p-2 cursor-pointer hover:text-blue-700" >MAKE OFFER</Button>



        </div>

     </div>

{/* second block */}

<div className="w-full h-fit flex  justify-between p-6">
{/* left block */}
  <div className="w-200 min-h-170  p flex flex-col gap-6">
    <div className="w-160 h-50 border rounded-2xl flex flex-col items-start p-5 gap-5">

      <h1 className="text-3xl tracking-tight font-bold text-gray-900 pl-5">OVERVIEW</h1>

      <div className="w-full h-40  p-5 flex flex-1 justify-between items-center">

        <span className=" flex  gap-3 p-1">
          <span className="flex items-start">
<User2Icon className="w-8 h-8 "/>
          </span>
          
          <div className="flex flex-col items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-600">Owner</h3>
            <p className="text-sm font-heading text-blue-600">{ownerInfo?.name}</p>
          </div>
        </span>

        {/*location */}

        <span className=" flex  gap-3 p-1">
          <span className="flex items-start">
<LocationEdit className="w-8 h-8 "/>
          </span>
          
          <div className="flex flex-col items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-600">Location</h3>
            <p className="text-sm font-heading text-blue-600">{ownerInfo?.location || "not provided"}</p>
          </div>
        </span>

         {/*contact */}

        <span className=" flex  gap-3 p-1">
          <span className="flex items-start">
<PhoneCall className="w-8 h-8 "/>
          </span>
          
          <div className="flex flex-col items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-600">Contact</h3>
            <p className="text-sm font-heading text-blue-600">{ownerInfo?.contact || "not provided"}</p>
          </div>
        </span>


      </div>



    </div>

    <div className="w-160 min-h-150 flex flex-col border gap-10 p-6 rounded-2xl justify-start">
      <h1 className="text-3xl tracking-tight font-bold text-gray-900 pl-5">DESCRIPTION</h1>

      <p className="font-extralight ">{currProduct?.description}</p>

    </div>

  </div>






{/* right block */}
  <div className="w-120 h-50 border flex flex-col items-center justify-center gap-5">


{isOwner ? <Button className="bg-blue-500 border-4 border-blue-200 text-xl w-3/4 h-16 p-2 cursor-pointer hover:text-blue-700"
    disabled={ownerInfo._id.toString()===currUser._id.toString()}>
    <span>
      <MessageCircle className="w-12 h-12"/>
      </span> 
    CHAT WITH SELLER</Button>:
<Link href={`/chat/${ownerInfo?._id}?productId=${id}`}  className="w-3/4">
    <Button className="bg-blue-500 border-4 border-blue-200 text-xl w-full h-16 p-2 cursor-pointer hover:text-blue-700"
   >
    <span>
      <MessageCircle className="w-12 h-12"/>
      </span> 
    CHAT WITH SELLER</Button></Link>
}

    <Button className="bg-blue-500 border-4 border-blue-200 text-xl w-3/4 h-16 p-2 cursor-pointer hover:text-blue-700" >
    <span>
      <PhoneCall className="w-12 h-12"/>
      </span>  CALL SELLER</Button>



  </div>

</div>
     
       

    </div>

    )
}