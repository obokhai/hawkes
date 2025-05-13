// import { useState } from 'react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation';

// const Password = () => {
//   const [password, setPassword] = useState("");
// const [confirmPassword, setConfirmPassword] = useState("");
// const [showPassword, setShowPassword] = useState(false)
// const [showConfirmPassword, setShowConfirmPassword] = useState(false)
// const email =''
// const router = useRouter();

// const handleSubmit = async (event) => {
//   event.preventDefault(); // Prevent default form submission

//   try {
//     const response = await axios.post(
      
//      "http://142.93.120.75:3000/api/v1/auth/update-password",
//       { 
//        email:localStorage.getItem("userEmail"),
//         password,
//         confirmPassword
//      },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Login Successful:", response.data);
//     router.push("/dashboard");
//   } catch (error) {
//     console.log(email)
//     console.log(password)
//     console.error("Login failed:", error.response?.data?.message || error.message);
//   }
// };
//   return (
//     <div className='px-24 pb-12'> 
//     <ul className='my-8 leading-9'>
//       <li>
//       Password must be at least 5 characters long.
//       </li>
//       <li> Password must contain at least 1 letter and 1 digit.</li>
//     </ul>
//           <form className='w-full space-y-12' onSubmit={handleSubmit}>
//               <div className='w-2/3'>
//                 <label>Email</label>
//                 <div className='flex items-center  border-[1px] border-gray-200 bg-gray-300 rounded-lg py-3 px-4 gap-x-2  '>
//                     <Image src='/email.svg' width={20} height={20} />
//                   <input type='email' placeholder='Email' disabled className='w-full  focus:outline-none border-none'  />
//                 </div>
//               </div>
//               <div className='w-1/3'>
//                 <label>Current Password</label>
//                 <div className='flex items-center  border-[1px] border-gray-200 bg-gray-300 rounded-lg py-3 px-4 gap-x-2  '>
//                     <Image src='/email.svg' width={20} height={20} />
//                   <input disabled type='email' placeholder='Email' className='w-full  focus:outline-none border-none'  />
//                 </div>
//               </div>
                           
//               <div className='flex gap-x-12'>
//                   <div className='w-1/3' >
//                     <label className=''> New Password</label>
//                     <input type='password' placeholder='' className='w-full py-2 mt-2 px-4 border-[1px] border-gray-200 rounded-lg'/>
//                   </div>
//                   <div className='w-1/3' >
//                     <label className=''> Confirm Password</label>
//                     <input type='password' placeholder='' className='w-full mt-2 py-2 px-4 border-[1px] border-gray-200 rounded-lg '/>
//                  </div>
//               </div>
//           </form>
//         </div>
//   )
// }

// export default Password


'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Password = () => {
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

export default Password
