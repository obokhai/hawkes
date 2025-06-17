"use client";
import React, { Suspense } from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import axios from "axios";
import Image from 'next/image';
const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false)
   const router = useRouter();
 
   const forgotPassword = async (event) => {
     event.preventDefault(); // Prevent default form submission
     setLoading(true);
     try {
       const response = await axios.post(
        // https://propertyapi-api-gateway.onrender.com/api/v1/auth/validate-otp
         "https://propertyapi-monolithic.onrender.com/api/v1/auth/forgot-password",
         { 
           email, 
        },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       localStorage.setItem("forgotMail", email)
        toast.success(response?.data.message);
        setLoading(false);
       router.push("?screen=otp", { scroll: false })
     } catch (error) {
      setLoading(false)
      //  console.log(email)
      //  console.log(password)
       toast.error( error.response?.data?.message || error.message)
      //  console.error("Login failed:",);
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
                <button type='submit' className={`w-full cursor-pointer ${loading ? 'disabled' : ''} bg-[#312787] text-center text-white py-5 rounded-full`}>
                {loading ?(
                  <ClipLoader
                  color="#fff"
                  loading={loading}
                  // cssOverride={override}
                  size={20}
                  aria-label="Loadingr"
                  data-testid="loader"
                />
                ) : (<p>Submit</p>)
                }
              </button>
            </form>
          </div>
        </div>
)
}
export default ForgotPassword