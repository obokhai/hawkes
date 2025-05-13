"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Login from "@/components/Login";
import ForgotPassword from "@/components/ForgotPassword";
import { useSearchParams } from "next/navigation";
import Otp from "@/components/Otp";
import ResetPassword from "@/components/ResetPassword";

export default function Home() {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen") || "login"; // Default to login screen

  return (
   
  
    <main className="lg:flex lg:min-h-screen justify-between">
      <div className="z-10 max-lg:hidden relative max-w-4xl w-full min-h-screen items-center justify-between font-mono text-sm lg:flex bg-linear-to-b from-[#6434F8] via-[#312787] to-[#312787]">
        <Image src="/aside.svg" alt="" width={300} height={150} className="absolute bottom-0" />
        <div className="flex relative justify-center mx-auto items-center shadow-lg space-y-2 bg-white/5 backdrop-blur-md min-h-40 max-w-80 p-12 rounded-3xl">
          <Image src="/bolt.svg" alt="" width={50} height={50} className="absolute -left-6 bottom-12" />
          <p className="text-3xl font-semibold leading-14 text-center text-white">
            Manage and track your properties with ease. Login now!!
          </p>
        </div>
      </div>
      <div className="bg-white min-h-screen flex-1 flex text-black items-center ps-24">
      {
              (()=> {
                switch (screen) {
                case 'forgot':
                  return <ForgotPassword/>
                case 'otp':
                  return <Otp/>
                case 'reset':
                  return <ResetPassword/>
                case 'login':
                  return <Login/>
                default:
                  return null
              }
            })()
            }
      </div>
    </main>
  );
}
