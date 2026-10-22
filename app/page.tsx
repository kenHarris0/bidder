'use client'

import Image from "next/image"
import Aucimage from "@/assets/image.png"
import Category from "@/components/Category";


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



export default function Home(){

  return(
    <div className="w-full min-h-screen border flex flex-col">
      {/* HERO SECTION */}

      <div className="w-full h-fit border mt-10 flex items-center justify-between">

<div className="w-1/2 p-5 ">

        <h1 className="text-8xl ">
          Explore What You Love With Our <span className="font-serif text-orange-400/90">Auctions</span> 
        </h1>
</div>

<div className="w-1/2 p-1  flex items-center justify-end">
  <Image src={Aucimage} alt="auc image" width={600} height={400} className="rounded-4xl hover:-translate-y-1.5 transition-all 0.5s  "/>
</div>




      </div>


      {/*categories*/}
      <div className="w-full h-fit flex gap-10 flex-wrap p-3">

         {categories?.map((category,ind)=>{
        return(
          <Category url={category.image} name={category.name} key={category.name}/>
        )
      })}

      </div>

     
      


    
    
    
    </div>
  )
}