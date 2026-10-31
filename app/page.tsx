

import Hero from "@/components/Hero"
import Category from "@/components/Category";
import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Product from "@/models/product.model";
import DsiplayHomeitems from "@/components/DsiplayHomeitems";





export default async function Home(){

  await connectDB();

  const allProducts=await Product.find().lean()
  


  type Category =
  | "Electronics"
  | "Mobiles"
  | "Cars"
  | "Fashion"
  | "Home & Kitchen"
  | "Books"
  | "Sports"
  | "Gaming";

const categories: { name: Category; image: string }[] = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
  },
  {
    name: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
  },
  {
    name: "Cars",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
  },
  {
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
  },
  {
    name: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
  },
  {
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
  },
];



  return(
    <div className="w-full min-h-screen  flex flex-col">
      {/* HERO SECTION */}

      <Hero/>

      


      {/*categories*/}
      <div className="w-full h-fit flex gap-7 flex-wrap p-10 border-t-2 justify-between">

         {categories?.map((category,ind)=>{
        return(
          <Category url={category.image} name={category.name} key={category.name}/>
        )
      })}

      </div>

      <div className="w-full h-fit  ">
        <DsiplayHomeitems allproducts={allProducts}/>


      </div>




     
      


    
    
    
    </div>
  )
}