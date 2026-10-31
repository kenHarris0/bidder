'use client'

import { useState } from "react"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { addAuctionData } from "@/lib/actions/auctiondata"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const Auctionform = ({productId,ownerId}:{productId:string,ownerId:string}) => {
    const router=useRouter()

    const [auctioninfo,setauctioninfo]=useState<{startBid:number,startTime:string}>({
        startBid:100,
        startTime:""
    })


    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault()
        try{

            const auctionStartTime=new Date(auctioninfo.startTime)

            const res=await addAuctionData({startBid:auctioninfo.startBid,startTime:auctionStartTime},productId,ownerId);
            if(res.success){
                toast.success("auction added to queue successfully")

                setTimeout(() => {

                    router.push(`/product/${productId}`)

                    
                }, 2000);
            }


        }
        catch(err){
            console.log(err)
        }


    }
  return (
    <div className="w-full h-full">

        <form onSubmit={handlesubmit}>
            <FieldGroup>
                <Field>
                    <Label >StartBid</Label>
                    <Input type="number" id="inputBid" name="startBid" value={auctioninfo.startBid} onChange={(e)=>setauctioninfo(prev=>({...prev,startBid:Number(e.target.value)}))}/>
                </Field>

                <Field>
                    <Label >startTime</Label>
                    <Input type="datetime-local" id="startTime" name="startTime" value={auctioninfo.startTime} onChange={(e)=>setauctioninfo(prev=>({...prev,startTime:e.target.value}))}/>
                </Field>

                <Button type="submit" className="cursor-pointer">Add</Button>

            </FieldGroup>
        </form>
      
    </div>
  )
}

export default Auctionform
