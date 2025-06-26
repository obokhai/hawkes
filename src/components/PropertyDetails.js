'use client'
import {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import api from '@/app/api'
// import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import nigeriaStates  from '@/app/data/States'
import TaskCard from './TaskCard'
import { Timeline } from 'antd';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, HelpCircleIcon, PlusIcon, TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ClipLoader } from 'react-spinners'
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
import { toast } from 'sonner'

const taskDetails = {
  createdDate: "Jan 29th, 2025",
  dueDate: "Feb 20th, 2025",
  status: "In Progress",
  priority: "Low",
  description: "",
};



const PropertyDetails = () => {
  
  
  const searchParams = useSearchParams();
  const id = searchParams.get('property');
  console.log(id)

  const router = useRouter()
  const [property, setProperty] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [properties, setProperties] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false)
  const [updateTaskOpen, setUpdateTaskOpen] =useState(false)
  const [assignAssetOpen, setAssignAssetOpen] = useState(false)

  const assignedAssetId = searchParams.get('property')
  // Update from here
  const [userType, setUserType] = useState("");
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState({})
  const [roleData, setRoleData] = useState([])
  const [roleValue, setRoleValue] = useState("")
  const [userSelected, setUserSelected] = useState(false);
  const [stageSteps, setStageSteps] = useState([])
  const [saveStageId, setSavedStageId] = useState("")
  const [getStageData, setGetStageData] = useState([])
  const [assignUserId,setAssignUserId] = useState("")  
  const [file, setFile] = useState(null);
  const [updateId, setUpdateId] = useState("")
  const [isOwner, setIsowner] = useState(false)
  const [updateTaskFiles, setUpdateTaskFiles] = useState([]);
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
      isOwner: false,
      state: "",
      assetId: id
    });
       const [stage, setStage] = useState({
      stageName: "",
      description: "",
      stagePosition: 0,
      assetId: id
    });
    const  [tasks, setTasks] = useState({
      
    taskName: '',
    description: '',
    dueDate: '',
    status: 'pending',
    stageId: '',
    priority:''
    })

    const [editedTask, setEditedTask] = useState({
    taskName: '',
    description: '',
    dueDate: '',
    status: 'pending',
    stageId: '',
    priority: '',
    id: '', // needed for update
    });
  
    const [updateStage, setUpdateStage] = useState({
      id: '',
      stagePosition: 1
    })
  
    const [attachments, setAttachments] = useState([]);

    const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTasks(prev => ({ ...prev, [name]: value }));
    };

    const [stageTaskId, setStageTaskId] = useState("")
    const [userRoleId, setUserRoleId] = useState(20)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [inviteUserModal, setInviteUserModal] = useState(false)
    const [addStageModal, setAddStageModal] = useState(false)
    const [companyFiles, setCompanyFiles] = useState([])
    const handleTaskUpdate = (e) => {
      const { name, value } = e.target;
      setEditedTask(prev => ({ ...prev, [name]: value }));
    }
    const handleUpdateTaskFiles = (e) => {
   setUpdateTaskFiles(Array.from(e.target.files));
  };

   const handleCompanyFiles = (e) => {
   setCompanyFiles(Array.from(e.target.files));
  };

    const taskFileChange = (e) => {
  setAttachments(e.target.files); // multiple files
    };

  const handleUserRoleChange = async (e) => {
  const selectedRoleId = e.target.value;
  console.log("Selected Role ID:", selectedRoleId);
  setUserRoleId(selectedRoleId);
    // Optionally handle error
    getAllUsers()
  };
  const getAllUsers = async () => {
    setLoadingUsers(true)
    console.log(userRoleId)
    try {
      console.log("User Role Id",userRoleId)
      const response = await api.get(`/user/role?roleId=${userRoleId}`);
      
      const data = await response.data;
      console.log("Users API response:", data);
      
      const fetchedUsers = data?.data.users;
      console.log(fetchedUsers) // Adjust this based on actual API structure
      setLoadingUsers(false)
      setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    }
  };

  const getStageTasks = async (stageId) => {
    setStageTaskId(stageId)
    console.log("This is the Stage ID for adding a new task ",stageTaskId)
    console.log(stageId)
    try {
      const response = await api.get(`/stage/tasks/${stageId}`);
      
      const data = await response.data;
      setGetStageData(data.data.tasks)
      console.log("Curent Stage Id",stageId)
      
    } catch (error) {
      console.error("Failed to fetch Tasks:", error);
      // setUsers([]);
    }
  };
      
  const addStage = async (e) =>{
    e.preventDefault()
    const addNewStage ={
      ...stage,
      stagePosition: Number(stage.stagePosition)
    }
    console.log(addNewStage)
        try {
      const response = await api.post('/stage/create-stage',addNewStage) 
          console.log(response)
          // router.push(`/dashboard?property=${id}`)
    } catch (err) {
      console.log(addNewStage)
      console.error("Error:", err);
    }
  }

  const handleManageStage = (e) => {
    const { name, value } = e.target;
    setUpdateStage(prev => ({ ...prev,  [name]: name === 'stagePosition' ? parseInt(value, 10) : value}));
  }

  const manageStage = async(stage) =>{
      console.log("manage stage Id",stage)
      const id = stage?.id

      const update = {
          stageUpdates: [
            {
              ...updateStage,
              id // override or confirm ID from the clicked stage
            }
          ]
        };
        console.log(update)
      try {
        const res  =  await api.post(`/stage/manage-stages/`,update)
          console.log("Response data:", res.data);
          if(!res) console.log(res.data)
            router.push(`/dashboard?property=${id}`)
      } catch (err) {
          console.error("Error:", err.response);
      }
  }

  const addTask = async (e) =>{
  e.preventDefault()
  console.log(stageTaskId)
    const preparedTask = {
        ...tasks,
        dueDate: new Date(tasks.dueDate).toISOString(),
        stageId:stageTaskId
        
        };

      console.log("Prepared Traning",preparedTask);
      try {
    const response = await api.post('/stage/tasks/create-task',preparedTask)
        console.log("Task Successfully Added")
        router.push(`/dashboard?property=${id}`)

  } catch (err) {
    console.error("Error:", err.response?.data?.errors || err.message);
  }
  }


  const updateTask = async () => {
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dfna08jzi/auto/upload";
  const uploadPreset = "task_assignment";
  setUpdateTaskOpen(true);

    let documentIds = [];
    if (updateTaskFiles.length > 0) {
      for (let file of updateTaskFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
          const res = await axios.post(cloudinaryUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (res.data.public_id) {
            documentIds.push(res.data.public_id);
          }
        } catch (err) {
          console.error("Cloudinary upload error:", err);
        }
      }
    }

    const id = editedTask?.id
    console.log(id)
    const preparedTask = {
        ...editedTask,
        dueDate: new Date(editedTask.dueDate).toISOString(),
        attachments: documentIds, // Use the uploaded document IDs
        };
      console.log(preparedTask);
      try {
    const response = await api.put(`/stage/task/${id}`,preparedTask)
        console.log("Task Successfully Updated")
        setUpdateTaskOpen(false)
        // router(`/dashboard?property=${id}`)

  } catch (err) {
    console.error("Error:", err.response?.data?.errors || err.message);
  }
  }


  const getStages = async () => {
  // https://propertyapi-monolithic.onrender.com/api/v1/stage/
  if(!id) console.log("missing Id ")
  try {
      const response = await api.get(`/stage/${id}`);

    const data = await response.data
    setStageSteps(data.data.stages)

  } catch (error) {
    
  }
  
    console.log("Stage Steps",stageSteps)
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
        // getStageTasks()
        getStages()
  }, [id])
      
  const handleSubmit = async (e) => {
    console.log(formState)
    e.preventDefault();
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dfna08jzi/auto/upload";
    const uploadPreset ="company_files"
    try {
  
     let documentId = "";
    if (companyFiles && companyFiles.length > 0) {
      const formData = new FormData();
      formData.append("file", companyFiles[0]);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await axios.post(cloudinaryUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.public_id) {
          documentId = res.data.public_id;
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
      }
    }
    

    const formDataWithFiles = {
      ...formState,
      document: documentId, // Use the uploaded document IDs
    }

      const response = api.post('/user/create-and-assign',formDataWithFiles)
      toast.success("User successfully created and assigned");
      console.log(response)
      // router.push(`/dashboard?property=${id}`)
      setInviteUserModal

    } catch (err) {
      console.log(formDataWithFiles)
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
  router.push(`/dashboard?property=${id}`)
  };

  const assignAsset = async () => {
    const assetId = id;
    const assignedUserId = assignUserId;
    console.log(assignUserId)
    try {
      const response = await api.post(
        "/user/assign-asset",{
            userId: userId,
            assetId: assetId,
            isOwner
           },
      );
      toast.success(response.data.message);

      if (response.data.success === false && response.statusCode === 400) { 
        toast.error(response.data.message)
        const errorData = await response.data;
        console.log(response)
        console.error("Failed to assign asset:", errorData.message || response.statusText);
        return;
      }

      const result = await response.json();
      console.log("Asset successfully assigned:", result);
    } catch (error) {
       toast.error(error.message)
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
      <div className='lg:w-full  bg-white min-h-1/3 flex w-1/4 justify-between shadow-xl rounded-lg  items-center'>
         {}
          <div className='flex flex-col flex-1 min-w-1/4 border-r-2 relative justify-center gap-y-3 items-center border-gray-100 px-12 h-full' >
            
          {/* <button className="text-blue-600 underline mb-4 cursor-pointer" onClick={() => router.push("/dashboard")}>← Back to Properties</button> */}
            <Image src='/house.svg' alt='hawkes property detail' width={140} height={140} />
            <h3 className='text-3xl text-clip font-bold'>{ property?.propertyName}</h3>
           <p className='text-xs'>{property?.address}</p> 
          </div>
  
            <div className='grid grid-cols-2 w-2/4 text-sm px-4 space-y-3 relative'>
              
              <span className='font-bold'>Asset Id:</span>
              <span className='grid grid-cols-2space-x-2'>
                <span className='w-28 truncate'>{property.id}</span>
                <span className=''>  
                  <Dialog open={inviteUserModal} onOpenChange={setInviteUserModal} className="w-[1200px]" id='ínviteUser'>
                  <DialogTrigger asChild>
                    <div className='flex w-full justify-end absolute top-0 right-0 -mt-10 cursor-pointer pe-4'>
                      <Image src='/inviteuser.svg' className='' width={100} height={20} />
                    </div>
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
                        <select name="roles" onChange={handleUserRoleChange} className='focus:outline-none border-[1px] p-2 text-xs cursor-pointer rounded w-full py-[6px]'>
                          <option value=''>Select Role</option>
                          {roleData.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                       
                        </select>
                     
                        {userRoleId && (
                              loadingUsers ? (
                                <div className="flex justify-center items-center my-4">
                                  <ClipLoader size={28} color="#6434F8" />
                                </div>
                              ) : (
                                users.length > 0 && (
                                  <select name="users" className='focus:outline-none border-[1px] p-2 text-xs cursor-pointer rounded w-full py-[6px]' onChange={e => setUserId(e.target.value)}>
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                      <option key={user.id} value={user.id}>{user.firstName}</option>
                                    ))}
                                  </select>
                                )
                              )
                            )}

                      </div>

                      <div className='flex flex-col items-center justify-center mt-12'>
                                  <span className='rounded-full w-16 h-16 flex items-center justify-center bg-gray-100 text-lg font-extralight'>Or</span>
                                  <button  onClick={nextStep}  className='w-full h-8 border-[1px] rounded-sm flex justify-center items-center text-[#2C1C92] my-3 text-sm font-light border-[#2C1C92] p-6 text-center'>Add New</button>
                      </div>
                      <div className="flex justify-end mt-6 gap-x-5">
                        {/* <button onClick={prevStep} className="rounded-full border-[1px] text-[#2C1C92] border-[#2C1C92] px-8 py-3">Back</button> */}
                        <button onClick={ async () =>{await assignAsset(); setInviteUserModal(false)}} className="bg-[#2C1C92] rounded-full text-white px-8 py-3">Submit</button>
                      </div>
                    </>
                  )} 
                   {currentStep === 2 && (
                      <form onSubmit={handleSubmit} className="space-y-4  max-h-96 overflow-y-auto">
                      <div className="mb-6 min-w-[400px] flex flex-col">
                        <label htmlFor="roleId" className="block text-xs font-medium mt-3 mb-1">User Role</label>
                          <select
                          name="roleId"
                          value={formState.roleId}
                          onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                          className="border p-2 text-xs cursor-pointer rounded w-full py-[6px]"
>
                          <option value="Select user">Select Role</option>
                            {roleData.map((role) => (
                                <option key={role.id} className='text-xs' value={role.id}>{role.name}</option>
                            ))}
                          </select>

                        <label htmlFor="userType" className="block text-xs font-medium mt-3 mb-1">User Type</label>
                        
                        <select
                          id="userType"
                          value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                          className="w-full border text-xs border-gray-300 cursor-pointer rounded py-[6px]"
                        >
                          <option value="">Select</option>
                          <option value="individual" className='text-xs'>Individual</option>
                          <option value="company" className='text-xs'>Company</option>
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
                          <label className="text-xs w-full">State
                            <select
                              name="state"
                              value={formState.state}
                              onChange={e => setFormState({ ...formState, state: e.target.value })}
                              className="w-full border p-2 rounded"
                            >
                              <option value="">Select State</option>
                              {nigeriaStates.map(state => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
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
                            <div className="flex gap-x-5 w-2/5 px-0">
                          <label className="text-xs w-full">Owner
                            <select name='isOwner' value={formState.isOwner}
                                onChange={e =>
                                  setFormState(prev => ({
                                    ...prev,
                                    isOwner: e.target.value === "true" // convert string to boolean
                                  }))
                                }className="w-full border p-2 rounded">
                              <option value="">Select</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                            </label>
                          </div>  
                        </div>
                      )}

                      {userType === 'company' && (
                        <div className="space-y-2 flex flex-col gap-y-1 p-2 bg-white rounded shadow">
                          <h3 className="text-sm font-semibold">Company Details</h3>
                          <label className="text-xs mb-3 w-full">
                            <input
                              name="companyName"
                              value={formState.companyName}
                              onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                              placeholder="Company Name"
                              className="w-full border p-2 rounded"
                            />
                          </label>
                          <label className="text-xs w-full">
                            <input
                              name="address"
                              value={formState.address}
                              onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                              placeholder="Company Address"
                              className="w-full border p-2 rounded"
                            />
                          </label>
                          <label className="text-xs w-full">
                            <input
                              name="email"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                              placeholder="Email"
                              className="w-full border p-2 rounded"
                            />
                          </label>
                          <div>
                            <label className="block mb-1 text-xs">Upload Document</label>
                            {/* <input
                              type="file"
                              onChange={(e) => setFile(e.target.files[0])}
                              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                              className="w-full bg-cyan-50 p-2 py-6 rounded"
                            />
                          </div>
                            <div> */}
                            
                            <input type="file" onChange={handleCompanyFiles}  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className='w-full h-20 bg-blue-200 rounded-md  flex justify-center px-16 pt-6' placeholder='Upload Documents' />
                          </div>
                          <span className="text-gray-400 text-sm">Primary Contact</span>
                          <div className="flex gap-x-5">
                            <label className="text-xs w-full">First Name
                              <input
                                name="firstName"
                                value={formState.firstName}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                placeholder="Enter firstname"
                                className="w-full mt-2 border p-3 rounded"
                              />
                            </label>
                            <label className="text-xs w-full">Last Name
                              <input
                                type="text"
                                name="lastName"
                                value={formState.lastName}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                placeholder="Enter lastname"
                                className="w-full mt-2 border p-3 rounded"
                              />
                            </label>
                          </div>
                          <div className="flex gap-x-5">
                            <label className="text-xs w-full">Phone Number
                              <input
                                name="phoneNumber"
                                value={formState.phoneNumber}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                placeholder="Enter phone number"
                                className="w-full mt-2 border p-3 rounded"
                              />
                            </label>
                            <label className="text-xs w-full">Official Email
                              <input
                                name="email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                placeholder="Enter Email"
                                className="w-full mt-2 border p-3 rounded"
                              />
                            </label>
                          </div>
                          <div className="flex gap-x-5 w-1/3">
                            <label className="text-xs w-full">Owner
                              <select
                                name="isOwner"
                                value={formState.isOwner}
                                onChange={e =>
                                  setFormState(prev => ({
                                    ...prev,
                                      isOwner: e.target.value === "true"
                                  }))
                                }
                                className="w-full border p-2 rounded"
                              >
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      )}
                      <button type='submit' className="mt-6 bg-[#6434F8] text-white justify-self-end py-2 px-4 rounded-md">Submit</button>
                    </form>
                        )} 
                      
                      </div>
                  </DialogContent>
                  </Dialog></span>
                </span>
              <span className='font-bold '>Authorized Use:</span><span>{property.authorizedUse}</span>
              <span className='font-bold'>Size:</span><span>{property.size}</span>
              <span className='font-bold'>Client:</span><span>{property.client || '-'}</span>
              <span className='font-bold'>JV PArtner:</span><span>{property.jv || '-'}</span>
              <span className='font-bold'>Assigned Legal Rep:</span><span>{property.legal || '-'}</span>
              <span className='font-bold'>Date Added:</span><span> {new Date(property.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
              <span className='font-bold'>Status:</span><span>{property.status}</span>
            

          </div>
          <div className='w-1/4 border-l-2 p-3 border-gray-100'>
            <div className='flex justify-between items-center'>
              <h4 className='text-xl font-bold z-20'>Progress Report
               <div className='h-2 w-16 rounded-full mt-1 bg-amber-400'/>
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
             <Dialog className="w-[1200px]">
                  <DialogTrigger asChild>
                        <p className='flex text-sm items-center'>Manage Stages <ChevronRight className='h-5' /> </p>
                  </DialogTrigger>
                   <DialogContent className="w-full  bg-white">
                    <DialogHeader className="mt-2">
                      <DialogTitle className="flex justify-between items-center">
                        <h3>Manage Stages: </h3>
                        {/*  */}
                           <Dialog className="w-[1200px]">
                  <DialogTrigger asChild>
                    <PlusIcon className='cursor-pointer'/>
                  </DialogTrigger>
                  <DialogContent className="w-full  bg-white" open={addStageModal} onOpenChange={setAddStageModal}>
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
                        {/*  */}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="min-w-[450px] mx-auto mt-10 bg-white rounded-xl">
                      <Table>
                        <TableHeader className="bg-[#5051F9] text-white ">
                          <TableRow className="rounded-tr-xl rounded-tl-xl">
                            <TableHead className="text-white">Position</TableHead>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Description</TableHead>
                            <TableHead className="text-right text-white">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stageSteps.map((stage) => (
                            <TableRow key={stage.stageId} className="min-h-12">
                              <TableCell className="font-medium">{stage.stagePosition}</TableCell>
                              <TableCell>{stage.stageName}</TableCell>
                              <TableCell>{stage.description}</TableCell>
                              <TableCell className="text-right">
                                <span className='flex '>
                                    <Dialog className="w-[1200px]">
                                      <DialogTrigger asChild>
                                          <Image src="/stage_edit.svg" width={20} height={40}/>
                                      </DialogTrigger>
                                      <DialogContent className="w-60  bg-white">
                                        <div className='flex flex-col justify-center'>
                                          <h3 className='my-2 font-bold text-left'>Update Stage</h3>
                                          <label className="text-xs w-full">
                                              <input name="stagePosition"
                                                value={updateStage.stagePosition}
                                                onChange={handleManageStage}
                                                placeholder="Enter Stage Position" className="w-full mb-2 border p-3 rounded" />
                                            </label>
                                           
                                          <button onClick={() => manageStage(stage)} className='w-44 h-10 rounded bg-[#312787] flex text-center justify-self-end justify-center items-center text-white'>Update Stage</button>
                                        </div>
                                      </DialogContent>
                                      </Dialog>
                                  <Image src="/stage_delete.svg" width={20} height={40}/>
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
             </Dialog>
          <div className="flex  justify-between items-center w-full max-w-6xl mx-auto py-8">
             <div className='flex flex-col w-full'>
            <div className='flex  gap-x-12'>
          {stageSteps ==0 &&(
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
         
          {stageSteps.map((step) => (
            <div className='flex w-full justify-between gap-x-4'>
            <div key={step.id} onClick={() =>getStageTasks(step.id)} className="flex cursor-pointer flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.status === "completed" ? "bg-indigo-700 text-white " : "border-[1px] border-indigo-700 text-indigo-700"
                }`}
              >
                {step.stagePosition}
              </div>
              <span
                className={`mt-2 text-center text-sm ${
                  step.status === "completed" ? "text-indigo-800 font-semibold" : "text-indigo-700"
                }`}
              >
                {step.stageName}
              </span>
            </div>
            </div>
          ))}
          </div>
          {stageSteps!=0 &&(
            <Progress value={13} className="h-4 mt-2 [&>div]:bg-indigo-600 " />
          )}
          </div>
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
                     <form onSubmit={addTask} >
                          <div className="space-y-4">
                            <div className="flex-col gap-x-5">
                              <label className="text-xs w-full">Task name
                                <input name="taskName"
                                  value={tasks.taskName}
                                  onChange={handleTaskChange}
                                  placeholder="Enter Name" className="w-full mb-2 border p-3 rounded" />
                                  {/* <input type="file" accept="image/*" capture="enviroment" /> */}
                              </label>

                              <label className="text-xs w-full">Description
                                <textarea name="description"
                                  value={tasks.description}
                                  rows={2}
                                  onChange={handleTaskChange}
                                  placeholder="Enter Description" className="w-full mb-2 border p-3 rounded" />
                              </label>
                            
                                  <label className="text-xs w-full">Due Date
                                <input name="dueDate"
                                type='date'
                                  value={tasks.dueDate}
                                  onChange={handleTaskChange}
                                  placeholder="Enter due date " className="w-full mb-2 border p-3 rounded" />
                              </label>
                              <div className='flex gap-x-8'>
                                  
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
                              <input type='hidden' value={stageTaskId} name='stageID' onChange={(e) => setTasks({...tasks, [e.target.name]: e.target.value})} />
                              </div>
                             
                            </div>
                            <button type='submit' className='w-44 h-10 rounded-full bg-[#312787] flex text-center justify-self-end justify-center items-center text-white'>Add</button>
                          </div>
                     </form>
                      </div>
                  </DialogContent>
                  </Dialog>
          
        </span>
        
        <div className='flex gap-x-8'>
          {getStageData.map((task) => (
          <Dialog className="w-full cursor-pointer"  key={task.id}>
            <DialogTrigger>
               <TaskCard title={task.taskName} onClick={() =>taskDetails(task.id)} description={task.description} status={task.status} commentsCount={0} date={task.dueDate} linksCount={11} />
            </DialogTrigger>
            <DialogContent className="w-full overflow-auto bg-white">
              <DialogHeader className=''>
                <DialogTitle>Listing deliverables checklist</DialogTitle>
                
              </DialogHeader>
              <div className="flex flex-col h-16 space-y-3 space-x-2 mx-2 mt-5 rounded-xl p-2 min-h-96">
              <table className="table-auto w-full shrink text-sm text-left">
                <tbody className='space-y-3'>
                  <tr className="h-2 text-xs">
                    <td className="text-gray-400 text-xs font-bold pr-3 py-1">Created date</td>
                    <td className="text-gray-900 font-medium py-1">{new Date(task.createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          </td>
                           <Dialog className="w-[600px]">
                                    <DialogTrigger asChild>
                                  <td className='bg-blue-400 text-white font-bold cursor-pointer rounded text-center '  onClick={() => setEditedTask(task)}>Update</td>
                            </DialogTrigger>
                                    <DialogContent className=" w-[600px] bg-white">
                                    
                        <div className="w-[400px] mx-auto mt-10 text-xs bg-white rounded-xl">
                                <h4 className='font-bold text-xl'>Update Task</h4>
                                <div className="w-[400px] mx-auto mt-6 bg-white rounded-xl">
                          
                                <div className="space-y-4">
                                  <div className="flex-col gap-x-5">
                                    {/* <input hidden name='id' value={task.id} /> */}
                                    <label className="text-xs w-full">Task name
                                            <input name="taskName"
                                            value={editedTask.taskName}
                                            onChange={handleTaskUpdate}
                                        placeholder="Enter Task Name"  className="w-full mb-2 border p-3 rounded" />
                                    </label>

                                    <label className="text-xs w-full">Description
                                      <textarea name="description"
                                        value={editedTask.description}
                                        rows={2}
                                        onChange={handleTaskUpdate}
                                        placeholder="Enter Task Name"  className="w-full mb-2 border p-3 rounded" />
                                    </label>
                                  
                                        <label className="text-xs w-full">Due Date
                                      <input name="dueDate"
                                      type='date'
                                      value={editedTask.dueDate}
                                      onChange={handleTaskUpdate}
                                        placeholder="Enter due date"  className="w-full mb-2 border p-3 rounded" />
                                    </label>
                                    <div>
                                      <input type="file" onChange={handleUpdateTaskFiles} multiple className='w-full h-10 bg-cyan-100' placeholder='Upload Documents' />
                                    </div>
                                    <div className='flex gap-x-8'>

                                         <label className="text-xs w-full">Priority
                                      <select name="priority"
                                        
                                        value={editedTask.priority}
                                        onChange={handleTaskUpdate}
                                        placeholder="Enter Position" className="w-full mb-2 border p-3 rounded" >
                                          <option value=''>Select</option>
                                          <option value='low'>Low</option>
                                          <option value='medium'>Medium</option>
                                          <option value='high'>High</option>
                                        </select>
                                    </label>

                                        <label className="text-xs w-full">Status
                                      <select name="status"
                                        
                                        value={editedTask.status}
                                        onChange={handleTaskUpdate}
                                        placeholder="Enter Position" className="w-full mb-2 border p-3 rounded" >
                                          <option value='' disabled>Select</option>
                                          <option value='pending'>pending</option>
                                          <option value='in_progress'>In progress</option>
                                          <option value='completed'>completed</option>
                                        </select>
                                    </label>
                                    </div>
                                      
                                  </div>
                                  <button type='button' onClick={updateTask} className='w-32 h-10 rounded-full bg-[#312787] flex text-center justify-self-end justify-center items-center text-white'>Update</button>
                                </div>
                            </div>
                                      </div>
                            </DialogContent>
                            </Dialog>
                  </tr>
                  <tr className="h-2 text-xs">
                    <td className="text-gray-400 pr-3 py-1">Due date</td>
                    <td className="text-gray-900 font-medium py-1">{new Date(task.dueDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}</td>
                  </tr>
                  <tr className="h-2 text-xs">
                    <td className="text-gray-400 pr-3 py-1">Status</td>
                    <td className="py-1">
                      <span className="bg-orange-100 capitalize  text-orange-600 px-2 py-1 rounded text-xs font-medium">
                        {task.status}
                      </span>
                    </td>
                  </tr>
                  <tr className="h-2 text-xs">
                    <td className="text-gray-400 pr-3 py-1">Priority</td>
                    <td className="py-1">
                      <span className="bg-blue-100 text-blue-600 px-3 capitalize py-1 rounded text-xs font-medium">
                        {task.priority}
                      </span>
                    </td>
                  </tr>
                  <tr className="h-2 text-xs">
                    <td className="text-gray-400 pr-3 py-1">Description</td>
                    <td className="text-gray-900 font-medium py-1">{task.description || '-'}</td>
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
         ) )}
        
        
            </div>
        </div>
        </div>
    </section>
  )
}

export default PropertyDetails
