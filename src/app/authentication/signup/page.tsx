"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignUp = async () => {
    if (user.email && user.password && user.username) {
      try {
        await axios.post(`/api/users/signup`, user);
        toast.success("Sign-Up success.");
        router.push("/login");
      } catch (error) {
        console.log(error instanceof Error ? error.message : "Unknown error");
        toast.error("sign-up failed");
      }
    }
    if (!user.username){
      toast.error("please provide username")
    }
    if (!user.password){
      toast.error("please provide password")
    }
    if (!user.email){
      toast.error("please provide email")
    }
  };

  return (
    <div className="w-full grid place-items-center  lg:bg-gradient-to-r lg:from-sky-100 lg:via-white lg:to-sky-100 py-5">
      <div className="relative w-full max-w-3xl flex justify-center items-center">
      <div className="hidden lg:block md:block absolute mix-blend-multiply filter blur-lg top-0 left-10 w-72 h-72  bg-sky-300 opacity-70 rounded-full animate-blob"></div>
        <div className="hidden lg:block md:block absolute mix-blend-multiply filter blur-lg top-0 right-10 w-72 h-72  bg-yellow-300 opacity-60 rounded-full  animate-blob animation-delay-2000"></div>
        <div className="hidden lg:block md:block absolute mix-blend-multiply filter blur-lg bottom-0 left-30 w-72 h-72 bg-pink-300 opacity-60 rounded-full  animate-blob animation-delay-4000"></div>

        <div className="lg:hidden md:hidden absolute mix-blend-multiply filter blur-lg top-0 left-10 w-60 h-60 bg-sky-300 opacity-70 rounded-full animate-blob"></div>
        <div className="lg:hidden md:hidden absolute mix-blend-multiply filter blur-lg top-0 right-10 w-60 h-60  bg-yellow-300 opacity-60 rounded-full  animate-blob animation-delay-2000"></div>
        <div className="lg:hidden md:hidden absolute mix-blend-multiply filter blur-lg bottom-0 left-30 w-60 h-60 bg-pink-300 opacity-60 rounded-full  animate-blob animation-delay-4000"></div>
        <div className="w-fit grid z-10 place-items-start bg-white  rounded-md my-10 shadow-sm gap-5 px-10 py-5">
          <div className="text-3xl text-black mb-2 text-center w-full">
            Sign-Up
          </div>
          <div className="flex gap-4">
            <label className="w-[80px]" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
              className="border w-[120px] lg:w-auto px-4 py-1 border-gray-200 rounded-md bg-white text-gray-600 focus:outline-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <label className="w-[80px]" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
              className="border w-[120px] lg:w-auto px-4 py-1 border-gray-200 rounded-md bg-white text-gray-600 focus:outline-blue-500"
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
              placeholder="password"
              className="border w-[120px] lg:w-auto px-4 py-1 border-gray-200 rounded-md bg-white text-gray-600 focus:outline-blue-500"
            />
          </div>
          <div className="flex gap-2 lg:gap-10 my-4">
            <button
              className="lg:px-10 md:px-10 px-4 py-1 bg-blue-500 hover:bg-blue-300 text-white rounded-md"
              onClick={onSignUp}
            >
              Sign-Up
            </button>
            <button
              className="lg:px-10 md:px-10 px-4 py-1 hover:bg-gray-300 hover:text-white  text-blue-500 rounded-md"
              onClick={() => {
                router.push("/authentication/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
