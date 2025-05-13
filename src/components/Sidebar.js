import Image from "next/image"

export default function Sidebar(){
    return(
        <div className="w-20 min-h-screen bg-white flex flex-col py-4 gap-y-14">
        <Image src="/logo.svg" alt="Logo" className="w-12 h-12 mb-6 ms-3" width={12} height={12} />
        <div className="flex flex-col items-center space-y-6 py-6 bg-[#6434F8] rounded-tr-xl rounded-br-xl me-3">
          <button className="text-white opacity-80 hover:opacity-100">
            <Image src="/property.svg" className="w-6 h-6 mb-6" alt="property" width={12} height={12} />
          </button>
          <button className="text-white opacity-80 hover:opacity-100">
          <Image src="/JV.svg" className="w-8 h-6 mb-6" alt="property" width={12} height={12} />
          </button>
          <button className="text-white opacity-80 hover:opacity-100">
          <Image src="/Paper.svg" className="w-6 h-6 mb-6" alt="property" width={12} height={12} />
          </button>
          <button className="text-white opacity-80 hover:opacity-100">
          <Image src="/calendar.svg" className="w-6 h-6 mb-6" alt="property" width={12} height={12} />
          </button>
          <button className="text-white opacity-80 hover:opacity-100">
          <Image src="/message.svg" className="w-6 h-6 mb-6" alt="property" width={12} height={12} />
          </button>
          <button className="text-white opacity-80 hover:opacity-100">
          <Image src="/cog.svg" className="w-6 h-6 mb-6" alt="property" width={12} height={12} />
          </button>
        </div>
      </div>
      
    )
}