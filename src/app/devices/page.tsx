"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Session } from "@/resource/model";
import Body from "./Body";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
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
          <div className="my-10 border-2 lg:w-3/5 border-dotted rounded-md border-white grid place-items-center py-20">
            <div className="text-xl lg:text-5xl font-bold text-gray-300 animate-pulse">
              Loading...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
