import React from "react";
import Form from "./Form";

interface Props {
  params: Promise<{ deviceId: string }>;
}

export default async function Page({ params }: Props) {
  const { deviceId } = await params;
  return (
    <div>
      <Form device_id={deviceId} />
    </div>
  );
}
