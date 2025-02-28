import React from 'react';
import Main from './main';


interface PageProps {
  params: Promise<{ deviceId: string }>;
}

export default async function page({ params }: PageProps) {
  const { deviceId } = await params; 
  return (
    <div>
      <Main device_id={deviceId} />
    </div>
  );
}

