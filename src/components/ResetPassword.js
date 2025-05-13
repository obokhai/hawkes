"use client";
import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
const ResetPassword = () => {
   
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const email =''
   const router = useRouter();
 
   const handleSubmit = async (event) => {
     event.preventDefault(); // Prevent default form submission
 
     try {
       const response = await axios.post(
         
        " https://propertyapi-api-gateway.onrender.com/api/v1/auth/update-password",
         { 
          email:localStorage.getItem("userEmail"),
           password,
           confirmPassword
        },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
 
       console.log("Login Successful:", response.data);
       router.push("/dashboard");
     } catch (error) {
       console.log(email)
       console.log(password)
       console.error("Login failed:", error.response?.data?.message || error.message);
     }
   };

return(
    <div className="flex-col space-y-4">
          <h2 className="font-extrabold text-3xl">Set a new password !</h2>
          <p className="text-gray-500 mb-14">Create a new password. Ensure it differs from the previous ones</p>
          <div className="w-full lg:w-[369px]">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div className=''>
            <label className='text-lg font-semibold'>Password</label>
            <div className="flex relative border-[1px] border-[#eee] rounded-full py-5 ps-5 space-x-6">
                <Image src="/lock.svg" width={25} height={25} alt="Lock Icon" />
                <input
                  type={showPassword == false ?"password":"text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none focus:outline-none border-none text-black"
                  placeholder="Password"
                />
                <Image src="/eye.svg" width={25} height={25} alt="Eye Icon" onClick={() =>setShowPassword(!showPassword)}  className="absolute placeholder:text-[#eee] right-6" />
              </div>
            </div>
            <div className=''>
            <label className='text-lg font-semibold'>Confirm Password</label>
              <div className="flex relative border-[1px] border-[#eee] rounded-full py-5 ps-5 space-x-6">
                <Image src="/lock.svg" width={25} height={25} alt="Lock Icon" />
                <input
                  type={showConfirmPassword == false ?"password":"text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="outline-none focus:outline-none border-none text-black"
                  placeholder="Password"
                />
                <Image src="/eye.svg" width={25} height={25} alt="Eye Icon" onClick={() =>setShowConfirmPassword(!showConfirmPassword)}  className="absolute placeholder:text-[#eee] right-6" />
              </div>
              </div>
              <p onClick={() => router.push("?screen=reset", { scroll: false })} className="float-right text-[#eee]">Forget Password</p>
              <button className="w-full cursor-pointer bg-[#312787] text-center text-white py-5 rounded-full">
                Login
              </button>
            </form>
          </div>
        </div>
)
}
export default ResetPassword