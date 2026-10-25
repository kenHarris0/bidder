import Photoviewer from "@/components/Photoviewer";
import Product from "@/models/product.model";




export default async function ProductPage({params}:{params:Promise<{id:string}>}){


    const {id}=await params;

    const currProduct=await Product.findById(id);
    if(!currProduct){
        throw new Error("no product found")
    }







    return(
    <div className="w-full h-screen flex flex-col items-center">

     <div>
        
     </div>
        <Photoviewer photos={currProduct.photos}/>

    </div>

    )
}