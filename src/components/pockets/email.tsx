"use client";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EmialPocket() {
  return (
    <Link href="/documents/help" className="fixed group z-20 right-4 bottom-4">
      <div className="overflow-hidden flex items-center justify-center relative  rounded-full h-16 w-16  bg-white/30 backdrop-blur-sm group-hover:opacity-70 group-hover:scale-[105%] text-white">
        <Mail style={{ width: "2.0rem", height: "2.0rem" }} />
      </div>
    </Link>
  );
}
