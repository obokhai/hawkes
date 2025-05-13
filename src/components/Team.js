'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Team = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const email = localStorage.getItem("userEmail") || "" 
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const token = localStorage.getItem("token")
      // make sure it's loaded
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
      const response = await axios.patch  (
        "https://propertyapi-api-gateway.onrender.com/api/v1/user/update-password",
        {  
          "NewPassword":newPassword,
          "ConfirmPassword":confirmPassword
        },
        {
          headers: {
            "Content-Type": "x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
          }
        }
      )

      console.log("Password update successful:", response.data)
      router.push("/dashboard")
    } catch (error) {
      console.error("Password update failed:", error.response?.data?.message || error.message)
    }
  }

  return (
    <form className='px-24 relative pb-12 w-full space-y-12' onSubmit={handleSubmit}>
      <ul className='my-8 leading-9'>
        <li>Password must be at least 5 characters long.</li>
        <li>Password must contain at least 1 letter and 1 digit.</li>
      </ul>

              <div className='w-2/4 space-y-6'>
              <label>Email</label>
                <div className='flex items-center gap-1 border-[1px] border-gray-200 bg-gray-300 rounded-lg py-3 px-4 gap-x-2  '>
                
                   <Image src='/email.svg' width={20} height={20} />
                   <input type='email' placeholder={`${email}`} disabled className='w-full  focus:outline-none border-none'  />
                 </div>
                 </div>
               
               <div className='w-1/3 gap-1'>
                 <label>Current Password</label>
                 <div className='flex items-center border-[1px] border-gray-200 bg-gray-300 rounded-lg py-3 px-4 gap-x-2  '>
                    
                   <input disabled type='email' placeholder='*********' className='w-full  focus:outline-none border-none'  />
                 </div>
               </div>

        
      <div className='flex gap-x-12'>
        <div className='w-1/3'>
          <label className=''>New Password</label>
          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='w-full py-2 mt-2 px-4 border-[1px] border-gray-200 rounded-lg'
            required
          />
        </div>
        <div className='w-1/3'>
          <label className=''>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full mt-2 py-2 px-4 border-[1px] border-gray-200 rounded-lg'
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className='text-white bg-[#5051F9] cursor-pointer rounded-xl text-sm h-16 w-44 mt-12 absolute -top-60 right-12 '
      >
        Update Password
      </button>
    </form>
  )
}

export default Team
