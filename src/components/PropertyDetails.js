'use client'
import {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
// import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import TaskCard from './TaskCard'
import { Timeline } from 'antd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, PlusIcon, TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const chartData = [
  { browser: "safari", visitors: 20, fill: "hsl(var(--chart-2))" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

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
import { Download, Link, SmileIcon, CircleCheckBig} from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'

const taskDetails = {
  createdDate: "Jan 29th, 2025",
  dueDate: "Feb 20th, 2025",
  status: "In Progress",
  priority: "Low",
  description: "",
};

const steps = [
  // {
  //   "stepNumber": 1,
  //   "title": "DD on Asset Holding Party",
  //   "status": "completed"
  // },
  // {
  //   "stepNumber": 2,
  //   "title": "Potential Partners Inview",
  //   "status": "completed"
  // },
  // {
  //   "stepNumber": 3,
  //   "title": "DD on Potential Partner",
  //   "status": "pending"
  // },
  // {
  //   "stepNumber": 4,
  //   "title": "Heads of Agreement",
  //   "status": "pending"
  // },
  // {
  //   "stepNumber": 5,
  //   "title": "Definitive Agreement",
  //   "status": "pending"
  // },
  // {
  //   "stepNumber": 6,
  //   "title": "Project Commencement Meeting",
  //   "status": "pending"
  // },
  // {
  //   "stepNumber": 7,
  //   "title": "Groundbreaking",
  //   "status": "pending"
  // }
]

const PropertyDetails = () => {
  
  
  const searchParams = useSearchParams();
  const id = searchParams.get('property');
  console.log(id)
  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.status === "completed").length;
  const progressValue = (completedSteps / totalSteps) * 100;
  const router = useRouter()
  const [property, setProperty] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [properties, setProperties] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const assignedAssetId = searchParams.get('property')
  // Update from here
  const [userType, setUserType] = useState("");
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState({})
  const [roleData, setRoleData] = useState([])
  const [roleValue, setRoleValue] = useState("")
  const [userSelected, setUserSelected] = useState(false);
  
  const [file, setFile] = useState(null);
  const [updateId, setUpdateId] = useState("")
  
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserId(prev => ({ ...prev, [name]: value }));
    console.log("Changed:", name, value);
  };
      const handleAssetChange = (e) => {
        const { name, value } = e.target;
        setAssetData((prev) => ({ ...prev, [name]: value }));
      };
    
     const handleClientChange = (e) => {
      const { name, value } = e.target;
        setClientData((prev) => ({ ...prev, [name]: value }));
     }
   
    const handleRoleChange = (e) => {
     const { value } = e.target;  
     setRoleValue(value)
    };

      const [formState, setFormState] = useState({
      firstName: "",
      lastName: "",
      address: "",
      userType: "individual", // or "company"
      email: "",
      phoneNumber: "",
      roleId: "",
      document:"",
      companyName: "",
      assetId: id
    });
       const [stage, setStage] = useState({
      stageName: "",
      description: "",
      stagePosition: "",
      assetId: id
    });
    const  [tasks, setTasks] = useState({
      
    taskName: '',
    description: '',
    dueDate: '',
    status: 'pending',
    stageId: '475b0137-14b6-45b7-8313-02c50c0f1ac2',
    })

    const [attachments, setAttachments] = useState([]);

   const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTasks(prev => ({ ...prev, [name]: value }));
  };
      const taskFileChange = (e) => {
    setAttachments(e.target.files); // multiple files
  };

     const getAllUsers = async () => {
       try {
         const response = await fetch("https://propertyapi-monolithic.onrender.com/api/v1/user/role?roleId=1", {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
            },
          });
          
          const data = await response.json();
          console.log("Users API response:", data);
          
          const fetchedUsers = data?.data.users;
          console.log(fetchedUsers) // Adjust this based on actual API structure
          setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
        } catch (error) {
          console.error("Failed to fetch users:", error);
          setUsers([]);
        }
      };

       const getStageTasks = async () => {
       try {
         const response = await fetch("https://propertyapi-monolithic.onrender.com/api/v1/stage/tasks/475b0137-14b6-45b7-8313-02c50c0f1ac2", {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
            },
          });
          
          const data = await response.json();
          console.log("Tasks response:", data);
          
        } catch (error) {
          console.error("Failed to fetch Tasks:", error);
          setUsers([]);
        }
      };
      
      const addStage = async (e) =>{
        e.preventDefault()
        console.log(stage)
           try {
     
          const response = axios.post('https://propertyapi-monolithic.onrender.com/api/v1/stage/create-stage',stage, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }}
              )  .then(function (response) {
                  console.log(response);
                })

        } catch (err) {
          console.log(stage)
          console.error("Error:", err);
        }
      }

       const addTask = async (e) =>{
        e.preventDefault()
          const preparedTask = {
              ...tasks,
              dueDate: new Date(tasks.dueDate).toISOString()
              };

           console.log(preparedTask);
           try {
          const response = await axios.post('https://propertyapi-monolithic.onrender.com/api/v1/stage/tasks/create-task',preparedTask, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }}
              )
              console.log("Task Successfully Added")
              router.push(`/dashboard?property=${id}`)

        } catch (err) {
          console.error("Error:", err.response?.data?.errors || err.message);
        }
      }

       const getStages = async () => {
      
      };

      
       useEffect(() => {
            if (!id) return  // 👈 prevent call if id is undefined
          
            async function fetchProperty() {
              const token = localStorage.getItem("token");
              try {
                const res = await fetch(`https://propertyapi-monolithic.onrender.com/api/v1/assets/${id}`, {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                  },
                })
          
                if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`)
                }
          
                const data = await res.json()
                console.log(data)
                setProperty(data.data.asset)
                console.log(property)
              } catch (error) {
                console.error("Error fetching property:", error)
              }
            }
             if (id) {
                  setFormState((prev) => ({ ...prev, assetId: id }));
                }
            getAllUsers()
            fetchProperty()
            getRoles()
            getStageTasks()
          }, [id])

      
      
      const handleSubmit = async (e) => {
        console.log(formState)
        e.preventDefault();
        
        try {
     
          const response = axios.post('https://propertyapi-monolithic.onrender.com/api/v1/user/create-and-assign',formState, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }}
              )  .then(function (response) {
    console.log(response);
  })

        } catch (err) {
          console.log(formState)
          console.error("Error:", err);
        }
      };
          
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleCreateAssign = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData)
  };


// to here
const assignAsset = async () => {
  const assetId = id;

  // Ensure you are accessing the correct user ID value
  const assignedUserId = userId.userId; // or just `userId` if it's a string

  try {
    const response = await fetch(
      "https://propertyapi-monolithic.onrender.com/api/v1/user/assign-asset",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: assignedUserId,
          assetId: assetId,
        }),
      }
    );
  

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to assign asset:", errorData.message || response.statusText);
      return;
    }

    const result = await response.json();
    console.log("Asset successfully assigned:", result);
  } catch (error) {
    console.error("Error assigning asset:", error);
  }
};

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
   
      const getRoles = async () => {
        try {
          const response = await fetch(
            "https://propertyapi-monolithic.onrender.com/api/v1/roles",
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const data = await response.json();
          setRoleData(data.data);
          console.log(data.data);
        } catch (error) {
          console.error("Failed to fetch roles:", error);
        }
      };
  return (
    <section className="mt-18 ms-28 me-10 min-h-screen flex flex-col gap-y-4 px-4 py-12">
      <div className='lg:w-full  bg-white min-h-1/3 flex justify-between shadow-xl rounded-lg  items-center'>
         {}
          <div className='flex flex-col flex-1 w-1/3 border-r-2 justify-center gap-y-3 items-center border-gray-100 px-12 h-full' >
          <button className="text-blue-600 underline mb-4" onClick={() => router.push("/dashboard")}>← Back to Properties</button>
            <Image src='/house.svg' alt='hawkes property detail' width={140} height={140} />
            <h3 className='text-3xl text-clip font-bold'>{ property?.propertyName}</h3>
           <p className='text-xs'>{property?.address}</p> 
          </div>
          <div className='w-1/3 px-4 space-y-'>
              <table className='table-auto sapce-y-3'>
                <thead>
                  <tr></tr>
                  <tr></tr>
                </thead>
              <tbody className='table-auto w-full gap-y-14'>
                  <tr className='table-row space-x-10 items-center py-4 justify-between'>
                    <td className='text-sm font-bold pe-16'>Asset Id: </td>
                    <td className='text-sm ms-28 text-end'>{property.id}</td>
                  </tr>
                  <tr className='table-row w-full justify-between py-4 items-center '>
                    <td className='text-sm font-bold'>Authorized Use: </td>
                    <td className='text-xs'>{property.authorizedUse}</td>
                  </tr>
                  <tr className='table-row justify-between py-4 items-center border-spacing-6'>
                    <td className='text-sm font-bold'>Size: </td>
                    <td className='text-xs'>{property.size}</td>
                  </tr>
                  <tr className='table-row justify-between py-4 items-center border-spacing-6'>
                    <td className='text-sm font-bold'>Client: </td>
                    <td className='text-xs'>Admin</td>
                  </tr>
                  <tr className='table-row justify-between py-4 items-center border-spacing-6'>
                    <td className='text-sm font-bold'>JV Partner: </td>
                    <td className='text-xs'></td>
                  </tr>
                  <tr className='table-row justify-between py-4 items-center border-spacing-6'>
                    <td className='text-sm font-bold'>Assigned Legal Rep: </td>
                    <td className='text-xs'></td>
                  </tr>
                  <tr className='table-row justify-between py-4 items-center border-spacing-6'>
                    <td className='text-sm table-cell font-bold'>Date Added: </td>
                    <td className='text-xs table-cell'> {new Date(property.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</td>
                  </tr>
                  <tr className='table-row justify-between py-4 items-center border-spacing-6'>
                    <td className='text-sm font-bold'>Status: </td>
                    <td className='text-xs'>{property.status} </td>
                  </tr>
              </tbody>
              </table>
          </div>
          <div className='w-1/3 border-l-2 p-3 border-gray-100'>
            <div className='flex justify-between items-center'>
              <h4 className='text-xl font-bold z-20'>Progress Report
                <Dialog className="w-[1200px]">
                  <DialogTrigger asChild>
                      <Image src='/inviteuser.svg' width={120} height={20} />
                  </DialogTrigger>
                  <DialogContent className="w-full  bg-white">
                    <DialogHeader>
                      <DialogTitle>
                        Invite User    
                      </DialogTitle>
                    </DialogHeader>
                  <div className="min-w-[400px] mx-auto mt-10 bg-white rounded-xl scroll-auto">
                       {currentStep === 1 && (
                    <>
                      <div className="grid gap-4">
                      <select name="userRole" onChange={handleUserChange}   placeholder="Assign User" className="border p-2 rounded w-full">
                        <option value="Select user">Select User</option>
                          {users.map((user) => (
                              <option key={user.id} value={user.id}>{user.firstName}</option>
                          ))}
                        </select>

                      </div>

                      <div className='flex flex-col items-center justify-center mt-12'>
                                  <span className='rounded-full w-16 h-16 flex items-center justify-center bg-gray-100 text-lg font-extralight'>Or</span>
                                  <button  onClick={nextStep}  className='w-full h-8 border-[1px] rounded-sm flex justify-center items-center text-[#2C1C92] my-3 text-sm font-light border-[#2C1C92] p-6 text-center'>Add New</button>
                      </div>
                      <div className="flex justify-end mt-6 gap-x-5">
                        {/* <button onClick={prevStep} className="rounded-full border-[1px] text-[#2C1C92] border-[#2C1C92] px-8 py-3">Back</button> */}
                        <button onClick={assignAsset} className="bg-[#2C1C92] rounded-full text-white px-8 py-3">Submit</button>
                      </div>
                    </>
                  )} 
                   {currentStep === 2 && (
                                     <form onSubmit={handleSubmit} className="space-y-4">
                                      <div className="mb-6 min-w-[400px] flex flex-col">
                                         <select
                                          name="roleId"
                                          value={formState.roleId}
                                          onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                          className="border p-2 rounded w-full py-[6px]"
>
                                          <option value="Select user">Select Role</option>
                                            {roleData.map((role) => (
                                                <option key={role.id} value={role.id}>{role.name}</option>
                                            ))}
                                          </select>

                                        <label htmlFor="userType" className="block text-xs font-medium mt-3 ">User Type</label>
                                        
                                        <select
                                          id="userType"
                                          value={userType}
                                          onChange={(e) => setUserType(e.target.value)}
                                          className="w-full border border-gray-300 rounded-md py-[6px]"
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
                                              <input name="firstName"
                                                value={formState.firstName}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="First Name" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                            <label className="text-xs w-full">Last Name
                                              <input type="text"
                                                name="lastName"
                                                value={formState.lastName}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="Last Name" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                          </div>
                                          <label className="text-xs">Address
                                            <input name='address'  value={formState.address}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="Address"className="w-full border p-2 rounded" />
                                          </label>
                                          <div className="flex gap-x-5">
                                            <label className="text-xs w-full">Phone Number
                                              <input name="phoneNumber"   value={formState.phoneNumber}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="PhoneNumber" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                            <label className="text-xs w-full">Email
                                              <input name="email"   value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="Email" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                          </div>
                                        </div>
                                      )}

                                      {userType === 'company' && (
                                        <div className="space-y-2 flex flex-col gap-y-1">
                                          <h3 className="text-lg font-semibold">Company Details</h3>
                                           <label className="text-xs mb-3 w-full">
                                          <input name="companyName"   value={formState.companyName}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                 placeholder="Company Name" className="w-full border p-2 rounded" />
                                                </label>
                                                 <label className='text-xs w-full'>
                                          <input name='address'  value={formState.address}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })} placeholder="Company Address" className="w-full border p-2 rounded" />
                                                </label>
                                                <label className='text-xs w-full'>
                                          <input name="email"   value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })} placeholder="Email" className="w-full border p-2 rounded" />
                                                </label>
                                          <div>
                                            <label className="block mb-1 text-xs">Upload Document</label>
                                            <input type="file"
                                                  onChange={(e) => setFile(e.target.files[0])}
                                                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                className="w-full bg-cyan-50 p-2 py-6 rounded" />
                                          </div>
                                            <span className='text-gray-400  text-sm ' >Primary Contact</span>
                                           <div className="flex gap-x-5">
                                              <label className="text-xs w-full">First Name
                                              <input name="firstName"
                                                value={formState.firstName}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="Enter firstname" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                            <label className="text-xs w-full">Last Name
                                              <input type="text"
                                                name="lastName"
                                                value={formState.lastName}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="Enter lastname" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                          </div>
                                           <div className="flex gap-x-5">
                                            <label className="text-xs w-full">Phone Number
                                              <input name="phoneNumber"   value={formState.phoneNumber}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="Enter phone number" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                            <label className="text-xs w-full">Official Email
                                              <input name="email"   value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                                placeholder="nter Email" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                          </div>
                                        </div>
                                      )}

                                      <button type="submit" className="mt-6 bg-[#6434F8] text-white justify-self-end py-2 px-4 rounded-md">Submit</button>
                                    </form>
                        )} 
                      
                      </div>
                  </DialogContent>
                  </Dialog>
                {/* <Image src='/inviteuser.svg' width={120} height={20} /> */}
              </h4>
              <select className='border-2 z-20 p-2 px-6 rounded-lg'>
                <option>All</option>
              </select>
              </div>
              <div className=''>
              <Card className="flex flex-col border-none shadow-none -mt-12">
                  <CardHeader className="items-center pb-0 ">
                  
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 ">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[250px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        endAngle={100}
                        innerRadius={80}
                        outerRadius={140}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="visitors" background />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                          <Label
                            content={({ viewBox }) => {
                              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-4xl font-bold"
                                    >
                                      {chartData[0].visitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                    
                                    </tspan>
                                  </text>
                                )
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                      
                  </div>
                  {/* <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div> */}
                </CardFooter>
              </Card>
              
              </div>
            </div>
          </div>
          <div className='w-full bg-white min-h-2/3 p-12 space-y-8 shadow-xl rounded-xl'>
          <p className='flex text-sm items-center'>Manage Stages <ChevronRight className='h-5' /> </p>
          <div className="flex justify-between items-center w-full max-w-6xl mx-auto py-8">
          {steps ==0 &&(
            <>
            <div className='flex justify-center w-full items-center'>
              <div className='flex-col flex w-60 gap-y-2 items-center'>
                  <h4 className='font-bold '>No stages added yet</h4>
                  <p className='text-sm text-center text-gray-500 '>Get Started by creating the first stage for this asset</p>
                    <Dialog className="w-[1200px]">
                  <DialogTrigger asChild>
                     <button className='bg-[#4D91FF] cursor-pointer text-light text-xs rounded-md text-white px-6 py-3'>Create stage</button>
                  </DialogTrigger>
                  <DialogContent className="w-full  bg-white">
                    <DialogHeader>
                      <DialogTitle>
                        Add Stage    
                      </DialogTitle>
                    </DialogHeader>
                  <div className="min-w-[400px] mx-auto mt-10 bg-white rounded-xl">
                     <form onSubmit={addStage}>
                          <div className="space-y-4">
                            <div className="flex-col gap-x-5">
                              <label className="text-xs w-full">Stage Position
                                <input name="stagePosition"
                                  value={stage.stagePosition}
                                  onChange={(e) => setStage({ ...stage, [e.target.name]: e.target.value })}
                                  placeholder="Enter Position" className="w-full mt-2 border p-3 rounded" />
                              </label>

                               <label className="text-xs w-full">Stage Name
                                <input name="stageName"
                                  value={stage.stageName}
                                  onChange={(e) => setStage({ ...stage, [e.target.name]: e.target.value })}
                                  placeholder="Enter Name" className="w-full mt-2 border p-3 rounded" />
                              </label>

                              <label className="text-xs w-full">Stage description
                                <textarea name="description"
                                  value={stage.description}
                                  rows={4}
                                  onChange={(e) => setStage({ ...stage, [e.target.name]: e.target.value })}
                                  placeholder="Enter Name" className="w-full mt-2 border p-3 rounded" />
                              </label>
                             
                            </div>
                            <button type='submit' className='w-44 h-10 rounded-full bg-[#312787] flex text-center justify-self-end justify-center items-center text-white'>Add</button>
                          </div>
                     </form>
                      </div>
                  </DialogContent>
                  </Dialog>

              </div>
            </div>
            </>
          )}

          {steps.map((step) => (
            <div key={step.stepNumber} className="flex  flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.status === "completed" ? "bg-indigo-700 text-white " : "border-[1px] border-indigo-700 text-indigo-700"
                }`}
              >
                {step.stepNumber}
              </div>
              <span
                className={`mt-2 text-center text-sm ${
                  step.status === "completed" ? "text-indigo-800 font-semibold" : "text-indigo-700"
                }`}
              >
                {step.title}
              </span>
              <Progress value={progressValue} className="h-4 [&>div]:bg-indigo-600 " />
            </div>
          ))}
          </div>
      
      <div className='flex flex-col space-y-4 lg:w-[1000px]'>
        <span className='flex justify-between'>
        <h3 className='text-2xl'>Tasks</h3>
           <Dialog className="w-[1200px]">
                  <DialogTrigger asChild>
                <PlusIcon/>
           </DialogTrigger>
                  <DialogContent className="w-full  bg-white">
                    <DialogHeader>
                      <DialogTitle>
                        Add Task   
                      </DialogTitle>
                    </DialogHeader>
                  <div className="min-w-[400px] mx-auto mt-10 bg-white rounded-xl">
                     <form onSubmit={addTask}>
                          <div className="space-y-4">
                            <div className="flex-col gap-x-5">
                              <label className="text-xs w-full">Task name
                                <input name="taskName"
                                  value={tasks.taskName}
                                  onChange={handleTaskChange}
                                  placeholder="Enter Position" className="w-full mb-2 border p-3 rounded" />
                              </label>

                              <label className="text-xs w-full">Description
                                <textarea name="description"
                                  value={tasks.description}
                                  rows={2}
                                  onChange={handleTaskChange}
                                  placeholder="Enter Name" className="w-full mb-2 border p-3 rounded" />
                              </label>
                            
                                  <label className="text-xs w-full">Due Date
                                <input name="dueDate"
                                type='date'
                                  value={tasks.dueDate}
                                  onChange={handleTaskChange}
                                  placeholder="Enter due date " className="w-full mb-2 border p-3 rounded" />
                              </label>
                              <div className='flex gap-x-8'>
                                    {/* <label className="text-xs w-full">Priority
                                <select name="stagePosition"
                                  
                                  value={stage.stagePosition}
                                  onChange={(e) => setStage({ ...stage, [e.target.name]: e.target.value })}
                                  placeholder="Enter Position" className="w-full mt-2 border p-3 rounded" >
                                    <option>Select</option>
                                    <option>High</option>
                                    <option>Low</option>
                                  </select>
                              </label> */}
                                  <label className="text-xs w-full">Status
                                 <select name="status"
                                  
                                  value={tasks.status}
                                  onChange={(e) => setTasks({ ...tasks, [e.target.name]: e.target.value })}
                                  placeholder="Enter Position" className="w-full mb-2 border p-3 rounded" >
                                    <option value=''>Select</option>
                                    <option value='pending'>pending</option>
                                    <option value='in_progress'>In progress</option>
                                    <option value='completed'>completed</option>
                                  </select>
                              </label>
                              </div>
                                 {/* <label className="text-xs w-full flex flex-col">Set Reminder
                                 <select name="stagePosition"
                                  
                                  value={stage.stagePosition}
                                  onChange={(e) => setStage({ ...stage, [e.target.name]: e.target.value })}
                                  placeholder="Enter Position" className="w-1/2 mt-2 border p-3 rounded" >
                                    <option>Select</option>
                                    <option>Today</option>
                                    <option>Tomorrow</option>
                                    <option>Never</option>
                                  </select>
                              </label> */}
                             
                            </div>
                            <button type='submit' className='w-44 h-10 rounded-full bg-[#312787] flex text-center justify-self-end justify-center items-center text-white'>Add</button>
                          </div>
                     </form>
                      </div>
                  </DialogContent>
                  </Dialog>
          
        </span>
        
        <div className='flex gap-x-8'>
        <TaskCard title="Meeting with Mr Paul" description="Create content for peceland App" status="Completed" date="Sep 20, 2021" commentsCount={4} linksCount={11} />
        <TaskCard title="Listing deliverables checklist" description="Create content for peceland App" status="In Progress" date="Sep 20, 2021" commentsCount={4} linksCount={11} />
        <TaskCard title="Update requirement list" description="Create content for peceland App" status="Pending" date="Sep 20, 2021" commentsCount={4} linksCount={11} />
        
          <Dialog className="w-full">
            <DialogTrigger>
            <TaskCard title="Meeting with Mr Paul" description="Create content for peceland App" status="Pending" date="Sep 20, 2021" commentsCount={4} linksCount={11} />
            </DialogTrigger>
            <DialogContent className="w-full overflow-auto bg-white">
              <DialogHeader className=''>
                <DialogTitle>Listing deliverables checklist</DialogTitle>
                
              </DialogHeader>
              <div className="flex flex-col h-16 space-y-3 space-x-2 mx-2 mt-5 rounded-xl p-2 min-h-96">
              <table className="table-auto w-full shrink text-sm text-left">
                <tbody>
                  <tr className="h-2">
                    <td className="text-gray-400 text-xs font-bold pr-3 py-1">Created date</td>
                    <td className="text-gray-900 font-medium py-1">{taskDetails.createdDate}</td>
                  </tr>
                  <tr className="h-2">
                    <td className="text-gray-400 pr-3 py-1">Due date</td>
                    <td className="text-gray-900 font-medium py-1">{taskDetails.dueDate}</td>
                  </tr>
                  <tr className="h-2">
                    <td className="text-gray-400 pr-3 py-1">Status</td>
                    <td className="py-1">
                      <span className="bg-orange-100 text-orange-600 px-2 py-[1px] rounded text-xs font-medium">
                        {taskDetails.status}
                      </span>
                    </td>
                  </tr>
                  <tr className="h-2">
                    <td className="text-gray-400 pr-3 py-1">Priority</td>
                    <td className="py-1">
                      <span className="bg-blue-100 text-blue-600 px-3 py-2 rounded text-xs font-medium">
                        {taskDetails.priority}
                      </span>
                    </td>
                  </tr>
                  <tr className="h-2">
                    <td className="text-gray-400 pr-3 py-1">Description</td>
                    <td className="text-gray-900 font-medium py-1">{taskDetails.description || '-'}</td>
                  </tr>
                </tbody>
              </table>

              <div className='bg-gray-300 p-3 pb-6 rounded-xl'>
                <p className='text-xs text-black'>Review and confirm all required deliverables for the property listing, ensuringcompleteness and 
                accuracy before submission.</p>
              </div>
                <div className='flex-col flex gap-y-3'>
                  <div className='flex justify-between'>
                    <div className='space-x-3 text-gray-600 flex items-center'>
                      <Link className='h-4'/>
                      <p>Attachments</p>
                    </div>
                    <div className='flex text-sm gap-x-2 items-center text-blue-800'>
                      <Download className='h-4'/>
                      <p>Download All</p>
                    </div>
                  </div>
                  <div className='flex gap-x-2'>
                    <Image src='/brief_pdf.svg' alt='attachment' width={140} height={120} />
                    <Image src='/brief_docx.svg' alt='attachment' width={140} height={120} />
                    <Image src='/brief_pdf.svg' alt='attachment' width={140} height={120} />
                  </div>
                </div>
                <Tabs defaultValue="account" className="w-[400px]">
                  <TabsList className='bg-white shadow-none rounded-none mb-3'>
                    <TabsTrigger value="comment">Comment</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                  </TabsList>
                  <TabsContent value="comment">
                    <div className='flex-col flex w-full gap-y-2 mb-6'>
                      <textarea rows={2} placeholder='Write a Comment' className='p-5 border-2 border-gray rounded-xl' />
                      <div className='flex justify-between items-center'>
                        <span className='flex gap-x-2 text-gray-600'>
                          <Link className='h-4'/>
                          <SmileIcon className='h-4'/>
                        </span>
                        <button className='bg-[#312787] text-white px-6 py-2 rounded-lg '>Send</button>
                      </div>
                      <div className='space-y-6 mt-3'>
                        <div className='flex items-center gap-x-4'>
                          <Image src='/avatar.svg' className='h-8 w-8 rounded-full' width={40} height={40} />
                          <span className=''>
                            <h5 className='text-xs font-semibold'>Albert Bello <span className='text-blue-400'>@Alex Hisso</span> kindly review documnets and revert</h5>
                            <p className='text-xs text-gray-500'>10am - 12/02/2024</p>
                          </span>
                        </div>
                        <div className='flex items-center gap-x-4'>
                          <Image src='/avatar.svg' className='h-8 w-8 rounded-full' width={40} height={40} />
                          <span className=''>
                            <h5 className='text-xs font-semibold'>Albert Bello <span className='text-blue-400'>@Alex Hisso</span> kindly review documnets and revert</h5>
                            <p className='text-xs text-gray-500'>10am - 12/02/2024</p>
                          </span>
                        </div>
                        <div className='flex items-center gap-x-4'>
                          <Image src='/avatar.svg' className='h-8 w-8 rounded-full' width={40} height={40} />
                          <span className=''>
                            <h5 className='text-xs font-semibold'>Albert Bello <span className='text-blue-400'>@Alex Hisso</span> kindly review documnets and revert</h5>
                            <p className='text-xs text-gray-500'>10am - 12/02/2024</p>
                          </span>
                        </div>
                        

                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="activities" className="">
                  <Timeline
                      items={[
                        {
                          children: 'Create a services site 2015-09-01',
                          dot:<CircleCheckBig/>,
                          color:"green"
                        },
                        {
                          children: 'Solve initial network problems 2015-09-01',
                          dot:<CircleCheckBig/>,
                          color:"green"
                        },
                        {
                          children: 'Technical testing 2015-09-01',
                         dot:<CircleCheckBig/>,
                          color:"green"
                        },
                        {
                          children: 'Network problems being solved 2015-09-01',
                          dot:<CircleCheckBig/>,
                          color:"green"
                        },
                      ]}
                    />
                  </TabsContent>
                </Tabs>

              </div>
            </DialogContent>
        </Dialog>
            </div>
        </div>
        </div>
    </section>
  )
}

export default PropertyDetails
