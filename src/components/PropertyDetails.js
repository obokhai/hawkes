'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import api from '@/app/api'
// import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import nigeriaStates from '@/app/data/States'
import TaskCard from './TaskCard'
import { Timeline } from 'antd';
import StageList from './StageList'
import { Skeleton } from './ui/skeleton'
import { Button } from "@/components/ui/button";
import { X, Star, Share2, MoreVertical } from "lucide-react";
// import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// import axios from 'axios';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, EllipsisVertical, HelpCircleIcon, PlusIcon, TrendingUp } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
const chartData = [
  { browser: "safari", visitors: 60, fill: "#1dcb0b" },
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
import { Download, Link, SmileIcon, CircleCheckBig } from 'lucide-react'
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




const PropertyDetails = ({initialStages }) => {


  const searchParams = useSearchParams();
  const id = searchParams.get('property');
  console.log(id)

  const router = useRouter()
  const [property, setProperty] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false)
  const [updateTaskOpen, setUpdateTaskOpen] = useState(false)
  const [assignAssetOpen, setAssignAssetOpen] = useState(false)
  const [tasksLoading, setTasksLoading] = useState(false)

  const assignedAssetId = searchParams.get('property')
  // Update from here
    const [assetData, setAssetData] = useState({
      propertyName: "",
      address: "",
      authorizedUse: "",
      size: "",
      status: "",
    });
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
  const [assignUserId, setAssignUserId] = useState("")
  const [file, setFile] = useState(null);
  const [updateId, setUpdateId] = useState("")
  const [isOwner, setIsowner] = useState(false)
  const [updateTaskFiles, setUpdateTaskFiles] = useState([]);
  const [stages, setStages] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));


  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserId(prev => ({ ...prev, [name]: value }));
    console.log("Changed:", name, value);
  };
  const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'roleId', 'state'];
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
    document: "",
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
  function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
}
  const [tasks, setTasks] = useState({

    taskName: '',
    description: '',
    dueDate: getTodayDate(),
    status: 'pending',
    stageId: '',
    priority: ''
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
  const [roleIdSet, setRoleIdSet] = useState(1)
  const [editAsset, setEditAsset] = useState(false)
  const [errorMessage, setErrorMessage] = useState({}); 
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
  setRoleIdSet(selectedRoleId); // Still store it for other logic
  setFormState(prev => ({ ...prev, roleId: selectedRoleId }));

  if (!selectedRoleId) {
    setUserSelected(false);
    setUsers([]);
    return;
  }
  // if (selectedRoleId === "3" || selectedRoleId === 3) {
  // setIsowner(true);
  // setFormState(prev => ({ ...prev, isOwner: true }));
  // } else {
  // setIsowner(false);
  // setFormState(prev => ({ ...prev, isOwner: false }));
  // }
  // console.log(isOwner)

  getAllUsers(selectedRoleId); // Pass it here
};
    const handleEditClick = () =>{
      setAssetData({
        propertyName: property.propertyName || "",
        address: property.address || "",
        authorizedUse: property.authorizedUse || "",
        size: property.size || "",
        status: property.status || "",
      });
      setEditAsset(true);
    }

  const handleUpdateSubmit = async () => {
    const id = assignedAssetId
    try {
      if (!token) throw new Error("No token found.");
      const response = await api.patch(`/assets/${id}`,assetData);
      // toast.success(response.data.message)
     console.log(response.data)
      setIsOpen(false); // Close modal

      toast.success("Asset Updated Successfully")
    } catch (error) {
      toast.error("Error Submitting Asset")
      console.error("Submission Error:", error);
    }
    finally{
      setEditAsset(false)
    }
  };

const getAllUsers = async (roleId) => {
  setLoadingUsers(true);
  try {
    const response = await api.get(`/user/role?roleId=${roleId}`);
    const data = await response.data;
    console.log("Users API response:", data);


    const fetchedUsers = data?.data.users;
    setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    setUsers([]);
  } finally {
    setLoadingUsers(false);
  }
};

const completeStage = async (stageId) => {
  await api.patch(`/stage/update-stage/${stageId}`)
}

  const getStageTasks = async (stageId) => {
  setStageTaskId(stageId)
  setTasksLoading(true)
  try {
    const response = await api.get(`/stage/tasks/${stageId}`);
    const data = await response.data;
    setGetStageData(data.data.tasks)
    // Check if all tasks are completed
    const allCompleted = Array.isArray(data.data.tasks) && data.data.tasks.length > 0
      ? data.data.tasks.every(task => task.status === 'completed')
      : false;

    if (allCompleted) {
      // If all tasks are completed, mark stage as completed
      await completeStage(stageId);
    } else {
      // If any task is not completed, mark stage as pending
      await api.patch(`/stage/update-stage/${stageId}`, { status: 'pending' });
    }
    // You can set a state here if you want to use it in your UI
    // setAllTasksCompleted(allCompleted);
  } catch (error) {
    console.error("Failed to fetch Tasks:", error);
  } finally {
    setTasksLoading(false)
  }
};

  const addStage = async (e) => {
    e.preventDefault()
    const addNewStage = {
      ...stage,
      stagePosition: Number(stage.stagePosition)
    }
    console.log(addNewStage)
    try {
      const response = await api.post('/stage/create-stage', addNewStage)
      console.log(response)
      getStages()
      setAddStageModal(false)
      // router.push(`/dashboard?property=${id}`)
    } catch (err) {
      console.log(addNewStage)
      setErrorMessage(err?.response?.data?.errors || err.message);
      console.error("Error:", err);
    }
  }

  const handleManageStage = (e) => {
    const { name, value } = e.target;
    setUpdateStage(prev => ({ ...prev, [name]: name === 'stagePosition' ? parseInt(value, 10) : value }));
  }

  const manageStage = async (stage) => {
    console.log("manage stage Id", stage)
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
      const res = await api.post(`/stage/manage-stages/`, update)
      console.log("Response data:", res.data);
      if (!res) console.log(res.data)
      router.push(`/dashboard?property=${id}`)
    } catch (err) {
      console.error("Error:", err.response);
    }
  }

  const addTask = async (e) => {

    e.preventDefault()
    console.log(stageTaskId)
    const errors = {};
    const preparedTask = {
      ...tasks,
      dueDate: new Date(tasks.dueDate).toISOString(),
      stageId: stageTaskId
   };

     if (!preparedTask.taskName) errors.taskName = "Task name is required";
    if (!preparedTask.description) errors.description = "Description is required";
    if (!preparedTask.dueDate) errors.dueDate = "Due date is required";
    if (!preparedTask.status) errors.status = "Status is required";
    setErrorMessage(errors);
    if (Object.keys(errors).length > 0) return;


    console.log("Prepared Traning", preparedTask);
    try {
      const response = await api.post('/stage/tasks/create-task', preparedTask)
      console.log("Task Successfully Added")
      router.push(`/dashboard?property=${id}`)

    } catch (err) {
      console.error("Error:", err.response?.data?.errors || err.message);
      setErrorMessage(err?.response?.data?.errors || err.message);
    }
  }



  const [submitLoading, setSubmitLoading] = useState(false)
  const updateTask = async () => {
    setSubmitLoading(true)
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
      const response = await api.put(`/stage/task/${id}`, preparedTask)
      console.log("Task Successfully Updated")
      setUpdateTaskOpen(false)
      // router(`/dashboard?property=${id}`)

    } catch (err) {
      console.error("Error:", err.response?.data?.errors || err.message);
    }
    setSubmitLoading(false)
  }


  const getStages = async () => {
    if (!id) console.log("missing Id ")
    try {
      const response = await api.get(`/stage/${id}`);

      const data = await response.data
      setStageSteps(data.data.stages)
      console.log("Stage Steps Data", data.data.stages)

    } catch (error) {
      console.error("Failed to fetch Stages:", error);
    } 

    console.log("Stage Steps", stageSteps)
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
    getStages()
  }, [id])

  const handleSubmit = async (e) => {
      const emptyFields = requiredFields.filter(
    (field) => !formState[field] || formState[field].toString().trim() === "");

    if (emptyFields) {
      console.log("Empty fields:", emptyFields);
      return
    } 
    // console.log(formState)
    e.preventDefault();
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dfna08jzi/auto/upload";
    const uploadPreset = "company_files"
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
        document: `${documentId}`,  // Use the uploaded document IDs
      }

      console.log(documentId)

    if (emptyFields.length > 0) {
    toast.error(`Please fill all required fields: ${emptyFields.join(", ")}`);
    return;
  }
      const response = api.post('/user/create-and-assign', formDataWithFiles)
      toast.success("User successfully created and assigned");
      console.log(response)
      // router.push(`/dashboard?property=${id}`)
      setInviteUserModal

    } catch (err) {
      toast.error(`Error creating user: ${err?.response?.data?.message || err.message}`);
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
    // router.push(`/dashboard?property=${id}`)
  };

  const assignAsset = async () => {
    const assetId = id;
    const assignedUserId = assignUserId;
    console.log(assignUserId)
    try {
      const response = await api.post(
        "/user/assign-asset", {
        userId: userId,
        assetId: assetId,
        isOwner
      },
      );
      toast.success(response.data.message);

      if (response.data.success === false && response.statusCode === 400) {
        toast.error(response.data)
        const errorData = await response.data;
        console.log(response)
        console.error("Failed to assign asset:", errorData.message || response.statusText);
        return;
      }

      const result = await response.data
      console.log("Asset successfully assigned:", result);
    } catch (error) {
      if(error?.response?.data.errors[0] === "userId must be a string"){
        toast.error("Please select a user to assign the asset")
        return
      }
      else if(error?.response?.data?.message === "Asset already assigned to user"){
        toast.error("Asset already assigned to user")
        return
      }
      toast.error(error?.response?.data?.message)
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
      console.log("The Roles Data", data.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = stageSteps.findIndex(item => item.id === active.id);
    const newIndex = stageSteps.findIndex(item => item.id === over.id);
    const reordered = arrayMove(stageSteps, oldIndex, newIndex);
    setStageSteps(reordered);

    const stageUpdates = reordered.map((stage, index) => ({
      id: stage.id,
      stagePosition: index + 1,
    }));

    try {
      await api.post(
        '/stage/manage-stages',
        { stageUpdates },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Stages updated successfully');
    } catch (err) {
      console.error('Error updating stages:', err.response?.data || err.message);
    } finally {
      setLoading(false)
    }
  }
  const SortableItem = ({ id, name }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '12px',
      background: '#fefefe',
      border: '1px solid #ccc',
      borderRadius: '6px',
      marginBottom: '8px',
      cursor: 'grab'
    };


    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {name}
      </div>
    );
  };

  return (
    <section className="mt-18 ms-28 me-10 min-h-screen flex flex-col gap-y-4 px-4 py-12">
      <div className='lg:w-full  bg-white min-h-1/3 flex w-1/4 justify-between shadow-xl rounded-lg items-center'>
        { }
        <div className='flex flex-col flex-1 min-w-1/4 border-r-2 relative gap-y-3 justify-center border-gray-100 px-12 h-full' >

          {/* <button className="text-blue-600 underline mb-4 cursor-pointer" onClick={() => router.push("/dashboard")}>← Back to Properties</button> */}
          <Image src='/house.svg' alt='hawkes property detail' width={140} height={140} />
          <h3 className='lg:text-2xl max-lg:text-xl text-clip font-bold'>{property?.propertyName}</h3>
          <p className='text-xs'>{property?.address}</p>
          <button className='border w-16 text-xs' onClick={handleEditClick}>Edit</button>
        </div>

        <div className='grid grid-cols-2 w-2/4 text-sm px-4 space-y-3 relative'>
          <span className='font-bold text-xs'>Asset Id:</span>
          <span className='grid grid-cols-2 space-x-2 text-xs'>
            <span className='w-28 truncate'>{property.id}</span>
            <span className=''>
              <Dialog open={inviteUserModal} onOpenChange={setInviteUserModal} className="w-[200px]" id='ínviteUser'>
                <DialogTrigger asChild>
                  <div className='flex w-full justify-end absolute top-6 right-0 -mt-10 cursor-pointer pe-4'>
                    <Image src='/inviteuser.svg' className='' width={100} height={20} />
                  </div>
                </DialogTrigger>
                <DialogContent className="w-full  bg-white">
                  <DialogHeader>
                    <DialogTitle className='text-sm'> 
                      Invite User
                    </DialogTitle>
                  </DialogHeader>
                  <div className="min-w-[400px] mx-auto mt-10 bg-white rounded-xl scroll-auto">
                    {currentStep === 1 && (
                      <>
                        <div className="grid gap-4">
                          <label className='text-xs'> User Role
                          <select name="roles" onChange={handleUserRoleChange} className='focus:outline-none border-[1px] p-2 text-xs cursor-pointer rounded w-full py-[6px]'>
                            {/* <option value=''>Select Role</option> */}
                            {roleData.map((role) => (
                              <option key={role.id} value={role.id}>{role.name}</option>
                            ))}

                          </select>
                          </label>

                          {roleIdSet && (
                            loadingUsers ? (
                              <div className="flex justify-center items-center my-4">
                                <ClipLoader size={28} color="#6434F8" />
                              </div>
                            ) : (
                              users.length > 0 && (
                                <label className='text-xs leading-4 font-light'> Assign User
                                <select name="users" className='focus:outline-none border-[1px] p-2 text-xs cursor-pointer rounded w-full py-[6px]' onChange={e => setUserId(e.target.value)}>
                                  {/* <option value="">Select User</option> */}
                                  {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.firstName}</option>
                                  ))}
                                </select>
                                </label>
                              )
                            )
                          )}

                        </div>

                        <div className='flex flex-col items-center justify-center my-6 gap-y-8'>
                          <span className='rounded-full w-12 h-12 flex items-center justify-center bg-gray-100 text-sm font-extralight'>Or</span>
                          <button onClick={nextStep} className='w-full h-8 border-[1px] rounded-sm flex justify-center items-center text-[#2C1C92] my-3 text-xs font-light border-[#2C1C92] p-6 text-center'>Add New</button>
                        </div>
                        <div className="flex justify-end mt-6 gap-x-5">
                          {/* <button onClick={prevStep} className="rounded-full border-[1px] text-[#2C1C92] border-[#2C1C92] px-8 py-3">Back</button> */}
                          <button onClick={async () => { await assignAsset(); setInviteUserModal(false) }} className="bg-[#2C1C92] text-xs rounded-full text-white px-8 py-3">Submit</button>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <form onSubmit={handleSubmit} className="space-y-4  max-h-96 overflow-y-auto">
                        <div className="mb-6 min-w-[400px] flex flex-col">
                          <label htmlFor="roleId" className="block text-[10px] font-medium mt-3 mb-1">User Role</label>
                          <select
                            name="roleId"
                            value={formState.roleId}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                            className="border p-2 text-[10px] cursor-pointer rounded w-full py-[6px]"
                          >
                            <option value="Select user">Select Role</option>
                            {roleData.map((role) => (
                              <option key={role.id} className='text-[10px]' value={role.id}>{role.name}</option>
                            ))}
                          </select>

                          <label htmlFor="userType" className="block text-[10px] font-medium mt-3 mb-1">User Type</label>

                          <select
                            id="userType"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full border text-[10px] border-gray-300 cursor-pointer rounded py-[6px]"
                          >
                            <option value="">Select</option>
                            <option value="individual" className='text-xs'>Individual</option>
                            <option value="company" className='text-xs'>Company</option>
                          </select>
                        </div>

                        {userType === 'individual' && (
                          <div className="space-y-4">
                            <div className="flex gap-x-5">
                              <label className="text-[10px] w-full">First Name
                                <input name="firstName"
                                  value={formState.firstName}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                  placeholder="First Name" className="w-full mt-1 border p-3 rounded" />
                              </label>
                              <label className="text-[10px] w-full">Last Name
                                <input type="text"
                                  name="lastName"
                                  value={formState.lastName}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                  placeholder="Last Name" className="w-full mt-1 border p-3 rounded" />
                              </label>
                            </div>
                            <label className="text-[10px]">Address
                              <input name='address' value={formState.address}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                placeholder="Address" className="w-full border p-2 rounded" />
                            </label>
                            <label className="text-[10px] w-full">State
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
                            <div className="flex gap-x-5 mt-3">
                              <label className="text-[10px] w-full">Phone Number
                                <input name="phoneNumber" value={formState.phoneNumber}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                  placeholder="PhoneNumber" className="w-full border p-3 rounded" />
                              </label>
                              <label className="text-[10px] w-full">Email
                                <input name="email" value={formState.email}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
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
                                value={formState.companyName}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                placeholder="Enter Company Name"
                                className="w-full h-7 border p-2 rounded"
                              />
                            </label>
                            <label className="text-[10px] w-full">Company Address
                              <input
                                name="address"
                                value={formState.address}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                placeholder="Enter Address"
                                className="w-full border h-7 p-2 rounded"
                              />
                            </label>
                            {/* <label className="text-xs w-full">
                            <input
                              name="email"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                              placeholder="Email"
                              className="w-full border p-2 rounded"
                            />
                          </label> */}
                            <label className="text-[10px] w-full">State
                              <select
                                name="state"
                                value={formState.state}
                                onChange={e => setFormState({ ...formState, state: e.target.value })}
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

                              <input type="file" onChange={handleCompanyFiles} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className='w-full h-20 bg-blue-200 rounded-md  flex justify-center px-16 pt-6' placeholder='Upload Documents' />
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
                                  value={formState.firstName}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                  placeholder="Enter firstname"
                                  className="w-full mt-2 border placeholder:text-[10px] p-3 rounded"
                                />
                              </label>
                              <label className="text-[10px] w-full">Last Name
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formState.lastName}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                  placeholder="Enter lastname"
                                  className="w-full mt-2 border placeholder:text-[10px] p-3 rounded"
                                />
                              </label>
                            </div>
                            <div className="flex gap-x-5">
                              <label className="text-[10px] w-full">Phone Number
                                <input
                                  name="phoneNumber"
                                  value={formState.phoneNumber}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                  placeholder="Enter phone number"
                                  className="w-full mt-2 border p-3 placeholder:text-[10px] rounded"
                                />
                              </label>
                              <label className="text-[10px] w-full">Official Email
                                <input
                                  name="email"
                                  value={formState.email}
                                  onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                                  placeholder="Enter Email"
                                  className="w-full mt-2 border p-3 placeholder:text-[10px] rounded"
                                />
                              </label>
                            </div>

                          </div>
                        )}
                        <div className='flex w-full justify-end'>

                          <button type='submit' className="mt-6 bg-[#312787] text-white text-xs items-end py-2 px-4 rounded-full">Assign & Submit</button>
                        </div>
                      </form>
                    )}

                  </div>
                </DialogContent>
              </Dialog></span>
          </span>
          <span className='font-bold text-xs'>Authorized Use:</span><span className='text-xs'>{property.authorizedUse}</span>
          <span className='font-bold text-xs'>Size:</span><span className='text-xs'>{property.size}</span>
          <span className='font-bold text-xs'>Client:</span><span className='text-xs'>{`${property?.owner?.firstName || ''} ${property?.owner?.lastName || ''}`}</span>
          <span className='font-bold text-xs'>JV Partner:</span><span className='text-xs'>{`${property?.jvUsers?.[0]?.firstName || ''} ${property?.jvUsers?.[0]?.lastName || ''}`}</span>
          <span className='font-bold text-xs'>Assigned Legal Rep:</span><span className='text-xs'>{property.legal || '-'}</span>
          <span className='font-bold text-xs'>Date Added:</span><span className='text-xs'> {new Date(property.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</span>
          <span className='font-bold text-xs'>Status:</span><span className='text-xs'>{property.status}</span>


        </div>
        <div className='w-1/4 border-l-2 p-3 mt-4 border-gray-100'>
          <div className='flex justify-between items-center'>
            <h4 className='text-xs font-bold z-20'>Progress Report
              <div className='h-1 w-16 rounded-full mt-1 bg-amber-400' />
              {/* <Image src='/inviteuser.svg' width={120} height={20} /> */}
            </h4>
            {/* <select className='border-2 z-20 p-2 px-6 rounded-lg'>
              <option>All</option>
            </select> */}
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
                    endAngle={chartData[0].visitors * 3.6}
                    innerRadius={80}
                    outerRadius={150}
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
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className='w-full bg-white min-h-2/3 p-12 space-y-8 shadow-xl rounded-xl'>
        <Dialog className="w-[600px]">
          <DialogTrigger asChild >
            <p className='flex text-sm items-center cursor-pointer'>Manage Stages <ChevronRight className='h-5' /> </p>
          </DialogTrigger>
          <DialogContent className="w-[1200px] bg-white [&>button]:hidden">
            <DialogHeader className='flex flex-col border-b-2 justify-center border-gray-200 py-2'>

              <div className='flex justify-between items-center'>
                  <DialogClose asChild={true} className='cursor-pointer'>
                      <ChevronLeft size={25}/>
                  </DialogClose>
              {/* <EllipsisVertical className='cursor-pointer' /> */}
              </div>
                  {/* <div className='border-b-2 border-gray-200 mt-4'/> */}
            </DialogHeader>
            <div className="mx-auto mt-1 bg-white rounded-xl">
            <div className='flex justify-between items-center mb-6'> 
              <div className='space-y-2'>
              <h3 className='font-bold'>Manage Stages: </h3>
              <p className='text-gray-400 text-[10px] font-light'>Drag and drop to re-order stages</p>

              </div>
              <Dialog className="w-[1200px]">
                <DialogTrigger asChild>
                  <PlusIcon className='cursor-pointer' />
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
            </div>
                <table className='mt-3 h-52 overflow-auto'>
                  <thead>
                   <tr className='text-xs font-bold flex justify-between gap-x-12 bg-blue-500 text-white py-2 mb-1 px-2'>
                    <p>Postition</p>
                    <p className='-ms-16'>Name</p>
                      <p>Description</p>
                      <p>Action</p>
                   </tr>
                  </thead>
                  <tbody className=' '>
                    <tr>
                      <StageList assetId={assignedAssetId} />
                    </tr>
                  </tbody>
                  
                </table>
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex  justify-between items-center w-full max-w-6xl mx-auto py-8">
          <div className='flex flex-col w-full'>
            <div className='flex  gap-x-12'>
              {stageSteps == 0 && (
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
                  <div key={step.id} onClick={() => getStageTasks(step.id)} className="flex cursor-pointer flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step.status === "completed" ? "bg-[#312787] text-white " : "border-[1px] border-indigo-700 text-indigo-700"
                        }`}
                    >
                      {step.stagePosition}
                    </div>
                    <span
                      className={`mt-2 text-center text-sm ${step.status === "completed" ? "text-[#312787] font-semibold" : "text-indigo-700"
                        }`}
                    >
                      {step.stageName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
           {(() => {
      const completedCount = stageSteps.filter(step => step.status === 'completed').length;
      const totalCount = stageSteps.length;
      const progressValue = Math.round((completedCount / totalCount) * 100);

      return (
        
      stageSteps.length > 0 ? (
            <Progress
              value={progressValue}
              className="h-4 mt-4 [&>div]:bg-[#312787]"
            />
          ): (<p></p>)
      );

    })()}
          </div>
        </div>

        <div className='flex flex-col space-y-4 lg:w-full'>
          <span className='flex justify-between'>
            <h3 className='text-xl'>Tasks</h3>
            <Dialog className="min-w-[1200px]">
              <DialogTrigger asChild>
                <PlusIcon className='cursor-pointer' />
              </DialogTrigger>
              <DialogContent className=''>
                <DialogHeader>
                  Add Task
                </DialogHeader>
                <div className="px-4 mx-auto bg-white rounded-xl">
                 <form onSubmit={addTask}>
                  <div className="space-y-4">
                    <div className="flex-col gap-x-5 gap-y-6">
                      
                      <label className="text-xs w-full">Task name
                        <input
                          name="taskName"
                          value={tasks.taskName}
                          onChange={handleTaskChange}
                          placeholder="Enter Name"
                          className={`w-full mb-2 border p-3 rounded ${errorMessage.taskName ? 'border-red-400' : ''}`}
                        />
                       
                      </label>

                      <label className="text-xs w-full">Description
                        <textarea
                          name="description"
                          value={tasks.description}
                          rows={2}
                          onChange={handleTaskChange}
                          placeholder="Enter Description"
                          className={`w-full mb-2 border p-3 rounded ${errorMessage.description ? 'border-red-400' : ''}`}
                        />
                        
                      </label>

                      <label className="text-xs w-full">Due Date
                        <input
                          name="dueDate"
                          type='date'
                          value={tasks.dueDate}
                          onChange={handleTaskChange}
                          placeholder="Enter due date"
                          className={`w-full mb-2 border p-3 rounded ${errorMessage.dueDate ? 'border-red-400' : ''}`}
                        />
                        
                      </label>

                      <div className='flex gap-x-8'>
                        <label className="text-xs w-full">Status
                          <select
                            name="status"
                            value={tasks.status}
                            onChange={e => setTasks({ ...tasks, [e.target.name]: e.target.value })}
                            placeholder="Enter Position"
                            className={`w-full mb-2 border p-3 rounded ${errorMessage.status ? 'border-red-400' : ''}`}
                          >
                            <option value=''>Select</option>
                            <option value='pending'>pending</option>
                            <option value='in_progress'>In progress</option>
                            <option value='completed'>completed</option>
                          </select>
                         
                        </label>
                        <input
                          type='hidden'
                          value={stageTaskId}
                          name='stageID'
                          onChange={e => setTasks({ ...tasks, [e.target.name]: e.target.value })}
                        />
                      </div>
                    </div>
                    <button type='submit' className='w-44 h-10 rounded-full bg-[#312787] flex text-center justify-self-end justify-center items-center text-white'>Save</button>
                  </div>
                </form>
                </div>
              </DialogContent>
            </Dialog>

          </span>

          <div className='flex gap-x-4 gap-2 flex-wrap'>

            {
            tasksLoading ? (
              <div className='w-60 h-[220px] px-4 shadow-md gap-x-6 items-center flex'>
                <Skeleton className="rounded-full w-12 h-10 bg-[#eee]" />
                <div className='flex flex-col w-full gap-y-3'>
                  <Skeleton className='w-full bg-[#eee] h-5' />
                  <Skeleton className='w-full bg-[#eee] h-5' />
                </div>
              </div>
            )  : getStageData.length === 0 ? (
                  <div className="flex flex-col items-center mx-auto justify-center text-sm text-gray-500">
                    <Image src="/empty_assets.svg" width={100} height={100} />
                    <h5 className='font-bold'>No Tasks Yet</h5>
                    <p className=''>Get started by adding a New Stage.</p>
                  </div>
            ) : (  
            
            getStageData.map((task) => (
              <Sheet key={task.id} showClose={false} className='scroll-auto '>
                <SheetTrigger >
                  <TaskCard
                      title={task.taskName}
                      // onClick={() => taskDetails(task.id)}
                      description={task.description}
                      status={task.status}
                      commentsCount={0}
                      date={task.dueDate}
                      linksCount={11}
                    />
                </SheetTrigger>
                <SheetContent  className='flex flex-col overflow-scroll px-2 [&>button]:hidden'> 
                  <div className="flex items-center justify-between border-b px-4 py-2">
                    {/* Left Close Button */}
                     <SheetClose asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-lg h-8 w-8" >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>

                    {/* Right Action Icons */}
                    <div className="flex items-center gap-4 text-gray-500">
                      <Star className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                      <Share2 className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                      <MoreVertical className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-2 px-3'>
                      <h2 className='font-bold text-sm capitalize'>Listing deliverables checklist</h2>
                      <p className='text-[10px] text-gray-500'> Make changes to your profile here. Click save when you're done.</p>
                  </div>
                  <div className="flex flex-col h-16 space-x-2 mx-2 rounded-xl p-2 min-h-96">
                    <div className="table-auto w-full shrink text-sm text-left">
                      <div className='space-y-1 mb-2'>
                        <div className="text-xs grid grid-cols-2 items-center not-first-of-type:gap-x-3">
                          <div className="text-gray-400 text-xs font-bold pr-3 py-1">Created date</div>
                          <div className="text-gray-900 font-medium py-1">{new Date(task.createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          </div>
                          <Dialog className="w-[600px]">
                            <DialogTrigger asChild>
                              <div className='bg-blue-400 text-white absolute right-4 font-bold cursor-pointer p-1 w-16 rounded text-center ' onClick={() => setEditedTask(task)}>Update</div>
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
                                          placeholder="Enter Task Name" className="w-full mb-2 border p-3 rounded" />
                                      </label>

                                      <label className="text-xs w-full">Description
                                        <textarea name="description"
                                          value={editedTask.description}
                                          rows={2}
                                          onChange={handleTaskUpdate}
                                          placeholder="Enter Task Name" className="w-full mb-2 border p-3 rounded" />
                                      </label>

                                      <label className="text-xs w-full">Due Date
                                        <input name="dueDate"
                                          type='date'
                                          value={editedTask.dueDate}
                                          onChange={handleTaskUpdate}
                                          placeholder="Enter due date" className="w-full mb-2 border p-3 rounded" />
                                      </label>
                                      {/* <div>
                                        <input type="file" onChange={handleUpdateTaskFiles} multiple className='w-full h-10 bg-cyan-100' placeholder='Upload Documents' />
                                      </div> */}
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
                                    <button type='button' onClick={updateTask} className={`w-32 h-10 rounded-full ${submitLoading ? 'cursor-not-allowed disabled' : 'cursor-pointer'} bg-[#312787] flex text-center justify-self-end justify-center items-center text-white`}>{submitLoading ? (<p>Submitting</p>) : (<p>Submit</p>)}</button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                         </div>
                        <div className="grid grid-cols-2 items-center text-xs">
                          <div className="text-gray-400 font-bold pr-3 py-1">Due date</div>
                          <div className="text-gray-900 font-medium py-1">{new Date(task.dueDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}</div>
                         </div>
                        <div className="grid grid-cols-2 items-center text-xs">
                          <div className="text-gray-400 text-xs font-bold pr-3 py-1">Status</div>
                          <div className="py-1">
                            <span className="bg-orange-100 capitalize  text-orange-600 px-2 py-1 rounded text-xs font-medium">
                              {task.status}
                            </span>
                          </div>
                         </div>
                        <div className="grid grid-cols-2 items-center text-xs">
                          <div className="text-gray-400 text-xs font-bold pr-3 py-1">Priority</div>
                          <div className="py-1">
                            <span className="bg-blue-100 text-blue-600 px-3 capitalize py-1 rounded text-xs font-medium">
                              {task.priority}
                            </span>
                          </div>
                         </div>
                        <div className="grid grid-cols-2 items-center text-xs">
                          <div className="text-gray-400 font-bold pr-3 py-1">Description</div>
                          <div className="text-gray-900 font-medium py-1">{task.description || '-'}</div>
                         </div>
                      </div>
                    </div>
                  <div className=' min-h-20'>
                    <div className='bg-gray-200 mb-5 p-3 pb-6 rounded-xl'>
                      <p className='text-[10px] text-black'>Review and confirm all required deliverables for the property listing, ensuringcompleteness and
                        accuracy before submission.</p>
                    </div>
                    <div className='flex-col flex gap-y-3'>
                      <div className='flex justify-between text-xs'>
                        <div className='space-x-3 text-gray-600 flex items-center'>
                          <Link className='h-4' />
                          <p>Attachments</p>
                        </div>
                        <div className='flex gap-x-2 items-center text-blue-800'>
                          <Download className='h-4' />
                          <p>Download All</p>
                        </div>
                      </div>
                      <div className='flex gap-x-2 flex-wrap w-full'>
                        <Image src='/brief_pdf.svg' alt='attachment' width={100} height={120} />
                        <Image src='/brief_docx.svg' alt='attachment' width={100} height={120} />
                        <Image src='/brief_pdf.svg' alt='attachment' width={100} height={120} />
                        <PlusIcon className='h-5 w-5 bg-gray-200 rounded-full flex items-center mt-4 justify-center text-gray-500 cursor-pointer' onClick={() => setAddFilesModal(true)} />
                      </div>
                    </div>
                    <Tabs defaultValue="account" className="w-[300px] mt-4">
                      <TabsList className='bg-white shadow-none rounded-none mb-3 '>
                        <TabsTrigger value="comment" className=' hover:border-b hover:border-gray-500 cursor-pointer text-[10px]'>Comment</TabsTrigger>
                        <TabsTrigger value="activities" className='hover:border-gray-500 hover:border-b cursor-pointer text-[10px]'>Activities</TabsTrigger>
                      </TabsList>
                      <TabsContent value="comment">
                        <div className='flex-col flex w-full gap-y-2 mb-6'>
                          <textarea rows={2} placeholder='Write a Comment' className='p-5 border-2 border-gray rounded-xl placeholder:text-xs' />
                          <div className='flex justify-between items-center'>
                            <span className='flex gap-x-2 text-gray-600'>
                              <Link className='h-4' />
                              <SmileIcon className='h-4' />
                            </span>
                            <button className='bg-[#312787] text-white px-6 py-2 rounded-lg '>Send</button>
                          </div>
                          <div className='space-y-6 mt-3 flex flex-col flex-wrap'>
                            <div className='flex items-center gap-x-4 '>
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
                              children: <p className='text-xs'>Create a services site 2015-09-01</p>,
                              dot: <CircleCheckBig size={14} />,
                              color: "green"
                            },
                            {
                              children: <p className='text-xs'>Solve initial network problems 2015-09-01</p>,
                              dot: <CircleCheckBig size={14} />,
                              color: "green"
                            },
                            {
                              children: <p className='text-xs'>Technical testing 2015-09-01</p>,
                              dot: <CircleCheckBig size={14} />,
                              color: "green"
                            },
                            {
                              children: <p className='text-xs'>Network problems being solved 2015-09-01</p>,
                              dot: <CircleCheckBig size={14} />,
                              color: "green"
                            },
                          ]}
                        />
                      </TabsContent>
                    </Tabs>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
           ))
  )
}
             
            
          </div>
        </div>
      </div>
      {/* Update Asset Modal */}
       <Dialog open={editAsset} onOpenChange={setEditAsset}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Property</DialogTitle>
                </DialogHeader>
                        <div className="max-h-[70vh] overflow-y-auto space-y-4">
                            <div className="grid gap-4">
                              <label className='text-xs '>
                                Asset Name
                              <input name="propertyName" onChange={handleAssetChange} value={property.propertyName} placeholder="Asset Name" className=" mt-1 border p-2 rounded w-full" />
                              </label>
                              <label className='text-xs '>
                                Address
                              <input name="address" onChange={handleAssetChange} value={`${property.address}`} placeholder="Address" className="border p-2 mt-1  rounded w-full" />
                              </label>
                              <label className='text-xs '>
                                Authorized Use
                              <input name="authorizedUse" onChange={handleAssetChange} value={property.authorizedUse} placeholder="Authorized Use" className=" mt-1 border p-2 rounded w-full" />
                              </label>
                              <label className='text-xs '>
                                Size
                              <input name="size" onChange={handleAssetChange} value={property.size} placeholder="Size" className="border p-2 rounded mt-1  w-full" />
                              </label>
                              <label className='text-xs'>
                               Status
                              <div className='flex gap-x-6 w-1/2'>
                                  {/* <input name="dateAdded" type="date" onChange={handleAssetChange} value={assetData.dateAdded} className="border p-2 rounded w-full" /> */}
                                  <select name="status" onChange={handleAssetChange} value={property.status} placeholder="Select Status" className="border p-2 rounded w-full">
                                    <option value="">Select Status</option>
                                    <option value="active">active</option>
                                    <option value="pending">pending</option>
                                  </select>
                              </div>
                              </label>
                            </div>
                            <div className="flex justify-end mt-6">
                              <button onClick={handleUpdateSubmit} className="bg-[#2C1C92] cursor-pointer text-white px-6 py-2 rounded-full">Submit</button>
                            </div>
                        </div>        
                </DialogContent>
            </Dialog>
    </section>
  )
}

export default PropertyDetails
