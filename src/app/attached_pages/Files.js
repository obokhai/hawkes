import { Folder } from "@/components/Folder"
import { ArrowDown, ArrowDownIcon, LucideArrowDown } from "lucide-react"
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
        <div className="flex shadow-xl p-4 space-x-3 rounded-xl">
          <span className="flex"><Image src="/video_folder.svg" alt='' width={20} height={20} /> <LucideArrowDown /> </span>
          <p>All Files</p>
        </div>

        <div className="space-x-12 flex">
          <div className="flex shadow-xl p-3 space-x-3 rounded-2xl">
            <p>Show All</p>
            <LucideArrowDown /> 
          </div>
          <div className="flex gap-x-3">
            <button className="bg-[#5A48F9] px-5 py-3 rounded-4xl text-white text-lg font-semibold ">+ Create New Folder</button>
            <button className="bg-white border-2 border-gray-100 px-5 py-3 rounded-4xl text-lg font-semibold flex "><Image src="/link_icon.svg" alt="" width={20} height={20} className="ms-1" /><span> Upload </span></button>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col gap-y-4"> 
        <div className="flex space-x-7 ">
            <Folder folder_image="/document_folder.svg" title="Documents"  count ="24" />
            <Folder folder_image="/video_folder.svg" title="Videos"  count ="24" />
            <Folder folder_image="/workproject_folder.svg" title="Work Projects"  count ="24" />
          </div>
          <div className="flex space-x-7 ">
            <Folder folder_image="/media_folder.svg" title="Documents"  count ="24" />
            <Folder folder_image="/hawkesbackup_folder.svg" title="Videos"  count ="24" />
            <Folder folder_image="/root.svg" title="Work Projects"  count ="24" />
          </div>
        </div>
        
          <div className="flex mx-auto mt-[-20px]">
           <Image src="/media_storage.svg"  width={450} height={450}/>
          </div>
      </div>
    </section>
    <section className="flex mt-[-20px] ms-20  me-10 mb-12 min-h-[50%] gap-x-2 rounded-2xl px-8 py-12">
        <div className="flex flex-col bg-white w-2/3 p-8 rounded-xl">
          <div className="flex justify-between">
            <h3 className="text-xl">Recent Files</h3>
            <Link href="/" className="text-cyan-400 ">View All</Link>
          </div>
          <Table className="space-y-6">
                      <TableHeader className=" rounded-tr-2xl rounded-tl-2xl py-12">
                        <TableRow className="font-bold text-lg ">
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>No. Of Allocated Properties</TableHead>
                          <TableHead className=""></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className=" border-gray-200  ">
                        {jv.map((jvs) => (
                          <TableRow key={jvs.allocated} className="text-xs px-8 py-3">
                            <TableCell className="font-medium gap-x-5 flex items-center"><Image src={jvs.image} alt="" width={50} height={50} className="rounded-full" />{jvs.Name}</TableCell>
                            <TableCell className="text-[#35A0E4] ">{jvs.email}</TableCell>
                            <TableCell>{jvs.phone}</TableCell>
                            <TableCell className="ps-12">{jvs.allocated}</TableCell>
                            <TableCell className=""> <Image src="/three_dots.svg" alt="" className="mx-auto" width={12} height={12} /> </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
        </div>
        <div className="flex flex-col bg-white w-1/3 p-8 rounded-xl">
          <h4 className="text-3xl">Activity Chart</h4>
          <Image src="/activity_chart.svg"  width={400} height={400}  />
        </div>
      </section>
    </main>
  )
}

export default Files