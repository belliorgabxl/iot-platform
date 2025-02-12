"use client";
import React, { useEffect, useState } from "react";
import { Session } from "@/resource/model";
import Body from "./Body";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function page() {
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
      <Body session={session} />
    </div>
  );
}
