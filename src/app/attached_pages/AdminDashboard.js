"use client"
import { Airplay, ArrowUp, Monitor, SquarePlus, TrendingDown, UserRoundCheck, UsersRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import api from '../api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { message } from 'antd';
import Deadlines from '@/components/Deadlines';
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const messages = [
  {
    name: "Miss Adeyoyin",
    message: "Hey! How are you? I think ...",
    avatar: "yoyin.svg"
  },
  {
    name: "Eromonsele",
    message: "Hey! How are you? I think ...",
    avatar: "ero.svg"
  },
  {
    name: "Miss Chisom",
    message: "Hey! How are you? I think...",
    avatar: "chisom.svg"
  },
  {
    name: "Miss Chisom",
    message: "Hey! How are you? I think...",
    avatar: "chisom.svg"
  }
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const AdminDashboard = () => {
const [totalProperties, setTotalProperties] = useState('')
const [totalClients, setTotalClients] = useState('')
const [totalJV, setTotalJV ] = useState('')
const [deadlines, setDeadlines] = useState([])
const userName = localStorage.getItem("userName")
useEffect(() => {
   const token = localStorage.getItem("token")

   if (!token) {
    console.log("there is no token available")
   }
        async function fetchPosts() {  
     try {
       const res = await api.get('/dashboard/admin?clientId=3&JvId=2');
      
       const data = res.data

       console.log(data?.data);
       if (data?.data) {
        setDeadlines(data.data.tasks)
          setTotalProperties(data.data.totalProperties)
          setTotalJV(data.data.Joint_ventures)
          setTotalClients(data.data.clients)
          
       } else {
         console.error("No activeAsset found in the response");
        //  setProperties([]); // Or handle the empty case accordingly
       }
       // setProperties(data.data.activeAsset);
     } catch (err) {
       console.error(err);
     }
   }
   fetchPosts();
   
 }, []); 
 
  return (
    <section className="mt-18 ms-28 me-10 min-h-screen flex flex-col gap-y-4 px-4 py-12 rounded-2xl mb-4" >
        <div className='lg:flex-row  flex flex-col gap-5'>
            <aside className=' lg:w-3/5 max-lg:block p-8 flex flex-col shadow-xl justify-around gap-y-14 rounded-2xl bg-white'>
                <div className='flex justify-between items-center'>
                  <span className='flex-col flex text-3xl font-bold capitalize'>Hello {userName || 'Admin'}!
                    <p className='text-lg mt-3 font-normal'>Here's Your Overview</p>
                  </span>
                  <DropdownMenu className=" ">
                      <DropdownMenuTrigger> 
                       <Image src='/add_dashboard.svg' width={28} height={24} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuItem>Add Property</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >Add Client</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem> Add JV</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                  
                </div>
                <div className='flex justify-between items-center gap-x-4 w-full'>
                  <div className='flex flex-1 flex-col rounded-xl shadow-lg justify-between min-h-36 p-4 w-60'>
                      <span className='flex justify-between items-center w-full'>
                        <p className='text-xs text-gray-600'> Total Properties</p>
                        <span className='bg-green-200 rounded-full h-10 w-10 font-light flex justify-center items-center'><Monitor size={16}/></span>
                      </span>
                      <h4 className='text-6xl'>{totalProperties}</h4>
                      {/* <p className='text-xs flex items-center gap-x-2'><span className='flex items-center text-green-400'><ArrowUp/> 11%</span><span> this month</span></p> */}
                  </div>
                  <div className='flex flex-1 flex-col rounded-xl shadow-lg justify-between min-h-36 p-4 w-60'>
                      <span className='flex justify-between items-center w-full'>
                        <p className='text-xs text-gray-600'> Total Clients</p>
                        <span className='bg-green-200 rounded-full h-10 w-10 font-light flex justify-center items-center'><UserRoundCheck size={16}/></span>
                      </span>
                      <h4 className='text-6xl'>{totalClients}</h4>
                      {/* <p className='text-xs flex items-center gap-x-2'><span className='flex items-center text-green-400'><ArrowUp/> 11%</span><span> this month</span></p> */}
                  </div>
                  <div className='flex flex-1 flex-col rounded-xl shadow-lg justify-between min-h-36 p-4 w-60'>
                      <span className='flex justify-between items-center w-full'>
                        <p className='text-xs text-gray-600'> Total JV Partners</p>
                        <span className='bg-green-200 rounded-full h-10 w-10 font-light flex justify-center items-center'><UsersRound size={16}/></span>
                      </span>
                      <h4 className='text-6xl'>{totalJV}</h4>
                      {/* <p className='text-xs flex items-center gap-x-2'><span className='flex items-center text-green-400'><ArrowUp/> 11%</span><span> this month</span></p> */}
                  </div>
                </div>
            </aside>  
            <aside className='lg:w-2/5 max-lg:block p-8 rounded-2xl bg-white'>
            <Card>
              <CardHeader>
                <CardTitle className='flex justify-between items-center'>Task Completion Rate <Image src='/thisweek.svg' className='' width={111} height={60} /> </CardTitle>
                <CardDescription>72%</CardDescription>
              </CardHeader>
              <CardContent className='relative'>
                  <Image src='/chartdata.svg' className='' width={499} height={600} />
                  <Image src='chart1.svg' className='absolute top-10 left-12 ' width={320} height={120} />
                  <Image src='/chartover.svg' className='absolute top-0 left-12 ' width={320} height={120} />
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card></aside>


        </div>
        <div className='flex gap-x-3 min-h-32'>
            <aside className='w-6/8 bg-white gap-y-2 shadow-xl rounded-xl p-6 text-[#232360] '>
              <span className='font-bold text-xl'>Upcoming deadlines</span>
              <div className='flex flex-col'>
                {deadlines.map((item, index) => (
                  <Deadlines
                    key={index}
                    id={item.id}
                    taskName={item.taskName}
                    dueDate={new Date(item.dueDate).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                    time={new Date(item.dueDate).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}
                    priority={item.priority}
                    stage={item.stage.stagePosition}
                    status={item.status}
                    description={item.description}
                  />
                ))}
              </div>
            </aside>
            <aside className='w-2/8 bg-[#5A48F9] shadow-xl flex flex-col gap-y-6 rounded-xl p-6'>
              <span className='flex justify-between'>
                <h5 className='font-bold text-white'>Messages</h5>
                <p className='font-extralight text-xs text-white underline '>View All</p>
              </span>
              <div className='space-y-1'>
              {messages.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 text-white p-3 border-b-0 border-white">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm">{item.message}</div>
                  </div>
                </div>
              ))}
              </div>
            </aside>
        </div>
    </section>
  )
}

export default AdminDashboard