"use client";
import React, { useEffect, useState } from "react";
import GetstartButton from "./getstartButton";
import FadeInOnScroll from "../FadInScroll";

export default function Homepage_article() {
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <div className="px-5">
      <FadeInOnScroll>
        <div
          className={`grid  ${
            isLoading
              ? "bg-gray-900 hover:scale-[102%] duration-1000   rounded-md  mt-8 mb-5 py-10 px-4 lg:px-10 w-full lg:w-3/5"
              : "opacity-0 w-2/5"
          }`}
        >
          <div className="flex">
            <span className="text-3xl text-white">Our Service</span>
            <span className="mx-5">
              <img
                src="/general/service_icon.png"
                alt="service_icon"
                className="h-10"
              />
            </span>
          </div>
          <hr className="my-5" />
          <p className="text-white sm:text-sm">
            &nbsp;&nbsp;&nbsp;&nbsp;We provider Iot device and support Iot
            Control with log monitoring The Internet of Things(IoT) enables
            users to control various aspects of their lives remotely at any time
            and location. IoT devices make people interact more conveniently and
            efficiently with electronic equipment.
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="flex justify-end">
          <div
            className={`grid  ${
              isLoading
                ? "bg-gray-900 hover:scale-[102%] duration-1000  rounded-md  my-5 py-10 px-10 w-full lg:w-3/5"
                : "opacity-0 w-2/5"
            }`}
          >
            <div className="flex">
              <span className="text-3xl text-white">Objective</span>
              <span className="mx-5">
                <img src="/general/light_icon.png" className="h-10" />
              </span>
            </div>
            <hr className="my-5" />
            <p className="text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;Due to the rapid growth of IoT (Internet
              of Things) technology in today is era, which helps connect various
              devices to work together through the internet, developing
              applications that can control these devices is a key factor in
              increasing convenience and efficiency. This thesis aims to control
              and command IoT devices through a real-time web application, which
              is becoming more in demand, especially in systems that manage
              multiple devices. To meet the needs of users in an increasingly
              connected technology era, controlling multiple devices
              simultaneously through a web application will enhance efficiency,
              reduce the time spent managing each device, and enable seamless
              interaction among devices. Furthermore, controlling via a web
              application adds convenience, allowing users to command and
              control devices from anywhere with internet access, thus enabling
              efficient remote operation.
            </p>
          </div>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div
          className={`grid  ${
            isLoading
              ? "bg-gray-900 hover:scale-[102%] duration-1000  rounded-md  my-5 py-10 px-10 w-full lg:w-3/5"
              : "opacity-0 w-2/5"
          }`}
        >
          <div className="flex">
            <span className="text-3xl text-white">Basic of IoT devices</span>
            <span className="mx-5">
              <img src="/assets/iconweb_white.png" className="h-10" />
            </span>
          </div>
          <hr className="" />
          <p className="text-white">
            &nbsp;&nbsp;&nbsp;&nbsp;IoT devices are physical objects connected
            to the Internet that can collect and exchange data. These devices
            encompass many products, such as smart home devices (thermostats,
            TVs, light bulbs, speakers, etc.), wearable fitness trackers, and
            even connected cars. The critical feature of IoT devices lies in
            their seamless connectivity. By being connected to the Internet,
            these devices can be accessed and controlled remotely using
            smartphones, tablets, or computers.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp; To control IoT devices, users must have
            access to an Internet connection, whether for managing smart home
            devices, containing industrial equipment, or optimizing business
            processes. Because of this, a stable Internet connection is
            essential for managing IoT devices.
          </p>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className="flex justify-end">
          <div
            className={`grid  ${
              isLoading
                ? "bg-gray-900 hover:scale-[102%] duration-1000   rounded-md  my-5 py-10 px-10 w-full lg:w-3/5"
                : "opacity-0 w-2/5"
            }`}
          >
            <div className="flex">
              <span className="text-3xl text-white">Conclusion</span>
              <span className="mx-5">
                <img src="/general/search_icon.png" className="h-10" />
              </span>
            </div>
            <hr className="my-5" />
            <p className="text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;Controlling IoT devices has never been
              more accessible and versatile. With the advent of different
              methods and technologies, users can manage their IoT devices
              effortlessly from anywhere in the world. Some professional IoT
              device management platforms can help you to control and manage
              your devices more effectively.
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Multiple protocols make the remote control
              and management of IoT devices possible. But when controlling
              devices, its essential to consider security issues. How do you
              usually control and manage your IoT devices? Do you have your way
              to maximize their effectiveness? Please share this article with
              your friends, and tell us your ideas in the comments section
              below!
            </p>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
