import { Folder } from "@/components/Folder"
import { ArrowDown, ArrowDownIcon, LucideArrowDown } from "lucide-react"
import api from '@/app/api'
import Image from "next/image"
import Link from "next/link"
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
const jv = [
  {
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "1",
  },
  {
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "3",
  },
  {
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "1",
  },
  {
    image:"/avatar.svg",
    Name: "Ahmed Kwabili",
    email: "Kkwabiliah@gmail.com",
    phone: "09023456578",
    allocated: "4",
  },
]
const Files = () => {
  return (
    <main>
    <section className="mt-28 ms-28 me-10 min-h-[50%] bg-white rounded-2xl px-8 py-12">
      <div className="flex justify-between mb-12">
        <div className="flex p-4 space-x-3 items-center rounded-xl">
          <span className="flex shadow-xl p-2 rounded-lg"><Image src="/video_folder.svg" alt='' width={20} height={20} /> <LucideArrowDown /> </span>
          <p>All Files</p>
        </div>

        <div className="space-x-12 flex">
          <div className="flex gap-x-3 items-center">
            <button className="bg-[#5A48F9] px-3 py-2 rounded-full text-white text-xs font-semibold ">+ Create New Folder</button>
            <button className="bg-white border-2 border-gray-100 px-3 py-2 rounded-4xl text-xs font-semibold flex gap-x-1"><Image src="/link_icon.svg" alt="" width={12} height={12} className="ms-1" /><span> Upload </span></button>
          </div>
        </div>
      </div>

      <div className="flex gap-x-12 me-4 items-center">
        <Image src='/contract.png' width={250} height={272} />
        <Image src='/brief.png' width={250} height={272} />
        <Image src='/brief.png' width={250} height={272} />
        <Image src='/brief.png' width={250} height={272} />
      </div>
    </section>
    
    <section className="flex items-center justify-center mt-12 gap-x-6 mb-5">
        <Image src='/invoice.png' width={180} height={40} />
        <Image src='/technical.png' width={200} height={40} />
        <Image src='/case.png' width={180} height={40} />
        <Image src='/other.png' width={180} height={40} />
    </section>
    </main>
  )
}

export default Files