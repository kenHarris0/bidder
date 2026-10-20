'use client'

import { createContext } from "react"






interface ContextType{


}

export const bidderContext=createContext<ContextType | null>(null)

const Context = ({children}:{children:React.ReactNode}) => {

    


    let data:ContextType={

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
