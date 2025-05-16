"use client"
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
import PropertyListing from "@/components/PropertyListing";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Properties from "../attached_pages/Properties";
import JV from "../attached_pages/JV";
import Files from "../attached_pages/Files";
import Message from "../attached_pages/Message";
import Calendar from "../attached_pages/Calendar";
import Settings from "../attached_pages/Settings";
import AdminDashboard from "../attached_pages/AdminDashboard";
import Client from "../attached_pages/Client";
// import { useRouter } from "next/router";
import Cookies from 'js-cookie';

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

    // const router = useRouter()

     const logout = () => {
            console.log('Logout Triggered')
            Cookies.remove('token');
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
    
            router.push('/');
          };

    const [active, setActive] = useState("Dashboard")
    console.log("Current active tab:", active);
    return(
        <main className="flex h-full relative">
            <Image src='/hawkes_stripe.svg' className="absolute top-0 right-0 -z-10" width={500} height={60} />
           <div className="w-20 min-h-screen z-10  bg-white flex flex-col py-4 gap-y-14 fixed top-0">
                   <Image src="/logo.svg" alt="Logo" className="w-12 h-12 mb-6 ms-3" width={12} height={12} />
                   <div className="flex flex-col items-center space-y-6 py-6 bg-[#6434F8] rounded-tr-xl rounded-br-xl me-3">
                        {options.map((data, index)=>
                            <div key={index}  className="text-white opacity-80 hover:opacity-100 cursor-pointer`" onClick={()=>setActive(data.name)}>
                                 <Image src={`${data.icon}`} className="w-5 h-5 mb-4" alt="property" width={12} height={12} />
                            </div> 
                        )}
                   </div>
                  
                 </div>
           <div className="flex flex-col flex-1 bg-gray-100">
             <div className="w-full h-20 z-50 bg-white text-gray-500 fixed left-20 flex items-center justify-between px-12  pb-1">
             <span className="font-semibold text-xs">{active}</span>
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
                             <button className="text-gray-500">
                             <Image src="/notification.svg" alt="" width={20} height={20} />
                             </button>
                             <Link href="#" className="flex items-center space-x-4">
                                 <Image src="/user_avatar.svg" onClick={logout} alt="" width={20} height={20} />
                                 <Image src="/caret_down.svg" alt="" width={20} height={20} />
                             </Link>
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