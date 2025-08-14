import Image from 'next/image'
import React from 'react'

export const Folder = ({title,subtitle}) => {
  return (
   <div className="border-[1px] bg-[ur(/folder.svg)] bg-contain border-gray-200 rounded-xl min-w-72  min-h-44  p-4 space-y-7 flex-col flex justify-between">
    <div className='space-y-4'>
        <h3 className='font-bold text-sm'>{title}</h3>
        <p className='text-[10px] text-gray-400'>{subtitle}</p>
    </div>
    <div className='flex flex-col gap-y-3 '>
        {/* <h3 className='text-xl font-semibold '>{title}</h3> */}
        <p>{count} Files</p>
    </div>
   </div> 
  )
}
