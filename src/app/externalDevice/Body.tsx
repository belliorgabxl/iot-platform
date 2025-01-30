'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { DeviceModel } from '@/resource/model'



const getExternalDevice = async()=>{

}

export default function Body() {
  const [devices ,  setDevices]  = useState<DeviceModel[] | null>()

  const [openImport  ,setOpenImport] = useState<boolean>(false);
  const [broker , setBroker] = useState<string | null > ()

  useEffect(()=>{
    
  },[])



  return (
    <div className="w-full bg-gray-700">
      <div className="w-full grid place-items-center ">
        <h1 className="py-2 bg-gray-900 px-10 text-3xl rounded-md text-white my-2">
          Import External Device
        </h1>
      </div>
      <div className="w-full mt-4 flex justify-start px-2 lg:px-5 gap-5">
        <button className="text-white px-8 py-1 rounded-3xl bg-blue-600 hover:opacity-80" 
        onClick={()=>setOpenImport(!openImport)}>Import Device</button>
      </div>

    {openImport && (
      <div className=' py-5 mx-2 grid gap-4  bg-gray-900 w-fit my-4 px-4'>
        <div className='grid gap-4'>
          <h1 className='text-white px-5 bg-gray-500 w-fit  rounded-md'>Set Up your Broker</h1>
          <div className='flex gap-4 '>
            <div className='flex gap-2 items-center'>
              <label className='text-lg text-white '>HIVE MQ</label>
              <input type='radio'  name='broker'  onChange={(e)=>setBroker(e.target.value)} value="hivemq" className='w-4 h-4 shadow-none' />
            </div>
            <div className='flex gap-2 items-center'>
              <label className='text-lg text-white '>Ada-fruite</label>
              <input type='radio' name='broker' onChange={(e)=>setBroker(e.target.value)} value='adafruite'  className='w-4 h-4 shadow-none' />
            </div>
            
          </div>
          <div className='px-2 text-white'>

          </div>
        </div>
        <input type='text' className='py-1 px-3 bg-white rounded-md'/>
      </div>
    )}

      <div className="grid place-items-center lg:px-5 px-2 w-full py-2">
        <div className="border rounded-md border-white border-dotted py-5 lg:px-5 px-2 w-full "></div>
      </div>
    </div>
  )
}
