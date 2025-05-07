
"use client"
import React from "react";
import Navbar from "./navbar";
import { SessionProvider } from "next-auth/react";

function layout({children}: {children:React.ReactNode})
{
    return (
        
        <div className="bg-[#0a0f1a] min-h-screen text-white font-sans">
            <SessionProvider>
            <Navbar/>
            {children}
            </SessionProvider>
            
        </div>

    )
}
export default layout;