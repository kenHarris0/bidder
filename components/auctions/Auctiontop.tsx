'use client'
import { Dialog, DialogContent, DialogHeader, DialogTrigger,DialogTitle,DialogDescription } from "@/components/ui/dialog";
import { FieldGroup,Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Auctionform from "./Auctionform";
import { IAuction, IProduct, IUser } from "@/models/type";
import { delAuction } from "@/lib/actions/delauction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const Auctiontop = ({currProduct,ownerInfo,auctionData,isOwner}:{currProduct:IProduct,ownerInfo:IUser,auctionData:IAuction,isOwner:boolean}) => {
const router=useRouter()
    const deleteAuction=async()=>{
        try{

            const res=await delAuction(auctionData?._id?.toString());
            if(res.success){
                toast.success("auction info deleted")
                router.refresh()
            }

        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className="w-120 h-70 border p-5 flex flex-col gap-5 ml-40 items-center justify-start">

        {isOwner && (
        <div className="w-full flex-col flex items-center">
        {!auctionData ? 
        (<Dialog >
            <DialogTrigger>
         <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full h-10">
         Add auction info
      
    </Button>
    </DialogTrigger>

          <DialogContent>
            <DialogHeader>
               <DialogTitle>Auction Information</DialogTitle>
      <DialogDescription>
        Please enter the product starting bid amount and the date for listing it up for auction,
        remebere auction lasts for exactly 1 day/24 hrs.
      </DialogDescription>
            </DialogHeader>

            <Auctionform productId={currProduct._id!.toString()} ownerId={ownerInfo._id.toString()} />
          </DialogContent>

          
        </Dialog>)
        :
        ( <Button
        className="bg-red-600 hover:bg-red-700 cursor-pointer w-3/4 h-10"
        onClick={deleteAuction}
      >
        Delete auction info
      </Button>)


        }

        </div>)
}

        <FieldGroup>
        <Field>
         <Label>Starting bid</Label>
         <Input type="number" value={auctionData?.startBid || 0} disabled/>
          

        </Field>

        <Field>
         <Label>Starting Time</Label>
         <p className="text-2xl text-blue-600">
    {auctionData?.startTime
      ? new Date(auctionData.startTime).toLocaleString()
      : "Not scheduled"}
  </p>
          

        </Field>
        </FieldGroup>



        
        
        </div>
  )
}

export default Auctiontop
