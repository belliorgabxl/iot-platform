import React from 'react'
import FormPage from './Form'

interface PageProps {
  params: Promise<{ deviceId: string }>;
}
export default async function page({ params }: PageProps) {
  const { deviceId } = await params; 
    return (
      <div>
            <FormPage device_id={deviceId} />
          </div>
    )
  }
  