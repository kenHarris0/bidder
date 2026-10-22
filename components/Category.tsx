import React from 'react'

const Category = ({url,name}:{url:string,name:string}) => {



  return (
    <div className='w-30 h-40  gap-2  hover:scale-[1.05] transition-all 0.5s cursor-pointer rounded-xl items-center flex flex-col p-1 '>

        <img src={url} alt={name} className='w-30 h-30 object-cover rounded-2xl border border-white/80'/>
        <p className='text-sm font-extrabold'>{name}</p>

      
    </div>
  )
}

export default Category
