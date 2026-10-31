'use client'

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import photoimg from "@/assets/photoadd.png"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import React, { useRef, useState } from "react"
import { ListProduct } from "@/lib/actions/listproduct"
import { producttype } from "@/models/type"


const Listitems = () => {
    const categories = [
  "Electronics",
  "Mobiles",
  "Cars",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Sports",
  "Gaming",
];


const [productdata,setproductdata]=useState<producttype>({
  name:"",
  description:"",
  price:0,
  year:0,
  category:"",
  isUpforauction:false,
  

});
const [photos,setphotos]=useState<string[]>([])

//for photo section

const handlePhotoSelect=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  const photos=Array.from(e?.target?.files ?? []);

  const base64images=await Promise.all(
    photos.map((file)=>
      new Promise<string>((resolve,reject)=>{


        const reader=new FileReader()

        reader.readAsDataURL(file);


        reader.onloadend=()=>{
          if(reader.result){
            resolve(reader.result as string)
          }
          else if(reader.error){
            reject(reader.error)
          }
          else{
            reject(new Error("failed to  read the entire image"))
          }

        }
      }
        
        
      
      )
    )
  )

  setphotos((prev)=>([...prev,...base64images]))




}

const photoref=useRef<HTMLInputElement>(null)

const submitProduct=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  try{
    const res=await ListProduct(productdata,photos);
    if(res.success){
      toast.success("Product added successfully")
      setproductdata({
         name:"",
  description:"",
  price:0,
  year:0,
  category:"",
  isUpforauction:false
      })
      setphotos([])
    }

  }
  catch(err){
    console.log(err)
  }
}

const photocount=photos?.length || 0;




  return (
    <div className="w-full h-screen flex flex-col mt-10 gap-13">

        <h1 className="text-5xl font-serif text-orange-500">LIST ITEM FOR AUCTION OR SALE</h1>

        <form className="w-1/2 border p-5" onSubmit={submitProduct}>
            <FieldGroup>
                <FieldLabel className="text-xl">Auction Product </FieldLabel>
                <FieldDescription>Details of your Auction item.Please enter the details below to list your item</FieldDescription>
             

             <Field>
                <Label>Name</Label>
                <Input type="text" placeholder="name..." id="name" value={productdata?.name} onChange={(e)=>setproductdata(prev=>({...prev,name:e.target.value}))}/>
             </Field>

              <Field>
                <Label>Description</Label>
                <Textarea rows={10}  placeholder="write..." id="description" value={productdata?.description} onChange={(e)=>setproductdata(prev=>({...prev,description:e.target.value}))}/>
             </Field>

             <Field>
              <Select value={productdata?.isUpforauction?"auction":"fixed"} onValueChange={(value)=>setproductdata(prev=>({...prev,isUpforauction:value==="auction"}))}>
                <SelectTrigger>
                  <SelectValue placeholder="select pricing type"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">fixed pricing</SelectItem>
                   <SelectItem value="auction">up for auction</SelectItem>
                </SelectContent>
              </Select>
             </Field>

             

             <Field>
                <Label>Price</Label>
                <Input type="number" placeholder="price..." id="price" value={productdata?.price} onChange={(e)=>setproductdata(prev=>({...prev,price:Number(e.target.value)}))}/>
             </Field>

             <Field>
                <Label>Year</Label>
                <Input type="number" placeholder="year..." id="year" value={productdata?.year} onChange={(e)=>setproductdata(prev=>({...prev,year:Number(e.target.value)}))}/>
             </Field>

             <Field >
                <Label>Category</Label>
                <Select value={productdata?.category} onValueChange={(value)=>setproductdata(prev=>({...prev,category:value}))}>
                    <SelectTrigger >
                        <SelectValue placeholder="select category"/>
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((cat,ind)=>{
                            return(
                                <SelectItem value={cat}>{cat}</SelectItem>
                            )
                        })}

                    </SelectContent>
                </Select>

             </Field>

             <Field>
                <div className="flex flex-col items-start gap-5 p-2">
                <Label>Photo's</Label>

                <div className=" relative border ">
                 <Image
    src={photoimg}
    alt="Upload photo"
    width={500}
    height={500}
    className="w-10 h-10 object-contain cursor-pointer"
    
    onClick={()=>photoref.current?.click()}

  />
   <p className="absolute -top-3 -right-2 border w-4  h-4 bg-red-400 flex items-center justify-center text-xs rounded-full ">{photocount}</p>
  </div>
  <Input type="file" multiple accept="image/*" onChange={handlePhotoSelect} ref={photoref} className="hidden"/>


 
  </div>
             </Field>



<Field >
   <div className="w-full ">
    <Button
      type="submit"
      variant="secondary"
      size="lg"
      className="w-1/4 cursor-pointer"
      
    >
      Submit
    </Button>
  </div>
</Field>

            </FieldGroup>

        </form>
        


        

      
    </div>
  )
}

export default Listitems
