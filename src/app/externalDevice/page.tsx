"use client";
import React, { useEffect, useState } from "react";
import { Session } from "@/resource/model";
import Body from "./Body";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const getUserSession = async () => {
    try {
      const res = await axios.get<{ data: Session }>("/api/users/me");
      if (res.data.data) {
        setSession(res.data.data);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
    }
  };
  useEffect(() => {
    getUserSession();
  }, []);
  return (
    <div>
      {session ? (
        <Body session={session} />
      ) : (
        <div className="bg-gray-700 py-20 px-5 lg:px-20 grid place-items-center">
          <div className="my-10 border-2 lg:w-full border-dotted rounded-md border-white grid px-10 place-items-center py-20">
            <div className="text-xl lg:text-5xl font-bold text-gray-300 animate-pulse">
              Loading...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import React from 'react'

// export default function page() {
//   return (
//     <div>page</div>
//   )
// }
