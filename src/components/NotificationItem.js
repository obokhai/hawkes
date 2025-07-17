import Image from 'next/image'
import React from 'react'

const NotificationItem = ({src, desc,time, note}) => {
  return (
    <div className='flex items-center'>
        <Image src={`/${src}`} height={40} width={40} className='rounded-full' />
        <span className='flex flex-col gap-y-3'>
            <p className='text-xs'>{desc} "<span className='font-bold'>{note}</span>"</p>
            <p className='text-gray-400 text-xs'>{time}</p>
        </span>
    </div>
  )
}

export default NotificationItem