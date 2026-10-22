'use client'

import { IUser } from "@/models/type"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { createContext, useEffect, useState } from "react"






interface ContextType{
  userdata:IUser | null
  user:ReturnType<typeof useUser>["user"]


}

export const bidderContext=createContext<ContextType | null>(null)

const Context = ({children}:{children:React.ReactNode}) => {


  const {user,isLoaded,isSignedIn}=useUser();

  const [userdata,setuserdata]=useState<IUser | null>(null)


  useEffect(()=>{

    const reqhitter=async()=>{
      const res=await axios.post('/api/user/syncuser');
      if(res.data.success){

        setuserdata(res.data.user);

      }
    }

    if(isLoaded && isSignedIn){
    reqhitter()
    }



  },[isLoaded,isSignedIn])


    


    let data:ContextType={
      userdata,
      user

    }


  return (
    <div>

        <bidderContext.Provider value={data}>
            {children}

        </bidderContext.Provider>
      
    </div>
  )
}

export default Context
