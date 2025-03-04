import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { GiArtificialHive } from "react-icons/gi";
import { MdCreate, MdHome, MdLogout, MdSpaceDashboard } from "react-icons/md";
import {
  MdOutlineOndemandVideo,
} from "react-icons/md";
const AppLayout = ({ children }) => {
  const sideLink = [
    {
      name: 'All Videos',
      icon: <MdOutlineOndemandVideo size={32} />,
      href: '/app/allvideos'
    }, {
      name: "Dashboard",
      icon: <MdSpaceDashboard size={32} />,
      href: '/app/dashboard'
    },
    {
      name: "Home",
      icon: <MdHome size={32} />,
      href: '/'
    },
    {
      name: "Create a Video",
      icon: <MdCreate  size={32} />,
      href: '/app/createVideo'
    }
  ];
  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <aside className="w-56 bg-black p-4 flex flex-col h-screen">
        {/* Header */}
        <div className="flex flex-row gap-2">
          <GiArtificialHive size={32} />
          <h1 className="text-purple-500 text-xl font-bold font-mono">VideoGen.com</h1>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-4 space-y-2 flex-grow">
          {sideLink.map((text, index) => (
            <div
              key={index}
              className="flex flex-row justify-start items-center hover:bg-[#160032] hover:rounded-2xl p-3"
            >
              {text.icon}
              <li key={text.name} className="py-2 px-4 rounded cursor-pointer">
                <Link href={text.href}>{text.name}</Link>
              </li>
            </div>
          ))}
        </ul>

        {/* Logout Button (Always at Bottom) */}
        <Button startIcon={<MdLogout />} className="mt-auto" variant="text" color="secondary" onClick={() => signOut()}>
          Log out
        </Button>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
