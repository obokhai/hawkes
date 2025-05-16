import Image from "next/image"
import { useEffect, useState } from "react"
import CustomCalendar from "@/components/CustomCalendar"
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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import Link from "next/link"
const jv = [
  {
    sn:1,
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "1",
  },
  {
    sn:2,
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "3",
  },
  {
    sn:3,
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "1",
  },
  {
    sn:4,
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "4",
  },
]

const JV = () => {
const [usersByRole, setUsersByRole] = useState([]);
const [userType, setUserType] = useState('');
const [companyState, setCompanyState] = useState('');
const [file, setFile] = useState(null);
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
const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

// Get All JV's

const fetchUsersByRole = async () => {
  try {
    if (!token) throw new Error("No token found.");

    const response = await fetch('https://propertyapi-monolithic.onrender.com/api/v1/user/role?roleId=2', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Failed to fetch users");

    const data = await response.json();
    setUsersByRole(data?.data?.users || []);
    console.log("Fetched Users:", data);
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
// 

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};
// Add New JV
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!token) throw new Error("No token found.");

    const payload = {
      ...formData,
      userType,
      companyState,
      document: file ? file.name : '',
    };

    const response = await fetch("https://propertyapi-monolithic.onrender.com/api/v1/user/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to submit");

    const result = await response.json();
    console.log("Submitted:", result);
    alert("JV Partner successfully added.");
  } catch (error) {
    console.error("Submission Error:", error);
    alert("Submission failed. Check console for details.");
  }
};
// 


  return (
    <section className="mt-28 ms-28 me-10 min-h-screen bg-white rounded-2xl px-8 py-12">
                  <div className="flex justify-between mb-14 text-black items-center">
                        <h3 className="text-2xl ">JV Partners : 4</h3>
                        <div className="flex space-x-6">
                            <div className="flex items-center cursor-pointer space-x-2 bg-gray-100  border-gray-300 rounded-xs border-[1px] lg:w-32 justify-center  py-3 px-4">
                                <Image src="/arrow_up.svg"  alt="arrow up" width={13} height={13} />
                                <p className="text-md ">Export</p>
                            </div> 
                             <Dialog className="w-[1200px]">
                                                            <DialogTrigger asChild>
                                                                <Image src="/add_new_client.svg" className="cursor-pointer" width={176} height={50} />
                                                            </DialogTrigger>
                                                            <DialogContent className="w-full  bg-white">
                                                            <div className="max-w-7xl mx-auto mt-10 bg-white rounded-xl">
                                                              <h2 className="text-2xl font-bold mb-6">Add JV</h2>

                                                                  {/* Dropdown */}
                                                                  <form onSubmit={handleSubmit} className="space-y-4">
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
                                                                            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                          <label className="text-xs w-full">Last Name
                                                                            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                        </div>
                                                                        <label className="text-xs">Address
                                                                          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
                                                                        </label>
                                                                        <div className="flex gap-x-5">
                                                                          <label className="text-xs w-full">Phone Number
                                                                            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                          <label className="text-xs w-full">Email
                                                                            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mt-2 border p-2 rounded" />
                                                                          </label>
                                                                        </div>
                                                                      </div>
                                                                    )}

                                                                    {userType === 'company' && (
                                                                      <div className="flex flex-col gap-y-4">
                                                                        {/* <h3 className="text-lg font-semibold">Company Details</h3> */}
                                                                        <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="w-full border p-2 rounded" />
                                                                        <input name="address" value={formData.address} onChange={handleChange} placeholder="Company Address" className="w-full border p-2 rounded" />
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
                                                                               <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                              <label className="text-xs font-bold"> Last name
                                                                                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                          </div>
                                                                          <div className="flex gap-x-6">
                                                                              <label className="text-xs font-bold w-1/2"> Phone Number
                                                                               <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                              <label className="text-xs font-bold"> Official Email
                                                                                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full mt-2 border p-2 rounded" />
                                                                              </label>
                                                                          </div>

                                                                        </div>
                                                                      </div>
                                                                    )}

                                                                    <button type="submit" className="mt-6 bg-[#6434F8] text-white py-2 px-4 rounded-md">Submit</button>
                                                                  </form>
                                                                  </div>
                                                            </DialogContent>
                                                            </Dialog>
                        </div>
                        </div>
                    <section id="property_listings" className="space-y-3.5">
                    <Table className="space-y-6">
                      <TableHeader className=" rounded-tr-2xl rounded-tl-2xl py-12">
                        <TableRow className="font-bold text-lg border-2 border-gray-200">
                          <TableHead className="w-[100px]"></TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>No. Of Allocated Properties</TableHead>
                          <TableHead className=""></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="border-l-2 border-gray-200 border-r-2 ">
                      
       
                       {Array.isArray(usersByRole) && usersByRole.map((user, index) => (
                          <TableRow key={user.id} className="text-xs truncate border-gray-200 px-8">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium gap-x-5 flex items-center">
                              <Image src="/avatar.svg" alt={`${user.firstName} ${user.lastName}`} width={50} height={50} className="rounded-full" />
                              {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell className="text-[#35A0E4]">Jvs@example.com</TableCell>
                            <TableCell>+1928019390490</TableCell>
                            <TableCell className="ps-12">{user.id}</TableCell>
                            <TableCell>
       
                            <Dialog className="w-full">
                                <DialogTrigger asChild>
                                <Image src="/three_dots.svg" alt="" className="mx-auto" width={12} height={12} /> 
                                </DialogTrigger>
                                <DialogContent className="w-full  bg-gray-200">
                                  <DialogHeader className='space-y-6'>
                                    <DialogTitle>JV Partner Profile view</DialogTitle>
                                    <div className="border-b border-[1px] border-gray-300" />
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-x-3">
                                          <Image src='' width={90} height={90} className="rounded-full" />
                                          <div className="flex flex-col">
                                            <h4 className="font-bold text-xs">Sample JV </h4>
                                            <p className="text-xs">Individual | Company</p>
                                          </div>
                                      </div>
                                      <div className="flex gap-x-2 ">
                                        <Image alt="chat" src='/chat.svg' width={80} height={80} />
                                        <Image alt="mail" src='/send_mail.svg' width={80} height={80} />
                                      </div>
                                    </div>
                                  </DialogHeader>
                                  <div className="flex space-x-2 mx-2 mt-5 rounded-xl p-7 bg-gray-50 min-h-96">
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
                                </DialogContent>
                              </Dialog>
                              </TableCell>
                          </TableRow>
                          
                        ))}
                        
                      
                      </TableBody>
                    </Table>
                    </section>
                    </section>
  )
}

export default JV