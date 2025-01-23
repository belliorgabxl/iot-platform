"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const getUserSession = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setSession(res.data.data || null);
    } catch (error) {
      setSession(null);
    }
  };

  const onLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", user, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Login successful!");

        await getUserSession();

        setTimeout(() => {
          router.push("/devices");
        }, 500);
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      toast.error("Login failed");
    }
  };

  return (
    <div className="w-full grid place-items-center bg-white lg:bg-gradient-to-r lg:from-sky-100 lg:via-white lg:to-sky-100 py-5">
      <div className="relative my-10  w-full max-w-3xl flex justify-center items-center">
        <div className="hidden lg:block md:block absolute mix-blend-multiply filter blur-lg top-0 left-10 w-72 h-72  bg-sky-300 opacity-70 rounded-full animate-blob"></div>
        <div className="hidden lg:block md:block absolute mix-blend-multiply filter blur-lg top-0 right-10 w-72 h-72  bg-yellow-300 opacity-60 rounded-full  animate-blob animation-delay-2000"></div>
        <div className="hidden lg:block md:block absolute mix-blend-multiply filter blur-lg bottom-0 left-30 w-72 h-72 bg-pink-300 opacity-60 rounded-full  animate-blob animation-delay-4000"></div>

        <div className="lg:hidden md:hidden absolute mix-blend-multiply filter blur-lg top-0 left-10 w-60 h-60 bg-sky-300 opacity-70 rounded-full animate-blob"></div>
        <div className="lg:hidden md:hidden absolute mix-blend-multiply filter blur-lg top-0 right-10 w-60 h-60  bg-yellow-300 opacity-60 rounded-full  animate-blob animation-delay-2000"></div>
        <div className="lg:hidden md:hidden absolute mix-blend-multiply filter blur-lg bottom-0 left-30 w-60 h-60 bg-pink-300 opacity-60 rounded-full  animate-blob animation-delay-4000"></div>

        <div className="w-fit grid z-10  bg-white  rounded-xl my-10 shadow-sm gap-5 ">
          <div className="text-3xl py-1 rounded-t-xl bg-gradient-to-l from-blue-600 to-gray-900 font-medium text-white mb-2 text-center w-full">
            Login
          </div>
          <div className="grid  place-items-center px-10 lg:px-20 gap-5 pb-5">
            <div className="flex gap-4">
              <label className="w-[80px]" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                className="border lg:w-auto w-[100px] px-4 py-1 border-gray-200 rounded-md bg-white text-gray-600 focus:outline-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <label className="w-[80px]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                className="border px-4 py-1 lg:w-auto w-[100px] border-gray-200 rounded-md bg-white text-gray-600 focus:outline-blue-500"
              />
            </div>
            <div className="flex gap-2 lg:gap-10 my-4">
              <button
                className="px-4 lg:px-10 md:px-10 py-1 bg-blue-300 enabled:bg-blue-500 enabled:hover:bg-blue-400 text-white rounded-md"
                onClick={onLogin}
                disabled={!user.email || !user.password}
              >
                Login
              </button>
              <button
                className="px-4 lg:px-10 md:px-10 py-1  hover:bg-blue-400 hover:text-white  text-blue-500 rounded-md"
                onClick={() => {
                  router.push("/authentication/signup");
                }}
              >
                Sign-Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
