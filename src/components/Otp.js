"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import axios from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
const Otp = () => {
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false)
   const router = useRouter();
   const email = localStorage.getItem("forgotMail")
   console.log("Email from localStorage:", email);
   const verifyOTP = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
        const response = await axios.post(
            "https://propertyapi-api-gateway.onrender.com/api/v1/auth/validate-otp",
            { 
              email,
              otp
             },
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        toast.success(response.data.message)
        setLoading(false)
        console.log("Reset password OTP sent successfully", response.data);
        router.push("?screen=reset", { scroll: false });
    } catch (error) {
        setLoading(false)
        console.log(email);
        toast.error(error.response?.data?.message || error.message)
        console.error("OTP verification Failed:", error.response?.data?.message || error.message);
    }
};

  return (
    <div className="flex-col space-y-4 justify-between relative">
    <div className='absolute -top-44 -left-6'>
      <Image src='/back.svg' width={30} height={30} onClick={() => router.push("?screen=forgot",{scroll: false})} />
    </div>
    <div className='space-y-4'>
        <h2 className="font-extrabold text-3xl " onClick={() =>{router.push("?screen=reset")}}>Check your email</h2>
        <p className="mb-14 w-96">We sent a reset link to {email} Enter 6 digit code that was mentioned in the email</p>
        <div className="w-full  lg:w-[369px]">
          <form className="space-y-6 flex flex-col items-center" onSubmit={verifyOTP}>
   
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={otp}
                onChange={(value) => setOTP(value)} className="w-full">
                <InputOTPGroup className="flex-1 space-x-2">
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-14 h-14 text-xl border border-gray-300 rounded-md"
                  />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            {/* </div> */}
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
      </div>
      )
      }
export default Otp