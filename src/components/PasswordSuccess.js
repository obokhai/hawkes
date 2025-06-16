import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PasswordSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center mx-auto'>
        <span className='h-24 w-24 flex items-center bg-blue-100 justify-center rounded-full border border-blue-800'>
            <Image src="/mark.svg" className='text-blue-800 size-6' width={22} height={22} />
        </span>
            <div className='w-60 gap-y-6 mt-7 flex flex-col items-center text-center justify-center'>
                <p className='text-4xl font-bold'>Successful</p>
                <p className='text-xs font-light leading-5 break-normal tracking-wide'>Your password has been changed. Click continue to login</p>
                <Link href="/" className='bg-blue-900  text-white font-bold text-xs w-44 h-12 flex items-center justify-center rounded-full'>Continue</Link>
            </div>
    </div>
  )
}

export default PasswordSuccess