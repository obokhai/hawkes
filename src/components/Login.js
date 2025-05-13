"use client";
import React from 'react'
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import Cookies from 'js-cookie'
const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const router = useRouter();
 
   const handleSubmit = async (event) => {
     event.preventDefault(); // Prevent default form submission
 
     try {
       const response = await axios.post(
         
        "https://propertyapi-monolithic.onrender.com/api/v1/auth/admin/login",
         { 
           email, 
           password
        },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       )
       const saveEmail = localStorage.setItem("userEmail", email);
       const token = response.data.data.accessToken
       const id = response.data.data.id
       localStorage.setItem("id",id)
       if(token){
          Cookies.set('token', token);
          localStorage.setItem("token", token)
       }
      //  const token = localStorage.setItem("authToken", email);
       console.log("Login Successful:", response.data);
       router.push("/dashboard");
     } catch (error) {
       
       console.error("Login failed:", error.response?.data?.message || error.message);
     }
};

return(
    <div className="flex-col space-y-4">
          <h2 className="font-extrabold text-5xl">Hello !</h2>
          <p className="text-2xl mb-14">Welcome Back</p>
          <div className="w-full lg:w-[369px]">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
              <div className="flex relative border-[1px] border-[#eee] rounded-full py-5 ps-5 space-x-6">
                <Image src="/lock.svg" width={25} height={25} alt="Lock Icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none focus:outline-none border-none text-black"
                  placeholder="Password"
                />
                <Image src="/eye.svg" width={25} height={25} alt="Eye Icon" className="absolute placeholder:text-[#eee] right-6" />
              </div>
              <p onClick={() => router.push("?screen=forgot", { scroll: false })} className="float-right text-[#eee]">Forget Password</p>
              <button className="w-full cursor-pointer bg-[#312787] text-center text-white py-5 rounded-full">
                Login
              </button>
            </form>
          </div>
        </div>
)
}
export default Login