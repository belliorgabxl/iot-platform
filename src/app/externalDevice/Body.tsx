'use client'
import React from 'react'

export default function Body() {
  return (
    <div className="w-full bg-gray-700">
      <div className="w-full grid place-items-center ">
        <h1 className="py-2 bg-gray-900 px-10 text-3xl rounded-md text-white my-2">
          Import External Device
        </h1>
      </div>
      <div className="w-full mt-4 flex justify-start px-2 lg:px-5 gap-5">
        <button className="text-white px-8 py-1 rounded-3xl bg-blue-600 hover:opacity-80">Import Device</button>
      </div>
      <div className="grid place-items-center lg:px-5 px-2 w-full py-2">
        <div className="border rounded-md border-white border-dotted py-5 lg:px-5 px-2 w-full "></div>
      </div>
    </div>
  )
}
