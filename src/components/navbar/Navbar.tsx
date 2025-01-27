"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import { Session } from "@/resource/model";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, UserRound, X } from "lucide-react";
import SideLink from "./SideLink";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [dropmenu, setDropmenu] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
      toast.info("logout success");
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
          <img
            src="/assets/iconweb_white.png"
            width={50}
            height={45}
            alt="icon"
          />
          <div className="font-extrabold text-5xl lg:block md:block hidden">
            IoT
          </div>
        </Link>

        <div className=" hidden lg:flex md:flex justify-center items-center">
          <NavLink
            href="/documents"
            label="Document"
            isActive={pathname === "/documents"}
          />
          <NavLink
            href="/production"
            label="Product"
            isActive={pathname === "/production"}
          />
          <NavLink
            href="/devices"
            label="Device"
            isActive={pathname === "/devices"}
          />

          <NavLink
            href="/aboutus"
            label="About"
            isActive={pathname === "/aboutus"}
          />
        </div>

        {session === null && pathname !== "/devices" ? (
          <div className="flex justify-end items-center gap-2 ">
            <button
              className="lg:px-10 px-4 rounded-md py-1 hover:text-white hover:bg-opacity-0 border bg-white text-blue-800 duration-300 border-white"
              onClick={() => router.push("/authentication/login")}
            >
              Login
            </button>
            <button
              className="lg:px-10 px-4 rounded-md duration-300 py-1  hover:bg-blue-800"
              onClick={() => router.push("/authentication/signup")}
            >
              Sign-Up
            </button>
          </div>
        ) : session || pathname === "/devices" ? (
          <div className="flex justify-center gap-3 items-center text-white text-sm lg:text-xl">
            <UserRound
              style={{ width: "2.2rem", height: "2.2rem" }}
              className="h-20 w-20 px-1 py-1 text-white bg-blue-500 rounded-full"
              onClick={() => setDropmenu(!dropmenu)}
            />
            <div className="justify-center flex items-center text-white text-sm">
              {session?.username.toUpperCase()}
            </div>
            {dropmenu && (
              <div
                ref={dropdownRef}
                className="duration-300 shadow-md shadow-gray-800 absolute translate-y-20 rounded-md px-1 py-2 bg-white grid"
              >
                <button className="text-center text-sm py-1 rounded-md hover:bg-slate-200 text-gray-600">
                  Profile
                </button>
                <button className="text-center text-sm py-1 rounded-md hover:bg-slate-200 text-gray-600">
                  Edit
                </button>
                <button
                  className="text-sm py-1 px-8 rounded-md text-center hover:bg-slate-200 w-full text-red-400"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
        {toggleMenu ? (
          <div
            className=" lg:hidden h-full flex items-center justify-center   md:hidden"
            onClick={() => setToggleMenu(false)}
          >
            <X
              style={{ width: "1.8rem", height: "1.8rem" }}
              className="text-white"
            />
          </div>
        ) : (
          <div
            className=" lg:hidden h-full flex items-center justify-center  md:hidden"
            onClick={() => setToggleMenu(true)}
          >
            <Menu
              style={{ width: "1.8rem", height: "1.8rem" }}
              className="text-white"
            />
          </div>
        )}
        {toggleMenu && (
          <div className="absolute bg-gradient-to-tr from-gray-800  to to-blue-700 left-0 space-y-4 translate-y-14 min-h-[60vh] py-10 w-full">
            <SideLink
              href="/documents"
              label="Document"
              isActive={pathname === "/documents"}
            />
            <SideLink
              href="/production"
              label="Product"
              isActive={pathname === "/production"}
            />
            <SideLink
              href="/devices"
              label="Device"
              isActive={pathname === "/devices"}
            />

            <SideLink
              href="/aboutus"
              label="About"
              isActive={pathname === "/aboutus"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
