import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
const Profile = () => {
  const [roles, setRoles] = useState({})
  const getRoles = async(e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
          "https://propertyapi-monolithic.onrender.com/api/v1/roles",{
            headers:
            {
              "Authorization": `Bearer ${token}`
            }
          }
        )
        setRoles(response.data.data)
        
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getRoles
  }, [])
  
  return (
    <div className='px-24 pb-12 mt-16 relative'> 
      <form className='w-full  space-y-12'>
          <div className='flex gap-x-12'>
            <div className='w-1/3' >
              <label className=''> First name</label>
              <input type='text' placeholder='Firstname' className='w-full py-2 mt-2 px-4 border-[1px] border-gray-200 rounded-lg'/>
            </div>
            <div className='w-1/3' >
              <label className=''> Last name</label>
              <input type='text' placeholder='Lastname' className='w-full mt-2 py-2 px-4 border-[1px] border-gray-200 rounded-lg '/>
            </div>
          </div>
          <div className='w-2/3'>
          <label>Email</label>
          <div className='flex items-center  border-[1px] border-gray-200 rounded-lg py-3 px-4 gap-x-2  '>
              <Image src='/email.svg' width={20} height={20} />
            <input type='email' placeholder='Email' className='w-full  focus:outline-none border-none'  />
          </div>
          </div>
          <div className='w-2/3'>
            <label>Role</label>
            <select className='w-full mt-2 py-2 px-4 border-[1px] border-gray-200 rounded-lg'>
              {Array.isArray(roles) && roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <button
        type="submit" onClick={getRoles}
        className='text-white cursor-pointer bg-[#5051F9] rounded-xl text-sm h-12 w-32 mt-12 absolute -top-66 right-12 '
      >
        Save
      </button> 
      </form>
    </div>
  )
}

export default Profile