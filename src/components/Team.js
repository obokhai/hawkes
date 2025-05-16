'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Team = () => {
  // const [newPassword, setNewPassword] = useState("")
  // const [confirmPassword, setConfirmPassword] = useState("")
  // const router = useRouter()
  // const email = localStorage.getItem("userEmail") || "" 
  // const handleSubmit = async (event) => {
  //   event.preventDefault()
    
  //   try {
  //     const token = localStorage.getItem("token")
  //     // make sure it's loaded
  //     if (!token) {
  //       console.error("Token not found in localStorage");
  //       return;
  //     }
  //     const response = await axios.patch  (
  //       "https://propertyapi-api-gateway.onrender.com/api/v1/user/update-password",
  //       {  
  //         "NewPassword":newPassword,
  //         "ConfirmPassword":confirmPassword
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "x-www-form-urlencoded",
  //           "Authorization": `Bearer ${token}`
  //         }
  //       }
  //     )

  //     console.log("Password update successful:", response.data)
  //     router.push("/dashboard")
  //   } catch (error) {
  //     console.error("Password update failed:", error.response?.data?.message || error.message)
  //   }
  // }

  // return (
  //          <Table className="space-y-6">
  //                     <TableHeader className=" rounded-tr-2xl rounded-tl-2xl py-12">
  //                       <TableRow className="font-bold text-lg border-2 border-gray-200">
  //                         <TableHead className="w-[100px]"></TableHead>
  //                         <TableHead>Name</TableHead>
  //                         <TableHead>Email</TableHead>
  //                         <TableHead>Phone Number</TableHead>
  //                         <TableHead>No. Of Allocated Properties</TableHead>
  //                         <TableHead className=""></TableHead>
  //                       </TableRow>
  //                     </TableHeader>
  //                     <TableBody className="border-l-2 border-gray-200 border-r-2 ">
                      
       
  //                      {Array.isArray(usersByRole) && usersByRole.map((user, index) => (
  //                         <TableRow key={user.id} className="text-xs truncate border-gray-200 px-8">
  //                           <TableCell>{index + 1}</TableCell>
  //                           <TableCell className="font-medium gap-x-5 flex items-center">
  //                             <Image src="/avatar.svg" alt={`${user.firstName} ${user.lastName}`} width={50} height={50} className="rounded-full" />
  //                             {user.firstName} {user.lastName}
  //                           </TableCell>
  //                           <TableCell className="text-[#35A0E4]">Jvs@example.com</TableCell>
  //                           <TableCell>+1928019390490</TableCell>
  //                           <TableCell className="ps-12">{user.id}</TableCell>
  //                           <TableCell>
  // )
}

export default Team
