import { useState, useEffect } from "react"
import Image from "next/image"
// import CustomCalendar from "@/components/CustomCalendar"
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
import {Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import api from '@/app/api'
import nigeriaStates from "../data/States"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Client = () => {
    const [errorMessage, setErrorMessage] = useState([])
    const [userType, setUserType] = useState('');
    const [usersByRole, setUsersByRole] = useState([]);
    const [totalClients, setTotalClients] = useState(0)
    const [open, setOpen] = useState(false)
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
    const [file, setFile] = useState(null);
    const token = localStorage.getItem("token")

     const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
    const handleCompanyFiles = (e) => {
    setCompanyFiles(Array.from(e.target.files));
  };

  const fetchUsersByRole = async () => {
    try {
      if (!token) throw new Error("No token found.");
  
      const response = await fetch('https://propertyapi-monolithic.onrender.com/api/v1/user/role?roleId=3', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error("Failed to fetch users");
  
      const data = await response.json();
      setUsersByRole(data?.data?.users || []);
      setTotalClients(data.data.users.length);
      console.log("Fetched Users for total:", data?.data?.users.length);
      // alert("Users loaded successfully");  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!token) throw new Error("No token found.");
  
      const payload = {
        ...formData,
        userType,
        document: file ? file.name : ''
      };
  console.log(payload)
      const response= await axios.post("https://propertyapi-monolithic.onrender.com/api/v1/user/create",payload,{
        headers:{
          "Authorization": `Bearer ${token}`,
        }
      })
  
      // if (!response.ok) throw new Error("Failed to submit");
  
      console.log(response)
      console.log("Submitted:", result);
    } catch (error) {
      console.error("Submission Error:", error);
          if (error.response?.data?.errors) {
      setErrorMessage(error.response.data.errors);
    } else {
      setErrorMessage([{ message: error.message || "Unknown error occurred" }]);
    }
      // alert("Submission failed. Check console for details.");
    }
  };
  return (

            <section className="mt-28 ms-28 me-10 min-h-screen bg-white rounded-2xl px-8 py-12">
                  <div className="flex justify-between mb-14 text-black items-center">
                        <h3 className="text-2xl ">Owners <span>{totalClients} </span></h3>
                           {errorMessage.map((errors)=>(
                                    <p className="text-red-400 text-xs" key={errors.id}>{errors}</p>
                             ))}

                        <div className="flex space-x-6">
                            <div className="flex items-center space-x-2 ">
                               <Image src="/export_client_data.svg" width={120} height={40} />
                               <Dialog className="w-[1200px]">
                                <DialogTrigger asChild>
                                    <Image src="/add_new_client.svg" width={120} height={40} />
                                </DialogTrigger>
                                <DialogContent className="w-full  overflow-y-auto h-[400px]  bg-white">
                                <div className="max-w-7xl mx-auto mt-10 bg-white rounded-xl">
                                <h2 className="text-2xl font-bold mb-6">Add Owner</h2>

                                    {/* Dropdown */}
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
                                      
                                                                    {/* <input type="file" onChange={handleCompanyFiles} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className='w-full h-20 bg-blue-200 rounded-md  flex justify-center px-16 pt-6' placeholder='Upload Documents' /> */}
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
                                    </div>
                                </DialogContent>
                                </Dialog>

                            </div> 
                        </div>
                        </div>
                    <section id="property_listings" className="space-y-3.5 flex flex-col">
                    <Table className="space-y-6 table table-auto border-b">
                      <TableHeader className=" rounded-tr-2xl justify-evenly rounded-tl-2xl py-12">
                        <TableRow className="font-bold text-sm border-2 border-gray-200">
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
                            <TableCell className="">{user.id}</TableCell>
                            <TableCell>
                                  <DropdownMenu className=" ">
                                    <DropdownMenuTrigger>
                                       <Image src="/three_dots.svg" alt="" className="mx-auto" width={16} height={12} />
                                    </DropdownMenuTrigger>
                                      <DropdownMenuContent className="w-32">  
                                            <DropdownMenuItem onClick={() => setOpen(true)}>View Profile</DropdownMenuItem>
                                         
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem >Delete</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                      </DropdownMenuContent>
                                      </DropdownMenu>
                                     <Sheet className="w-full bg-transparent" open={open} onOpenChange={setOpen}>
                                        <SheetContent className="w-full px-2 overflow-auto h-full bg-gray-200">
                                          <SheetHeader className='space-y-6'>
                                            <h3>Client Profile view</h3>
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
                                          </SheetHeader>
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
                                        </SheetContent>
                                        </Sheet>
                                  
                              </TableCell>
                          </TableRow>
                        ))}                 
                      </TableBody>
                    </Table>

                    </section>
                    </section>
  )
}

export default Client