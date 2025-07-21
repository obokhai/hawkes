"use client"
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
import PropertyListing from "@/components/PropertyListing";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Properties from "../attached_pages/Properties";
import JV from "../attached_pages/JV";
import Files from "../attached_pages/Files";
import Message from "../attached_pages/Message";
import Calendar from "../attached_pages/Calendar";
import Settings from "../attached_pages/Settings";
import AdminDashboard from "../attached_pages/AdminDashboard";
import Client from "../attached_pages/Client";
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

const options = [
    { name: "Dashboard", icon: "dashboard_admin.svg" },
    { name: "Properties", icon: "property.svg" },
    { name: "Clients", icon: "clients.svg" },
    { name: "JV", icon: "JV.svg" },
    { name: "Files", icon: "Paper.svg" },
    { name: "Calendar", icon: "calendar.svg" },
    { name: "Message", icon: "message.svg" },
    { name: "Settings", icon: "cog.svg" },
  ];

export default function Dashboard(){
    const router = useRouter()

     const logout = () => {
            console.log('Logout Triggered')
            Cookies.remove('token');
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            router.push('/');
          };
       
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  if (tab && options.some(opt => opt.name === tab)) {
    setActive(tab);
  } else {
    setActive("Dashboard"); // Default to Dashboard if no tab param
  }
}, []);

    const [active, setActive] = useState("Dashboard")
    // console.log("Current active tab:", active);
    const handleTabChange = (tabName) => {
      setActive(tabName);
      if (tabName === "Dashboard") {
        router.push("/dashboard"); // No query param for Dashboard
      } else {
        router.push(`/dashboard?tab=${encodeURIComponent(tabName)}`);
      }
    };

    const profile =() =>{
      router.push( `/dashboard?tab=${encodeURIComponent('Settings')}` )
      setActive("Settings")
    }

    return(
        <main className="flex h-full relative">
            <Image src='/hawkes_stripe.svg' className="absolute top-0 right-0 -z-10" width={500} height={60} />
           <div className="w-20 min-h-screen z-10  bg-white flex flex-col py-4 gap-y-4 fixed top-0">
                   <Image src="/logo.svg" alt="Logo" className="w-12 h-12 mb-6 ms-3" width={12} height={12} />
                   <div className="flex flex-col items-center space-y-3 py-6 h-[70vh] bg-[#6434F8] relative rounded-tr-xl rounded-br-xl me-3">
                      {options.map((data, index) => (
                        <div className="flex">
                        <div
                          key={index}
                          className={`cursor-pointer flex ${
                            active === data.name
                              ? "text-[#6434F8] opacity-100 rounded-xl"
                              : "text-white opacity-80 hover:opacity-100"
                          }`}
                          onClick={() => handleTabChange(data.name)}
                        >
                          <Image
                            src={active === data.name ? `/active_${data.icon}` : `/${data.icon}`}
                            className="w-4 h-5 mb-4"
                            alt="property"
                            width={14}
                            height={12}
                          />
                        </div>
                        { active === data.name &&(
                          <Tally1  className="absolute -right-10 text-teal-400 -mt-1" size={30  }/>
                        )

                        }
                        </div>
                      ))}
              </div>
            </div>
           <div className="flex flex-col flex-1 bg-gray-100">
             <div className="w-full h-20 z-50 bg-white text-gray-500 fixed left-20 flex items-center justify-between pe-24  ps-12 pb-1">
             {/* <span className="font-semibold text-xs">{active}</span> */}
             <Breadcrumbs/>
                         <div className="flex justify-between bg-gray-200 px-3 rounded-lg">
                             <input
                                 type="text"
                                 placeholder="Search anything..."
                                 className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none placeholder:text-gray-600 placeholder:text-sm "
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
             <div className="min-h-screen">
                {
                (()=> {
                    switch (active) {
                    case 'Dashboard':
                    return <AdminDashboard/>
                    case 'Clients' :
                    return <Client/>    
                    case 'Properties':
                    return <Properties/>
                    case 'JV':
                    return <JV/>
                    case 'Files':
                    return <Files/>
                    case 'Calendar':
                    return <Calendar />
                    case 'Message':
                    return <Message />
                    case 'Settings':
                    return <Settings />
                    default:
                    return null
                }
                })()
                }
             </div>
             
            </div>  
        </main>
    )
}