"use client";
import React from 'react'
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import Cookies from 'js-cookie'
import api from '@/app/api';
import { ClipLoader } from 'react-spinners';
const Login = () => {
   const [email, setEmail] = useState("");
   const [showPassword, setShowPassword] = useState(false)
   const [password, setPassword] = useState("");
   const router = useRouter();
   const [loading, setLoading] = useState(false)
 
     useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      router.push("/dashboard")
    }
  }, [])
   const toggleShowPassword = () =>{
    setShowPassword(!showPassword)
   }
   const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  try {
    const response = await api.post(
      "/auth/admin/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(response.data); // Check the structure
    const token = response.data.data?.accessToken;
    const id = response.data.data?.id;
    const userName = response.data.data?.firstName || 'Admin';
    // const lastName = response.data?.data
  
    if (token) {
      Cookies.set("token", token);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", userName);
      // localStorage.setItem("lastName", lastName)
      toast.success("Login Successful");
      setLoading(false);
      router.push("/dashboard");
      return;
    } else {
      throw new Error("No token returned from API");
    }
  } catch (error) {
    setLoading(false);
    toast.error(error.response?.data?.message || "Login failed");
    console.error("Login failed:", error.response?.data?.message || error.message);
  }
};
   
//    const handleSubmit = async (event) => {
//      event.preventDefault(); // Prevent default form submission
//       setLoading(true)
//      try {
//        const response = await axios.post(
         
//         "https://propertyapi-monolithic.onrender.com/api/v1/auth/admin/login",
//          { 
//            email, 
//            password
//         },
//          {
//            headers: {
//              "Content-Type": "application/json",
//            },
//          }
//        )
//        const saveEmail = localStorage.setItem("userEmail", email);
//        const token = response.data.data.accessToken
//        const id = response.data.data.id
//        localStorage.setItem("id",id)
//        if(token){
//           Cookies.set('token', token);
//           localStorage.setItem("token", token)
//        }

//        setLoading(false)
//       //  const token = localStorage.setItem("authToken", email);
//       toast.success("Login Successful")
//        router.push("/dashboard");
//      } catch (error) {
       
//       toast.error(error.response?.data.message)
//        console.error("Login failed:", error.response?.data?.message || error.message);
//      }
// };

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
                  type={showPassword? 'text':'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none focus:outline-none border-none text-black"
                  placeholder="Password"
                />
                <Image src="/eye.svg" width={25} height={25} alt="Eye Icon" onClick={toggleShowPassword} className="absolute placeholder:text-[#eee] cursor-pointer right-6" />
              </div>
              <p onClick={() => router.push("?screen=forgot", { scroll: false })} className="float-right cursor-pointer text-[#333] text-xs">Forgot Password</p>
              <button type='submit' className={`w-full cursor-pointer ${loading ? 'disabled cursor-not-allowed' : ' cursor-pointer'} bg-[#312787] text-center text-white py-5 rounded-full`}>
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
export default Login