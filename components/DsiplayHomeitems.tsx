'use client'
import ProductCard from "@/components/ProductCard";
import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { IProduct } from "@/models/type";
import { useState } from "react";



const DsiplayHomeitems = ({allproducts}:{allproducts:IProduct[]}) => {

    const [filterCheckbox,setfilterchckbox]=useState<string>("all");

    const filteredProducts=allproducts.filter((prod)=>{
        if(filterCheckbox==="all"){
            return prod;
        }
        else{
            const isAUctionitem=prod?.isUpforauction ||false;

            if(filterCheckbox==="auction-items"){
                if(isAUctionitem){
                return prod;
                }
                else{
                    return
                }
            }
            else{
                 if(!isAUctionitem){
                return prod;
                }
                else{
                    return;
                }

            }
            
        }
    })

  return (
    <div className="w-full h-full flex flex-col">
        <div className="w-full h-40  p-5 pl-10">

        <FieldGroup className="max-w-xs">
          <Field orientation="horizontal">
            <Checkbox id="all" value="all" checked={filterCheckbox==="all"} onCheckedChange={(e)=>setfilterchckbox("all")}/>
            <Label htmlFor="all">all Items</Label>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="auction-items" value="auction-items" checked={filterCheckbox==="auction-items"} onCheckedChange={(e)=>setfilterchckbox("auction-items")}/>
            <Label htmlFor="auction-items"> Auction Items</Label>
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="non-auction-items" value="non-auction-items" checked={filterCheckbox==="non-auction-items"} onCheckedChange={(e)=>setfilterchckbox("non-auction-items")}/>
            <Label htmlFor="non-auction-items">Non Auction Items</Label>
          </Field>
        </FieldGroup>


      </div>



      {/* display all the products */}
      <div className="w-full p-10 min-h-300 overflow-auto grid grid-cols-4 gap-7">

      {filteredProducts.map((product)=>{
        const isAnauctionItem=product?.isUpforauction || false;

        return <ProductCard data={JSON.parse(JSON.stringify(product))} isAnauctionItem={isAnauctionItem} />


      })}
      </div>
      
    </div>
  )
}

export default DsiplayHomeitems
