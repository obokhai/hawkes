"use client"
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
import PropertyListing from "@/components/PropertyListing";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import Breadcrumbs from "@/components/Breadcrumbs";
import NotificationItem from "@/components/NotificationItem";
import { Tally1 } from "lucide-react";

export default function Navbar(){
    const router = useRouter()

    const logout = () => {
        console.log('Logout Triggered')
        Cookies.remove('token');
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        router.push('/');
      };
       const profile =() =>{
      router.push( `/dashboard?tab=${encodeURIComponent('Settings')}` )
      setActive("Settings")
    }

    return(
           <div className="w-full h-20 z-50 bg-white text-gray-500 fixed left-20 flex items-center justify-between pe-24  ps-12 pb-1">
             {/* <span className="font-semibold text-xs">{active}</span> */}
             <span className="max-w-96">

             <Breadcrumbs />
             </span>
                         <div className="flex justify-between bg-gray-200 px-3 rounded-lg">
                             <input
                                 type="text"
                                 placeholder="Search anything..."
                                 className="m px-4 py-2 border-0 rounded-lg focus:outline-none placeholder:text-gray-600 placeholder:text-sm "
                             />
                             <Image src="/search.svg" alt="" width={20} height={20} />  
                         </div>
                         <div className="flex items-center space-x-4">
                             <button className="text-gray-500">
                             <Image src="/grid_dot.svg" alt="" width={20} height={20} />
                             </button>
                             <Popover>
                             <button className="text-gray-500">
                              <PopoverTrigger>
                             <Image src="/notification.svg" alt="" width={20} height={20} />
                             </PopoverTrigger>
                             </button>

                             <PopoverContent className='flex flex-col jutify-center'>
                              <NotificationItem src='yoyin.svg' desc="Ray Arnold replies to Arnold’s comment on "note='Update Requirement list' />
                              <NotificationItem src='yoyin.svg' desc="Ray Arnold replies to Arnold’s comment on" note='Update Requirement list' />
                              <NotificationItem src='yoyin.svg' desc="Ray Arnold replies to Arnold’s comment on" note='Update Requirement list' />
                             </PopoverContent>
                             </Popover>
                             <div href="#" className="flex items-center space-x-4">
                              {/* <Image src="/caret_down.svg" alt="" width={20} height={20} />  */}
                                <DropdownMenu>
                                  <DropdownMenuTrigger> <Image src="/user_avatar.svg"  alt="" width={30} height={30} /></DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={profile}>My Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>logout</DropdownMenuItem>
                                  
                                  </DropdownMenuContent>
                                </DropdownMenu>
                             </div>
                         </div>
             </div>
    )
}   