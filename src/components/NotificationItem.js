import Image from 'next/image'
import React from 'react'

const NotificationItem = ({src, desc,time, note, day}) => {
  return (
    <>
    <p className='flex-1 font-bold text-xs my-2 capitalize'>{day}</p>
    <div className='flex items-center gap-x-2 w-full h-12'>
        <Image src={`/${src}`} height={30} width={30} className='rounded-full' />
        <span className='flex flex-col gap-y-3 justify-center'>
            <p className='text-[10px]'>{desc} "<span className='font-bold'>{note}</span>"</p>
            <p className='text-gray-400 text-xs'>{time}</p>
        </span>
    </div>
    </>
  )
}

export default NotificationItem