import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import Link from "next/link"

const Client = () => {
    const [userType, setUserType] = useState('');
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
      role: 1,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!token) throw new Error("No token found.");
  
      const payload = {
        ...formData,
        userType,
        document: file ? file.name : ''
      };
  
      const response = await fetch("https://propertyapi-api-gateway.onrender.com/api/v1/user/create", {
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
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Submission failed. Check console for details.");
    }
  };
  return (

    <section className="mt-28 ms-28 me-10 min-h-screen bg-white rounded-2xl px-8 py-12">
                  <div className="flex justify-between mb-14 text-black items-center">
                        <h3 className="text-2xl ">All Clients: <span> 10</span></h3>
                        <div className="flex space-x-6">
                            <div className="flex items-center space-x-2 ">
                               <Image src="/export_client_data.svg" width={160} height={40} />
                               <Dialog className="w-[1200px]">
                                <DialogTrigger asChild>
                                    <Image src="/add_new_client.svg" width={160} height={40} />
                                </DialogTrigger>
                                <DialogContent className="w-full  bg-white">
                                <div className="max-w-7xl mx-auto mt-10 bg-white rounded-xl">
                                <h2 className="text-2xl font-bold mb-6">Add Client</h2>

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
                                              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                            <label className="text-xs w-full">Last Name
                                              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                          </div>
                                          <label className="text-xs">Address
                                            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
                                          </label>
                                          <div className="flex gap-x-5">
                                            <label className="text-xs w-full">Phone Number
                                              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                            <label className="text-xs w-full">Email
                                              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mt-2 border p-3 rounded" />
                                            </label>
                                          </div>
                                        </div>
                                      )}

                                      {userType === 'company' && (
                                        <div className="space-y-4">
                                          <h3 className="text-lg font-semibold">Company Details</h3>
                                          <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="w-full border p-2 rounded" />
                                          <input name="address" value={formData.address} onChange={handleChange} placeholder="Company Address" className="w-full border p-2 rounded" />
                                          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
                                          <div>
                                            <label className="block mb-1 text-xs">Upload Document</label>
                                            <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
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
                        </div>
                    <section id="property_listings" className="space-y-3.5 flex flex-col">
                    <Table className="space-y-6 table table-auto">
                      <TableHeader className=" rounded-tr-2xl justify-evenly rounded-tl-2xl py-12">
                        <TableRow className="font-bold text-lg border-2 border-gray-200">
                          <TableHead className="w-[100px]"></TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>No. Of Allocated Properties</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="border-2 p-12 border-gray-200 border-r-2 ">
                      <TableRow className='w-full'>
                        
                      </TableRow>
                      </TableBody>
                    </Table>
                    <div className='flex justify-center mt-12'>
                         <Image src='/empty_client.svg' width={400} height={400}/>
                    </div>
                     {/* <Dialog className="w-full">
                                                    <DialogTrigger asChild>
                                                    <Image src="/three_dots.svg" alt="" className="mx-auto" width={12} height={12} /> 
                                                    </DialogTrigger>
                                                    <DialogContent className="w-full  bg-gray-200">
                                                      <DialogHeader className='space-y-6'>
                                                        <DialogTitle>JV Partner Profile view</DialogTitle>
                                                        <div className="border-b border-[1px] border-gray-300" />
                                                        <div className="flex justify-between items-center">
                                                          <div className="flex items-center gap-x-3">
                                                              <Image src={jvs.image} alt={jvs.Name} width={90} height={90} className="rounded-full" />
                                                              <div className="flex flex-col">
                                                                <h4 className="font-bold text-xs">{jvs.Name} </h4>
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
                                                              <Image src="/jv_email.svg" alt={jvs.email} width={16} height={16} />
                                                              <Link href="mailto:Kkwabiliah@gmail.com" className="text-cyan-400 text-sm">Kkwabiliah@gmail.com</Link>
                                                            </div>
                                                            <div className="flex gap-x-4">
                                                              <Image alt={jvs.phone} src="/phone.svg" width={16} height={16} />
                                                              <p className="text-sm">{jvs.phone}</p>
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
                                                  </Dialog> */}
                    </section>
                    </section>
  )
}

export default Client