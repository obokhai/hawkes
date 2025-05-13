import Image from 'next/image'
import React from 'react'

export const Folder = ({folder_image,title,count}) => {
  return (
   <div className="border-[1px] border-gray-200 rounded-xl min-w-72  min-h-44  p-4 space-y-7 flex-col flex justify-between">
    <div className='flex justify-between'>
        <Image src={folder_image} alt='' width={40} height={40} />
    </div>
    <div className='flex flex-col gap-y-3 '>
        <h3 className='text-xl font-semibold '>{title}</h3>
        <p>{count} Files</p>
    </div>
   </div> 
  )
}
