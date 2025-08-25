"use client"
import { Airplay, ArrowUp, Monitor, SquarePlus, TrendingDown, UserRoundCheck, UsersRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import api from '../api';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { toast } from 'sonner';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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
import nigeriaStates from "../data/States"
const AdminDashboard = () => {  
  const [currentStep, setCurrentStep] = useState(1);
const [userType, setUserType] = useState('');
const [propertyOpen, setPropertyOpen] = useState(false);
const [clientOpen, setClientOpen] = useState(false);
const [jvOpen, setJvOpen] = useState(false);
const [totalProperties, setTotalProperties] = useState('')
const [totalClients, setTotalClients] = useState('')
const [totalJV, setTotalJV ] = useState('')
const [deadlines, setDeadlines] = useState([])
const [file, setFile] = useState(null);
const [companyState, setCompanyState] = useState('');
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

   const [assetData, setAssetData] = useState({
     propertyName: "",
     address: "",
     authorizedUse: "",
     size: "",
     status: "",
   });
   const [roleData, setRoleData] = useState([]);
 
 
   const handleAssetChange = (e) => {
     const { name, value } = e.target;
     setAssetData((prev) => ({ ...prev, [name]: value }));
     console.log(assetData)
   };
 
  
   const handleRoleChange = (e) => {
     const { name, value } = e.target;
     setRoleData((prev) => ({ ...prev, [name]: value }));
   };
 
   const submitAsset =() =>{
     const payload = {
     asset: assetData,
       client: clientData,
     };
     console.log("Submitting all:", payload);
   }

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

   const handlePropertySubmit = async () => {
    try {
      console.log(assetData)
      const response = await api.post("/assets/create",assetData);

      toast.success(response.data.message)
     console.log(response.data)
      setPropertyOpen(false); // Close modal
     
    } catch (error) {
      toast.error(`Submission failed, ${error?.response?.data?.message}`);
      console.error("Submission Error:", error);
      // alert("Submission failed. Check console for details.");
    }
  };
    


  const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

  const [formData, setFormData] = useState({
       firstName: '',
       lastName: '',
       address: '',
       email: '',
       phoneNumber: '',
       role: 3,
       document: '',
       companyName: '',
     });
   const handleSubmit = async (e) => {
     e.preventDefault();
   
     try {
       const payload = {
         ...formData,
         userType,
         document: file ? file.name : ''
       };
   console.log(payload)
       const response= await api.post("https://propertyapi-monolithic.onrender.com/api/v1/user/create",payload)
       setClientOpen(false)
     } catch (error) {
       console.error("Submission Error:", error);
       toast.error(`Submission failed, ${error?.response?.data?.message}`);
     }
   };
   const [formDataJV, setFormDataJV] = useState({
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  phoneNumber: '',
  role: 2,
  document: '',
  companyName: '',
});



const handleJVChange = (e) => {
  const { name, value } = e.target;
  setFormDataJV((prev) => ({ ...prev, [name]: value, }));
};
const handleJVSubmit = async (e) => {
  e.preventDefault();

  try {

    const payload = {
      ...formDataJV,
      userType,
      companyState,
      document: file ? file.name : '',
    };


     const response= await api.post("https://propertyapi-monolithic.onrender.com/api/v1/user/create",payload)

    // const result = await response.json();
    console.log("Submitted:", response.data);
    toast.success("JV Partner added successfully");
  } catch (error) {
    console.error("Submission Error:", error);
    toast.error(`Submission failed, ${error?.response?.data?.message}`);
  }

  useEffect(() => {
  console.log("assetData updated:", assetData);
  console.log("formDataJV updated:", formDataJV);
}, [assetData, formDataJV]);
};
 
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
                        <DropdownMenuItem onClick={() => setPropertyOpen(true)}>
                          Add Property
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setClientOpen(true)}>
                          Add Client
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setJvOpen(true)}>
                          Add JV
                        </DropdownMenuItem>
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
            <aside className='w-full bg-white gap-y-2 shadow-xl rounded-xl p-6 text-[#232360] '>
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
            {/* <aside className='w-2/8 bg-[#5A48F9] shadow-xl flex flex-col gap-y-6 rounded-xl p-6'>
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
            </aside> */}
        </div>

    {/* Add Property */}
      {/* <Dialog open={propertyOpen} onOpenChange={setPropertyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Property Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full border p-2 rounded"
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}
   <Dialog open={propertyOpen} onOpenChange={setPropertyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
          </DialogHeader>
      <div className="max-h-[70vh] overflow-y-auto space-y-4">
              {currentStep === 1 && (
                    <>
                      {/* <h2 className="text-xl font-semibold mb-4">Add Asset</h2> */}
                      <div className="grid gap-4">
                        <label className='text-xs '>
                          Asset Name
                        <input name="propertyName" onChange={handleAssetChange} value={assetData.propertyName} placeholder="Asset Name" className=" mt-1 border p-2 rounded w-full" />
                        </label>
                        <label className='text-xs '>
                          Address
                        <input name="address" onChange={handleAssetChange} value={assetData.address} placeholder="Address" className="border p-2 mt-1  rounded w-full" />
                        </label>
                        <label className='text-xs '>
                          Authorized Use
                        <input name="authorizedUse" onChange={handleAssetChange} value={assetData.authorizedUse} placeholder="Authorized Use" className=" mt-1 border p-2 rounded w-full" />
                        </label>
                        <label className='text-xs '>
                          Size
                        <input name="size" onChange={handleAssetChange} value={assetData.size} placeholder="Size" className="border p-2 rounded mt-1  w-full" />
                        </label>
                        <label className='text-xs'>
                         Status
                        <div className='flex gap-x-6 w-1/2'>
                            {/* <input name="dateAdded" type="date" onChange={handleAssetChange} value={assetData.dateAdded} className="border p-2 rounded w-full" /> */}
                            <select name="status" onChange={handleAssetChange} value={assetData.status} placeholder="Select Status" className="border p-2 rounded w-full">
                              <option value="">Select Status</option>
                              <option value="active">active</option>
                              <option value="pending">pending</option>
                            </select>
                        </div>
                        </label>
                      </div>
                      <div className="flex justify-end mt-6">
                        <button onClick={handlePropertySubmit} className="bg-[#2C1C92] cursor-pointer text-white px-6 py-2 rounded-full">Submit</button>
                      </div>
                    </>
                  )}
                  

                </div>
                </DialogContent>
      </Dialog> 
    {/* End Add Property Dialog */}

    {/* Add Client */}
     <Dialog open={clientOpen} onOpenChange={setClientOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Client</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="mb-6 min-w-[400px] flex flex-col">
                                                  <label htmlFor="userType" className="block text-xs font-bold mb-2">User Type</label>
                                                  <select
                                                    id="userType"
                                                    value={userType}
                                                    onChange={(e) => setUserType(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md p-1 text-xs"
                                                  >
                                                    <option value="">Select</option>
                                                    <option value="individual">Individual</option>
                                                    <option value="company">Company</option>
                                                  </select>
                                                </div>
          
                                                 {userType === 'individual' && (
                                                                          <div className="space-y-4">
                                                                            <div className="flex gap-x-5">
                                                                              <label className="text-[10px] w-full">First Name
                                                                                <input name="firstName"
                                                                                  value={formData.firstName}
                                                                                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                  placeholder="First Name" className="w-full mt-1 border p-3 rounded" />
                                                                              </label>
                                                                              <label className="text-[10px] w-full">Last Name
                                                                                <input type="text"
                                                                                  name="lastName"
                                                                                  value={formData.lastName}
                                                                                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                  placeholder="Last Name" className="w-full mt-1 border p-3 rounded" />
                                                                              </label>
                                                                            </div>
                                                                            <label className="text-[10px]">Address
                                                                              <input name='address' value={formData.address}
                                                                                onChange={(e) => setFormData ({ ...formData, [e.target.name]: e.target.value })}
                                                                                placeholder="Address" className="w-full border p-2 rounded" />
                                                                            </label>
                                                                            <label className="text-[10px] w-full">State
                                                                              <select
                                                                                name="state"
                                                                                value={formData.state}
                                                                                onChange={e => setFormData ({ ...formData , state: e.target.value })}
                                                                                className="w-full border p-2 rounded"
                                                                              >
                                                                                <option value="">Select State</option>
                                                                                {nigeriaStates.map(state => (
                                                                                  <option key={state} value={state}>{state}</option>
                                                                                ))}
                                                                              </select>
                                                                            </label>
                                                                            <div className="flex gap-x-5 mt-3">
                                                                              <label className="text-[10px] w-full">Phone Number
                                                                                <input name="phoneNumber" value={formData .phoneNumber}
                                                                                  onChange={(e) => setFormData({ ...formData , [e.target.name]: e.target.value })}
                                                                                  placeholder="PhoneNumber" className="w-full border p-3 rounded" />
                                                                              </label>
                                                                              <label className="text-[10px] w-full">Email
                                                                                <input name="email" value={formData .email}
                                                                                  onChange={(e) => setFormData({ ...formData , [e.target.name]: e.target.value })}
                                                                                  placeholder="Email" className="w-full border p-3 rounded" />
                                                                              </label>
                                                                            </div>
                                                                          </div>
                                                                        )}
                                                
                                                                        {userType === 'company' && (
                                                                          <div className="space-y-2 flex flex-col gap-y-1 bg-white rounded shadow">
                                                                            {/* <h3 className="text-sm font-semibold">Company Details</h3> */}
                                                                            <label className="text-[10px] mb-3 w-full">Company Name
                                                                              <input
                                                                                name="companyName"
                                                                                value={formData.companyName}
                                                                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                placeholder="Enter Company Name"
                                                                                className="w-full h-7 border p-2 rounded"
                                                                              />
                                                                            </label>
                                                                            <label className="text-[10px] w-full">Company Address
                                                                              <input
                                                                                name="address"
                                                                                value={formData.address}
                                                                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                placeholder="Enter Address"
                                                                                className="w-full border h-7 p-2 rounded"
                                                                              />
                                                                            </label>
                                                                            <label className="text-[10px] w-full">State
                                                                              <select
                                                                                name="state"
                                                                                value={formData.state}
                                                                                onChange={e => setFormData({ ...formData, state: e.target.value })}
                                                                                className="w-full border p-2 rounded"
                                                                              >
                                                                                <option value="" className='text-gray-400'>Select State</option>
                                                                                {nigeriaStates.map(state => (
                                                                                  <option key={state} value={state}>{state}</option>
                                                                                ))}
                                                                              </select>
                                                                            </label>
                                                                            <div>
                                                                              <label className="block mb-1 text-[10px]">Upload Document</label>
                                                                              {/* <input
                                                                              type="file"
                                                                              onChange={(e) => setFile(e.target.files[0])}
                                                                              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                                              className="w-full bg-cyan-50 p-2 py-6 rounded"
                                                                            />
                                                                          </div>
                                                                            <div> */}
                                                
                                                                              <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className='w-full h-20 bg-blue-200 rounded-md  flex justify-center px-16 pt-6' placeholder='Upload Documents' />
                                                                            </div>
                                                                            <span className="text-gray-400 text-[10px] flex items-center gap-x-2">Primary Contact <Tooltip>
                                                                              <TooltipTrigger>
                                                                                <Image src='/caution.png' width={12} height={12} />
                                                                              </TooltipTrigger>
                                                                              <TooltipContent className='w-36'>
                                                                                <p className='text-[7px]'>the main representative of the company responsible for communication and key property management updates.</p>
                                                                              </TooltipContent>
                                                                            </Tooltip>
                                                
                                                                            </span>
                                                                            <div className="flex gap-x-5">
                                                                              <label className="text-[10px] w-full">First Name
                                                                                <input
                                                                                  name="firstName"
                                                                                  value={formData.firstName}
                                                                                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                  placeholder="Enter firstname"
                                                                                  className="w-full mt-2 border placeholder:text-[10px] p-3 rounded"
                                                                                />
                                                                              </label>
                                                                              <label className="text-[10px] w-full">Last Name
                                                                                <input
                                                                                  type="text"
                                                                                  name="lastName"
                                                                                  value={formData.lastName}
                                                                                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                  placeholder="Enter lastname"
                                                                                  className="w-full mt-2 border placeholder:text-[10px] p-3 rounded"
                                                                                />
                                                                              </label>
                                                                            </div>
                                                                            <div className="flex gap-x-5">
                                                                              <label className="text-[10px] w-full">Phone Number
                                                                                <input
                                                                                  name="phoneNumber"
                                                                                  value={formData.phoneNumber}
                                                                                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                  placeholder="Enter phone number"
                                                                                  className="w-full mt-2 border p-3 placeholder:text-[10px] rounded"
                                                                                />
                                                                              </label>
                                                                              <label className="text-[10px] w-full">Official Email
                                                                                <input
                                                                                  name="email"
                                                                                  value={formData.email}
                                                                                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                                                  placeholder="Enter Email"
                                                                                  className="w-full mt-2 border p-3 placeholder:text-[10px] rounded"
                                                                                />
                                                                              </label>
                                                                            </div>
                                                
                                                                          </div>
                                                                        )}
                                                <button type="submit" className="mt-6 bg-[#6434F8] text-white py-2 px-4 rounded-md float-right">Submit</button>
                                              </form>
        </DialogContent>
      </Dialog>
      {/* End Add Client Modal */}

       {/* Dialog: Add JV */}
      <Dialog open={jvOpen} onOpenChange={setJvOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add JV Partner</DialogTitle>
          </DialogHeader>
           <form onSubmit={handleJVSubmit} className="space-y-4">
                                                                    <div className="mb-6 min-w-[400px] flex flex-col">
                                                                      <label htmlFor="userType" className="block text-xs font-medium mb-2">User Type</label>
                                                                      <select
                                                                        id="userType"
                                                                        value={userType}
                                                                        onChange={(e) => setUserType(e.target.value)}
                                                                        className="w-full border border-gray-300 rounded-md p-3"
                                                                      >
                                                                        <option value="">Select</option>
                                                                        <option value="individual">Individual</option>
                                                                        <option value="company">Company</option>
                                                                      </select>
                                                                    </div>

                                                                    {userType === 'individual' && (
                                                                      <div className="space-y-4">
                                                                        <div className="flex gap-x-5">
                                                                          <label className="text-xs w-full">First Name
                                                                            <input name="firstName" value={formDataJV.firstName} onChange={handleJVChange} placeholder="First Name" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                          <label className="text-xs w-full">Last Name
                                                                            <input name="lastName" value={formDataJV.lastName} onChange={handleJVChange} placeholder="Last Name" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                        </div>
                                                                        <label className="text-xs">Address
                                                                          <input name="address" value={formDataJV.address} onChange={handleJVChange} placeholder="Address" className="w-full border p-2 rounded" />
                                                                        </label>
                                                                        <div className="flex gap-x-5">
                                                                          <label className="text-xs w-full">Phone Number
                                                                            <input name="phoneNumber" value={formDataJV.phoneNumber} onChange={handleJVChange} placeholder="Phone Number" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                          <label className="text-xs w-full">Email
                                                                            <input name="email" value={formDataJV.email} onChange={handleJVChange} placeholder="Email" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                        </div>
                                                                      </div>
                                                                    )}

                                                                    {userType === 'company' && (
                                                                      <div className="flex flex-col gap-y-4">
                                                                        {/* <h3 className="text-lg font-semibold">Company Details</h3> */}
                                                                        <input name="companyName" value={formDataJV.companyName} onChange={handleJVChange} placeholder="Company Name" className="w-full border p-2 rounded" />
                                                                        <input name="address" value={formDataJV.address} onChange={handleJVChange} placeholder="Company Address" className="w-full border p-2 rounded" />
                                                                        <select
                                                                        id="userType"
                                                                        value={companyState}
                                                                        onChange={(e) => setCompanyState(e.target.value)}
                                                                        className="w-full border border-gray-300 rounded-md p-3"
                                                                      >
                                                                        <option value="">Select</option>
                                                                        <option value="individual">Lagos</option>
                                                                        <option value="company">Abuja</option>
                                                                      </select>
                                                                        <div>
                                                                          <label className="block mb-1 text-xs">Upload Document</label>
                                                                          <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
                                                                        </div>
                                                                        <div className="flex-col flex w-full gap-y-4">
                                                                          <div className="flex gap-x-6">
                                                                              <label className="text-xs font-bold w-1/2"> First name
                                                                               <input name="firstName" value={formDataJV.firstName} onChange={handleJVChange} placeholder="First Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                              <label className="text-xs font-bold"> Last name
                                                                                <input name="lastName" value={formDataJV.lastName} onChange={handleJVChange} placeholder="Last Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                          </div>
                                                                          <div className="flex gap-x-6">
                                                                              <label className="text-xs font-bold w-1/2"> Phone Number
                                                                               <input name="firstName" value={formDataJV.firstName} onChange={handleJVChange} placeholder="First Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                              <label className="text-xs font-bold"> Official Email
                                                                                <input name="lastName" value={formDataJV.lastName} onChange={handleJVChange} placeholder="Last Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                          </div>

                                                                        </div>
                                                                      </div>
                                                                    )}

                                                                    <button type="submit" className="mt-6 bg-[#6434F8] text-white py-2 px-4 rounded-md">Submit</button>
                                                                  </form>
        </DialogContent>
      </Dialog>
      {/* End Add JV Modal */}
    </section>
  )
}

export default AdminDashboard