'use client'
import { useState , useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Plus } from "lucide-react"
const Team = () => {
    const [userType, setUserType] = useState('');
    const [usersByRole, setUsersByRole] = useState([]);
    const [totalClients, setTotalClients] = useState(0)

  const fetchUsersByRole = async () => {
    const token = localStorage.getItem("token")
    try {
      if (!token) throw new Error("No token found.");
  
      const response = await fetch('https://propertyapi-monolithic.onrender.com/api/v1/user/role?roleId=3', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error("Failed to fetch users");
  
      const data = await response.json();
      setUsersByRole(data?.data?.users || []);
      setTotalClients(usersByRole.length+1)
    } catch (error) {
      console.error("Fetch Error:", error);
      // alert("Failed to load users. Check console for more details.");
    }
  };

    useEffect(() => {
      const fetchData = async () => {
        await fetchUsersByRole();
      };
      fetchData();
    }, []);
return(
  <>
      <div className='mt-16 mx-12'>
        <div className='w-full flex justify-between items-center mb-4'>
          <span className='flex gap-x-5 items-center'>
            <p>All 56</p>
            <button className='bg-blue-800 flex items-center gap-x-4 text-white text-xs min-w-24 min-h-10 px-4 rounded-full '> Add New <Plus /></button>
          </span>
          <span className='flex gap-x-3 items-center'>
            <Image src="/search_team.svg" width={22} height={22} />
            <Image src="/setting.svg" width={22} height={22} />
            <Image src="/filter_team.svg" width={22} height={22} />
          </span>
        </div>
        <Table className="space-y-6  table border-b table-fixed border-none">
                        <TableHeader className=" rounded-tr-2xl justify-evenly rounded-tl-2xl py-12">
                          <TableRow className="font-bold text-lg border-2 border-gray-200">
                            <TableHead className="w-[100px]"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>No. Of Allocated Properties</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="border-l-2 border-gray-200 border-r-2 ">
                        
        
                        {usersByRole.map((user, index) => (
                            <TableRow key={user.id} className="text-xs truncate border-gray-200 px-8">
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="font-medium gap-x-5 flex items-center">
                                <Image src="/avatar.svg" alt={`${user.firstName} ${user.lastName}`} width={50} height={50} className="rounded-full" />
                                {user.firstName} {user.lastName}
                              </TableCell>
                              <TableCell className="text-[#35A0E4]">Jvs@example.com</TableCell>
                              <TableCell>+1928019390490</TableCell>
                              <TableCell className="ps-12">{user.id}</TableCell>
                              <TableCell>
        
                              <Dialog className="w-full">
                                  <DialogTrigger asChild>
                                  <Image src="/three_dots.svg" alt="" className="mx-auto" width={12} height={12} /> 
                                  </DialogTrigger>
                                  <DialogContent className="w-full  bg-gray-200">
                                    <DialogHeader className='space-y-6'>
                                      <DialogTitle>Client Profile view</DialogTitle>
                                      <div className="border-b border-[1px] border-gray-300" />
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-x-3">
                                            <Image src='/avatar.svg' width={90} height={90} className="rounded-full" />
                                            <div className="flex flex-col">
                                              <h4 className="font-bold text-xs">{user.firstName} </h4>
                                              <p className="text-xs"> {user.role.name} </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-2 ">
                                          <Image alt="chat" src='/chat.svg' width={80} height={80} />
                                          <Image alt="mail" src='/send_mail.svg' width={110} height={100} />
                                        </div>
                                      </div>
                                    </DialogHeader>
                                    <div className="flex space-x-2 mx-2 mt-5 rounded-xl p-7 bg-gray-50 min-h-96 scroll-auto">
                                      <div className="flex flex-col gap-y-4">
                                          <div className="flex gap-x-4">
                                            <Image src="/jv_email.svg"  width={16} height={16} />
                                            <Link href="mailto:Kkwabiliah@gmail.com" className="text-cyan-400 text-sm">Kkwabiliah@gmail.com</Link>
                                          </div>
                                          <div className="flex gap-x-4">
                                            <Image src="/phone.svg" width={16} height={16} />
                                            <p className="text-sm">0932492349</p>
                                          </div>
                                          <div className="flex gap-x-4">
                                            <Image src="/location_icon.svg" alt="location" width={16} height={16} />
                                            <p className="text-sm">Amuwo-odofin Area, along Badagry Express Way, 
                                            Lagos, Nigeria</p>
                                          </div>

                                          <div className="my-3 border-[1px] border-gray-200" />
                                          <h5>Shared Assets: 2</h5>
                                          <div className="flex gap-x-3">
                                              <Image src="/property_icon.svg" alt="property" height={20} width={20} />
                                              <div className="text-xs flex-col">
                                                <p className="font-bold">Reeve Road<span className="font-light">- Pr-002 - 3390.567sq.mts</span></p>
                                                <p className="font-light">10 Reeve Road, Ikoyi, Eti- Osa Local Government Area, Lagos State</p>

                                              </div>
                                          </div>
                                          <div className="flex gap-x-3">
                                              <Image src="/property_icon.svg" alt="property" height={20} width={20} />
                                              <div className="text-xs flex-col">
                                                <p className="font-bold">Reeve Road<span className="font-light">- Pr-002 - 3390.567sq.mts</span></p>
                                                <p className="font-light">10 Reeve Road, Ikoyi, Eti- Osa Local Government Area, Lagos State</p>

                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                </TableCell>
                            </TableRow>
                            
                          ))}
                          
                        
                        </TableBody>
                  
        </Table>
      </div>
  </>
)
}

export default Team
