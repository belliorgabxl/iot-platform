"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import { Session } from "@/resource/model";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [dropmenu, setDropmenu] = useState<boolean>(false);

  const getUserSession = useCallback(async () => {
    try {
      const res = await axios.get<{ data: Session }>("/api/users/me");
      if (res.status === 200 && res.data.data) {
        setSession(res.data.data);
      } else {
        setSession(null);
        console.warn("No session found.");
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
    }
  }, []); 
  useEffect(() => {
    getUserSession();
  }, [getUserSession]); 

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      setSession(null);
      toast.info("logout success")
      router.push("/");
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div className="w-full top-0 left-0 z-40 fixed bg-gradient-to-l from-blue-600 to-gray-900 shadow-sm shadow-gray-900 px-5">
      <div className="grid lg:grid-cols-[20%_50%_30%] grid-cols-[20%_70%_10%] text-white">
        
        {/* Left Side: Logo */}
        <Link href={"/"} className="flex gap-3 items-center lg:pl-10 py-1">
          <img src="/assets/iconweb_white.png" width={50} height={45} alt="icon" />
          <div className="font-extrabold text-5xl lg:block md:block hidden">IoT</div>
        </Link>
  
        {/* Middle: Navigation */}
        <div className="flex justify-center items-center">
          <NavLink href="/documents" label="Document" isActive={pathname === "/documents"} />
          <NavLink href="/production" label="Products" isActive={pathname === "/production"} />
          <NavLink href="/devices" label="Device" isActive={pathname === "/devices"} />
          {/* <NavLink href="/dashboard" label="Dashboard" isActive={pathname === "/dashboard"} /> */}
          <NavLink href="/aboutus" label="About Us" isActive={pathname === "/aboutus"} />
        </div>
  
        {/* Right Side: Authentication or Profile */}
        {session === null && pathname !== "/devices" ? (
          <div className="lg:flex justify-end items-center gap-2 md:block hidden">
            <button className="px-10 rounded-md py-1 hover:text-white hover:bg-opacity-0 border bg-white text-blue-800 duration-300 border-white"
              onClick={() => router.push("/authentication/login")}>
              Login
            </button>
            <button className="px-10 rounded-md duration-300 py-1  hover:bg-blue-800"
              onClick={() => router.push("/authentication/signup")}>
              Sign-Up
            </button>
          </div>
        ) : session || pathname === "/devices" ?  (
          <div className="flex justify-center items-center text-white text-xl">
            <img src="assets/user_gabel.jpg" className="object-cover h-12 w-12 rounded-full" 
              onClick={() => setDropmenu(!dropmenu)} />
            
            {dropmenu && (
              <div className="duration-300 shadow-md shadow-gray-800 absolute translate-y-20 rounded-md px-1 py-2 bg-white grid">
                <button className="text-center text-sm py-1 rounded-md hover:bg-slate-200 text-gray-600">Profile</button>
                <button className="text-center text-sm py-1 rounded-md hover:bg-slate-200 text-gray-600">Edit</button>
                <button className="text-sm py-1 px-8 rounded-md text-center hover:bg-slate-200 w-full text-red-400"
                  onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-white">Loading...</p> 
        )}
      </div>
    </div>
  );
}
