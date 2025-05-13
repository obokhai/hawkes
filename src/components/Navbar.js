import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';


export default function Navbar({setActive}){
    const router = useRouter()

    const logout = () => {
        console.log('Logout Triggered')
        Cookies.remove('token');
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');

        router.push('/');
      };
    return(
          <div className="w-full h-20 bg-white text-gray-500 flex items-center justify-between ps-12 pe-36 shadow-md pb-2">
            <span className="" onClick={logout}> property </span>
            <div className="flex justify-between bg-gray-200 px-3 rounded-lg">
                <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none placeholder:text-gray-600 placeholder:text-sm "
                />
                <Image src="/search.svg" alt="" width={20} height={20} />  

            </div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-500">
                <Image src="/grid_dot.svg" alt="" width={40} height={40} />
                </button>
                <button className="text-gray-500">
                <Image src="/notification.svg" alt="" width={40} height={40} />
                </button>
                <div className="flex items-center space-x-4">
                    <Image src="/user_avatar.svg" onClick={logout} alt=""  width={40} height={40} />
                    <Image src="/caret_down.svg" alt="" width={20} height={20} />
                </div>
            </div>
            </div>
    )
}   