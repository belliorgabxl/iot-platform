"use client";
import Link from "next/link";
// import dynamic from "next/dynamic";

// const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });

export default function Main() {
  return (
    <div className="py-5 h-full rounded-md bg-gray-700">
      <div className="w-full flex justify-center py-4">
        <div className="py-2 px-10 text-4xl font-bold text-white bg-gray-800 rounded-3xl">
          DashBoard
        </div>
      </div>

      <div className="grid px-10 gap-6">
        <div className="w-fit grid gap-2">
          <Link
            className="px-10 rounded-md w-fit hover:bg-blue-700 bg-blue-500 text-white py-1 text-lg"
            href="/dashboard/pm-detect"
          >
            PM-Detecter Dashboard
          </Link>

          <div className="w-full gap-4 grid lg:flex">
            <div className="px-10 grid gap-2 py-4 lg:w-[600px] text-white bg-gray-800 text-sm rounded-md">
              <li className="text-lg font-semibold">
                PM Detector Innovation for IoT Device Platforms
              </li>
              <p className="font-semibold">
                Understanding PM Detection Technology Particulate Matter (PM)
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;consists of microscopic particles suspended in the air, commonly categorized
                into PM1.0, PM2.5, and PM10 based on their size. These pollutants originate from various sources such as vehicle emissions, industrial activities, and natural phenomena like wildfires. Monitoring PM levels helps in assessing air quality, mitigating health risks, and formulating pollution control policies.
              </p>
              <li className="text-lg font-semibold">Applications of IoT-Enabled PM Detectors</li>
              <p>IoT-powered PM detectors find applications across various domains, including:</p>
            </div>
            <div className="w-full lg:w-[600px] h-fit rounded-md">
              {/* <Map /> */}
            </div>
          </div>
        </div>

        <div className="w-fit grid gap-2">
          <Link
            className="px-10 w-fit rounded-md  hover:bg-blue-700 bg-blue-500 text-white py-1 text-lg"
            href="/dashboard/fire-detect"
          >
            Fire-Detecter Dashboard
          </Link>
          <div className="w-full grid gap-4 lg:flex">
            <div className="px-10 grid gap-2 py-4 lg:w-[600px] text-white bg-gray-800 text-sm rounded-md">
              <li className="text-lg font-semibold">
                Fire Detector Innovation for IoT Device Platforms
              </li>
              <p className="font-semibold">
                Understanding Fire Detection Technology
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The integration of IoT technology in fire detection systems is transforming safety measures by providing real-time monitoring, early warning mechanisms, and automated response systems. Traditional fire detectors rely on smoke or heat detection, but IoT-enabled fire detection systems enhance accuracy, reduce false alarms, and enable remote monitoring. These advancements significantly improve fire safety across residential, commercial, and industrial settings.
              </p>
            </div>
            <div className="w-[400px] bg-white rounded-md">test</div>
          </div>
        </div>
      </div>
    </div>
  );
}