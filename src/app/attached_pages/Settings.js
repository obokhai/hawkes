import {useState} from 'react'
import Profile from '@/components/Profile'
import Password from '@/components/Password'
import Team from '@/components/Team'
import Image from 'next/image'
const options = [
  { name: "Profile", },
  { name: "Password",  },
  { name: "Team",  },
]




const Settings = () => {
  const [active, setActive] = useState("Profile")
  return (
    <div className='mt-40 ms-28 me-10 min-h-screen bg-white rounded-2xl py-12 mb-4'>
      <div className='w-full lg:mt-[-85px] bg-[url(/cover.svg)] rounded-tr-3xl bg-no-repeat bg-cover h-80'>
      
      </div>
     
          <div className="flex justify-between px-24 ">
          <Image src="/profile_cover.svg" alt="" height={250} width={250} className='rounded-full border-4 -mt-36 border-white'/>
          {/* <button  className='text-white bg-blue-600 rounded-xl text-sm h-16 w-44 mt-12 '>Update Password</button> */}
       </div>
       <div className="flex space-x-6 py-6 rounded-tr-xl rounded-br-xl me-3 px-24">
                              {options.map((data, index)=>
                             <div key={index}  className={`text-black flex opacity-80 hover:opacity-100 cursor-pointer ${active === data.name ?'text-lg font-semibold': ''}`} onClick={()=>setActive(data.name)}>
                              {data.name}
                           </div>
                              )}
                         </div>

                         {
                (()=> {
                    switch (active) {
                    case 'Profile':
                    return <Profile/>
                    case 'Password':
                    return <Password/>
                    case 'Team':
                    return <Team/>
                    default:
                    return null
                }
                })()
                }
    </div>
  )
}

export default Settings