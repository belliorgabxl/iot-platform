'use client'
import DocumentSideBar from "@/components/sidebar/documentSideBar";
import React from "react";

export default function page() {
  return (
    <div className="py-10 ">
      <div className="grid place-items-center">
        <h1 className="px-10 py-2 w-fit rounded-md bg-blue-500 text-white text-2xl">
          Test-Page
        </h1>
      </div>
    
     <DocumentSideBar/>
      <div className=" mb-40 pb-40">
        padding zone 
      </div>
    </div>
  );
}
