'use client'



import {useClerk,UserButton} from "@clerk/nextjs"
import { Button } from "./ui/button";
import { useContext } from "react";
import { bidderContext } from "@/context/Context";
import { Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export const Navbar = () => {


  const {openSignIn}=useClerk();

  const {userdata}=useContext(bidderContext)!
  const router=useRouter()




  return (
    <div className="w-full h-13 border-b-white-500 p-1 flex justify-between border">

      <div className="w-1/4  items-center flex p-3">
        <h1 className="text-4xl font-extrabold">BIDDER</h1>
      </div>

      <div className="w-150 flex items-center ">
        <InputGroup className="max-w-xl">
        <InputGroupInput placeholder="search...."/>
        <InputGroupAddon>
        <Search/>
        </InputGroupAddon>
        </InputGroup>
      </div>



      <div className="w-1/4  flex justify-between gap-15 items-center p-2 ml-90 ">

      <p className="text-sm font-medium hover:underline hover:cursor-pointer">About</p>
      <p className="text-sm font-medium hover:underline hover:cursor-pointer">Auctions</p>
      <p className="text-sm  font-medium hover:underline hover:cursor-pointer" onClick={()=>router.push('/items/listitems')}>List Items</p>

      </div>


      <div className="w-1/4  justify-end flex p-1 pr-10">
      {!userdata ?
      <Button variant="secondary" className="cursor-pointer" onClick={()=>openSignIn()}>Sign In</Button>
      :
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action label="your bids" labelIcon={<User/>} onClick={()=>router.push('/')}/>
        </UserButton.MenuItems>
      </UserButton> 
      
    }


        
        

      </div>
      
    </div>
  )
}


