'use client'
// import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'; // Make sure useRouter is imported
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
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
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';
// import { ClipLoader } from 'react-spinners';
import {BeatLoader, GridLoader} from "react-spinners"
import Paginate from '@/components/Paginate'
import api from '@/app/api'
const PropertyListing = () => {     
  
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState("");
  const token = localStorage.getItem("token");
  const [total, setTotal] = useState('')
  const [activeAssetCount, setActiveAssetCount] = useState('')
  const [inActiveAssetCount, setInActiveAssetCount] = useState('')
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [loading,  setLoading] = useState(false)
   const [page, setPage] = useState(1);
   const PAGE_SIZE = 5

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};
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
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  
 const getAllUsers = async () => {
  try {
    const response = await api.get("/user/role?roleId=1"
);

    const data = await response.json();
    console.log("Users API response:", data);

    const fetchedUsers = data?.data.users; // Adjust this based on actual API structure
    setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    setUsers([]);
  }
};
  
  const getRoles = async () => {
    try {
      const response = await api.get(
        "/roles",
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.data
      setRoleData(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (!token) throw new Error("No token found.");
      const response = await api.post("/assets/create",assetData);
      // toast.success(response.data.message)
     console.log(response.data)
      setIsOpen(false); // Close modal
     
    } catch (error) {
      toast.error("Error Submitting Asset")
      console.error("Submission Error:", error);
      alert("Submission failed. Check console for details.");
    }
  };

   useEffect(() => {
     setLoading(true)
    setMounted(true);
async function fetchPosts() {  
      try {
        const token = localStorage.getItem("token")
        const res = await api.get(`/assets?page=${page}&limit=${PAGE_SIZE}`);
       
        const data = await res.data
        // setProperties(data.data)
       
        console.log(total)
        console.log(data?.data);
        if (data?.data) {
          setProperties(data.data.activeAsset);
           setTotal(data.data.total)
           setActiveAssetCount(data.data.activeAssetsCount)
           setInActiveAssetCount(data.data.inactiveAssetsCount)
           setLoading(false)
        } else {
          console.error("No activeAsset found in the response");
          setProperties([]); // Or handle the empty case accordingly
        }
        // setProperties(data.data.activeAsset);
      } catch (err) {
        console.error(err);
      }
    } 
    fetchPosts();
    
  }, [page]); 
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (!mounted) return null;
  return (

    <section className="mt-18 ms-28 me-10 min-h-screen flex flex-col gap-y-4 px-4 py-12" >
          {/* <section className="flex flex-col px-8 min-h-screen rounded-lg mx-8 items-center"> */}
          <aside className='bg-white min-h-40 flex gap-x-7 w-full p-4 ps-8 shadow-xl rounded-2xl'>
              <span className='border-t-[10px] shadow-xl p-4 flex flex-col justify-between border-[#312787] rounded-xl rounded-tr-3xl rounded-tl-3xl h-40 w-60  '>
                <p className='text-lg'>Total <span className='block font-bold'>Assets</span></p>
                <span className='flex justify-between'>
                <p>
                <Image src="/chevron_admin.svg" width={10} height={10} />
                  1.2%
                </p>
                <p className='text-6xl font-bold -mt-7'>{total || ( <Skeleton className='w-full  bg-[#333]' />)} </p>
              </span>
              </span>
              <span className=' shadow-xl p-4 flex flex-col justify-between rounded-xl bg-[#5A48F9] text-white h-40 w-60  '>
                <p className='text-lg'>Active <span className='block font-bold'>Assets</span></p>
                <span className='flex justify-between'>
                <p>
                <Image src="/chevron_admin.svg" width={10} height={10} />
                  1.2%
                </p>
                <p className='text-6xl font-bold -mt-7'>{!activeAssetCount ? ( <Skeleton className='w-full  bg-[#333] h-12' />) :activeAssetCount} </p>
              </span>
              </span>
              <span className=' shadow-xl p-4 flex flex-col justify-between rounded-xl bg-[#312787] text-white h-40 w-60  '>
                <p className='text-lg'>Closed <span className='block font-bold'>Assets</span></p>
                <span className='flex justify-between'>
                <p>
                <Image src="/chevron_admin.svg" width={10} height={10} />
                  1.2%
                </p>
                  <p className='text-6xl font-bold -mt-7'>{!inActiveAssetCount ? (<Skeleton className='w-full bg-[#333]' /> ) : ( inActiveAssetCount < 1 ? 0 : inActiveAssetCount )}</p>  
               </span>
              </span>
          </aside>
          <aside className='bg-white shadow-xl rounded-2xl min-h-80 p-12 pb-20'>
            <div className='flex justify-between items-center'>
              <div>
                <p><span className='font-bold text-xl'>Active Assets | </span> You have {total} assets listed </p>
              </div>
              <div className='flex justify-around gap-4'>
              <Image src="/add_asset.svg" className='cursor-pointer' onClick={() => setIsOpen(true)} width={120} height={100} />
                
                <Image src="/export_data.svg" className='cursor-pointer' width={150} height={100} />
                <span className='flex justify-center cursor-pointer p-[2px] rounded-sm px-2 border-gray-200 border-[1px]'>
                  <Image src="/filter.svg" width={30} height={10} />
                </span>
                <Image src="/sort.svg" className='cursor-pointer' width={40} height={10} />
              </div>
            </div>
            {isOpen && (
        <div className="fixed inset-0 flex  items-center justify-center min-h-96 bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-[450px] relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-3 text-white h-6 w-6 rounded-full bg-blue-950 hover:text-black hover:bg-none"
            >
              ✕
            </button>
              <div className="max-h-[70vh] overflow-y-auto space-y-4">
              {currentStep === 1 && (
                    <>
                      <h2 className="text-xl font-semibold mb-4">Add Asset</h2>
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
                        <button onClick={handleSubmit} className="bg-[#2C1C92] cursor-pointer text-white px-6 py-2 rounded-full">Submit</button>
                      </div>
                    </>
                  )}
                  

                </div>
              </div>
          
          </div>
          
        
      )}
          {loading ? (
            <div className="flex flex-col justify-center gap-y-4 items-center my-auto">

        
              <div className='w-full h-32 px-4 shadow-md gap-x-6 items-center flex'>
                <Skeleton className="rounded-full w-44 h-10 bg-[#eee]" />
                <div className='flex flex-col w-full gap-y-3'>
                  <Skeleton className='w-full bg-[#eee] h-5' />
                  <Skeleton className='w-full bg-[#eee] h-5' />
                </div>
              </div>
               <div className='w-full h-32 px-4 shadow-md gap-x-6 items-center flex'>
                <Skeleton className="rounded-full w-44 h-10 bg-[#eee]" />
                <div className='flex flex-col w-full gap-y-3'>
                  <Skeleton className='w-full bg-[#eee] h-5' />
                  <Skeleton className='w-full bg-[#eee] h-5' />
                </div>
              </div>
               <div className='w-full h-32 px-4 shadow-md gap-x-6 items-center flex'>
                <Skeleton className="rounded-full w-44 h-10 bg-[#eee]" />
                <div className='flex flex-col w-full gap-y-3'>
                  <Skeleton className='w-full bg-[#eee] h-5' />
                  <Skeleton className='w-full bg-[#eee] h-5' />
                </div>
              </div>
            </div>
          ) : Array.isArray(properties) && properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-sm text-gray-500">
              <Image src="/empty_assets.svg" width={200} height={200} />
              <h5 className='font-bold'>No Active Assets</h5>
              <p className=''>Get started by adding an asset.</p>
            </div>
          ) : (
              properties.map(property => (
            <div  className="flex justify-between items-center py-4 w-full px-6 my-3 bg-gray-200 rounded"
              key={property.id}
            >
              <div className="flex items-center gap-x-6 space-x-4 cursor-pointer" onClick={() => router.push(`?property=${property.id}`)}>
                <div className="bg-white border-[1px] border-gray-500 py-3 h-12 px-6 w-44 text-[#6434F8] text-center text-xl rounded-full flex items-center justify-center">
                  <h4 className="font-bold truncate text-ellipsis">{property.id}</h4>
                </div>
                <div className="w-full space-y-2 cursor-pointer">
                  <div className="flex flex-col justify-center text-gray-800">
                    <h4 className="flex gap-x-5 text-lg font-bold">
                      {property.propertyName} <span>{property.progress || 30}%</span>
                    </h4>
                  </div>
                  <div className="flex w-full gap-x-2">
                    <Image src="/location.svg" alt="" width={14} height={14} />
                    <p className="text-sm truncate text-gray-500">{property.address}</p>
                  </div>
                </div>
              </div>
              <div id="second_part" className="flex space-x-5 items-center">
                <div className="rounded-full border-[1px] items-center border-gray-500 text-gray-600 text-xs py-2 flex px-6 gap-x-2">
                  <Image src="/resolution.svg" alt="resolution" width={20} height={20} />
                  <p>{property.size}</p>  
                </div>
                <div className="rounded-full border-[1px] items-center border-gray-500 text-gray-600 text-xs flex px-6 py-2 gap-x-2">
                  <Image src="/avatar.svg" alt="avatar" width={20} height={20} />
                  <p>{property.assignedTo || "N/A"}</p>
                </div>
                <div className="rounded-full border-[1px] items-center border-gray-500 text-gray-600 text-xs flex px-6 py-2 gap-x-2">
                  <Image src="/time.svg" alt="time" width={20} height={20} />
                  <p>{property.date || "N/A"}</p>
                </div>
                <div className="flex">
                  <Image src="/pencil.svg" alt="" width={36} height={36} />
                  <Image src="/delete.svg" alt="" width={36} height={36} />
                </div>
              </div>
            </div>
              )
      ))} 
      <div className='flex w-full justify-end'>
        <Paginate
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </div>

          </aside>
      
    </section> 
    // </section>


    
    // </section>

   
     
  );
};

export default PropertyListing;
