"use client";
import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const router = useRouter();
 
   const forgotPassword = async (event) => {
     event.preventDefault(); // Prevent default form submission
 
     try {
       const response = await axios.post(
        // https://propertyapi-api-gateway.onrender.com/api/v1/auth/validate-otp
         " https://propertyapi-monolithic.onrender.com/api/v1/auth/forgot-password",
         { 
           email, 
        },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
 
       console.log("Reset password OTP sent successfully", response.data);
       router.push("?screen=otp", { scroll: false })
     } catch (error) {
       console.log(email)
       console.log(password)
       console.error("Login failed:", error.response?.data?.message || error.message);
     }
   };

return(
    <div className="flex-col space-y-4 justify-between relative">
      <div className='absolute -top-44 -left-6'>
        <Image src='/back.svg' width={30} height={30} onClick={() => router.push("?screen=login", { scroll: false })} />
      </div>
      <div className='space-y-4'>
          <h2 className="font-extrabold text-3xl">Forgot password ? </h2>
          <p className="text-xl mb-14">Please enter your email to reset the password</p>
      </div>
          <div className="w-full lg:w-[369px]">
            <form className="space-y-6" onSubmit={forgotPassword}>
              <div className="flex border-[1px] border-[#eee] rounded-full py-5 px-5 space-x-6">
                <Image src="/email.svg" width={25} height={25} alt="Email Icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none focus:outline-none border-none text-black"
                  placeholder="Email"
                />
              </div>
              
              <Link href="/" className="float-right text-[#eee]">Forget Password</Link>
              <button className="w-full cursor-pointer bg-[#312787] text-center text-white py-5 rounded-full"type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>
)
}
export default ForgotPassword