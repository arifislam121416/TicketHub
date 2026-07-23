import Image from "next/image";
import Link from "next/link";



const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div>
                 {/* <RiTicket2Fill className="text-xl" /> */}
    <Image
        src="/TicketHub1.png"
        alt="TicketHub Logo"
        width={90}
        height={60}
        className="w-50% rounded-full"
      />
            
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-gray-500 via-slate-600 to-pink-500 bg-clip-text text-transparent">
               TicketHub
            </span>
        </Link>
    );
};

export default Logo;