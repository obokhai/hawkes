"use client"
import { Airplay, ArrowUp, Monitor, SquarePlus, TrendingDown, UserRoundCheck, UsersRound } from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { message } from 'antd';
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
  return (
    <section className="mt-18 ms-28 me-10 min-h-screen flex flex-col gap-y-4 px-4 py-12 rounded-2xl mb-4" >
        <div className='flex gap-5'>
            <aside className='w-3/5 p-8 flex flex-col shadow-xl justify-around gap-y-14 rounded-2xl bg-white'>
                <div className='flex justify-between items-center'>
                  <span className='flex-col flex text-3xl font-bold'>Hello Alexander
                    <p className='text-lg mt-3 font-normal'>Here's Your Overview</p>
                  </span>
                  <Image src='/add_dashboard.svg' width={44} height={24} />
                </div>
                <div className='flex w-full gap-x-4'>
                  <div className='flex flex-col rounded-xl shadow-lg min-h-36 justify-between p-4 min-w-60'>
                      <span className='flex justify-between items-center w-full'>
                        <p className='text-sm text-gray-600'> Total Properties</p>
                        <span className='bg-green-200 rounded-full h-12 w-12 flex justify-center items-center'><Monitor/></span>
                      </span>
                      <h4 className='text-6xl'>210</h4>
                      <p className='text-xs flex items-center gap-x-2'><span className='flex items-center text-green-400'><ArrowUp/> 11%</span><span> this month</span></p>
                  </div>
                  <div className='flex flex-col rounded-xl shadow-lg justify-between min-h-36 p-4 min-w-60'>
                      <span className='flex justify-between items-center w-full'>
                        <p className='text-sm text-gray-600'> Total Clients</p>
                        <span className='bg-green-200 rounded-full h-12 w-12 font-light flex justify-center items-center'><UserRoundCheck/></span>
                      </span>
                      <h4 className='text-6xl'>5,423</h4>
                      <p className='text-xs flex items-center gap-x-2'><span className='flex items-center text-green-400'><ArrowUp/> 11%</span><span> this month</span></p>
                  </div>
                  <div className='flex flex-col rounded-xl shadow-lg justify-between min-h-36 p-4 min-w-60'>
                      <span className='flex justify-between items-center w-full'>
                        <p className='text-sm text-gray-600'> Total JV Partners</p>
                        <span className='bg-green-200 rounded-full h-12 w-12 font-light flex justify-center items-center'><UsersRound/></span>
                      </span>
                      <h4 className='text-6xl'>1,893</h4>
                      <p className='text-xs flex items-center gap-x-2'><span className='flex items-center text-green-400'><ArrowUp/> 11%</span><span> this month</span></p>
                  </div>


                </div>
            </aside>  
            <aside className='w-2/5 p-8 rounded-2xl bg-white'>
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
            <aside className='w-6/8 bg-white gap-y-12 shadow-xl rounded-xl p-6 text-[#232360] '>
              <span className='font-bold text-xl'>Upcoming deadlines</span>
              <div className='flex flex-col border-2 mt-6 rounded-xl'>
                  <div className='flex border-l-4  border-[#5A48F9] min-h-16 rounded-lg '>
                      <div className='w-1/6 bg-gray-300 flex justify-between p-2 flex-col'>
                          <span className='text-xs'>3, May 2025</span>
                          <span className='text-xs text-gray-600'>9:00 am</span>
                      </div>
                      <div className='w-5/6 flex items-center justify-between'>
                      <span className=' font-bold text-sm px-12'>Due Diligence on Asset #PR13</span>
                      <span className='flex items-center gap-x-8 mx-4'> 
                        <h5>Stage 4</h5>
                        <Image src='/InProgress.svg' width={100} height={100} />
                      </span>
                      </div>
                  </div>
              </div>
              <div className='flex flex-col border-2 mt-6 rounded-xl'>
                  <div className='flex border-l-4  border-[#5A48F9] min-h-16 rounded-lg '>
                      <div className='w-1/6 bg-gray-300 flex justify-between p-2 flex-col'>
                          <span className='text-xs'>3, May 2025</span>
                          <span className='text-xs text-gray-600'>9:00 am</span>
                      </div>
                      <div className='w-5/6 flex items-center justify-between'>
                      <span className=' font-bold text-sm px-12'>Due Diligence on Asset #PR13</span>
                      <span className='flex items-center gap-x-8 mx-4'> 
                        <h5>Stage 4</h5>
                        <Image src='/InProgress.svg' width={100} height={100} />
                      </span>
                      </div>
                  </div>
              </div>
              <div className='flex flex-col border-2 mt-6 rounded-xl'>
                  <div className='flex border-l-4  border-[#5A48F9] min-h-16 rounded-2xl '>
                      <div className='w-1/6 bg-gray-300 flex justify-between p-2 flex-col'>
                          <span className='text-xs'>3, May 2025</span>
                          <span className='text-xs text-gray-600'>9:00 am</span>
                      </div>
                      <div className='w-5/6 flex items-center justify-between'>
                      <span className=' font-bold text-sm px-12'>Due Diligence on Asset #PR13</span>
                      <span className='flex items-center gap-x-8 mx-4'> 
                        <h5>Stage 4</h5>
                        <Image src='/InProgress.svg' width={100} height={100} />
                      </span>
                      </div>
                  </div>
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