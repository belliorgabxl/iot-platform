"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Members() {
  const router = useRouter();
  const [data, setUserData] = useState("nothing");
  const [password, setPassword] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const [username, setUsername] = useState<string | null>();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      alert("logout success");
      router.push("/");
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unknown error");
      alert("logout failed");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setUserData(res.data.data._id);
    setPassword(res.data.data.password);
    setEmail(res.data.data.email);
    setUsername(res.data.data.username);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="py-5 grid w-full">
      <div className="px-10 w-full flex justify-end">
        <button
          className="px-10 rounded-md hover:bg-red-700 bg-red-500 text-white py-1"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="w-full flex justify-center">
        <h1 className="text-5xl font-bold">Members</h1>
      </div>
      <div className="grid place-items-center mt-10">
        {data === "nothing" ? (
          <div>Nothing..</div>
        ) : (
          <div>
            user-ID : {data}
            <br />
            Password : {password}
            <br />
            Email : {email}
            <br />
            Username : {username}
          </div>
        )}
      </div>
    </div>
  );
}
