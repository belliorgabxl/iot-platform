"use client";

type Props = {
  isLoading: boolean;
};

export default function ProductDetail({ isLoading }: Props) {
  return (
    <div className="grid w-full gap-4 ">
      <div
        className={`flex gap-1 ${
          isLoading
            ? "bg-gray-800 h-fit  hover:scale-[102%] duration-1000  text-white rounded-lg   "
            : "opacity-0"
        }`}
      >
        <img
          src="/effect/product_car.jpeg"
          alt="car"
          className="lg:w-[300px]  md:w-2/5 sm:w-[250px] w-2/5 rounded-l-lg object-cover "
        />
        <div className="lg:px-5 px-2 grid gap-2 py-2 w-full">
          <h1 className="text-2xl  bg-gray-900 h-fit px-2 lg:px-5  grid place-items-center py-1 rounded-md">
            Product : Car
          </h1>
          <p className="text-lg">Board : ESP32</p>
          <p>Connection Type : Wi-fi 2.4 GHz</p>
          <p className=" grid place-content-center rounded-md py-1 h-fit w-fit px-2 lg:px-10 bg-gray-500 text-white text-xl">
            Inventory : 4 pc.
          </p>
        </div>
      </div>

      <div
        className={`flex gap-1 ${
          isLoading
            ? "bg-gray-800 h-fit  hover:scale-[102%] duration-1000  text-white rounded-lg   "
            : "opacity-0"
        }`}
      >
        <img
          src="/effect/product_arm.jpeg"
          alt="arm"
          className="lg:w-1/3  md:w-2/5 sm:w-[250px] w-2/5 rounded-l-lg object-cover "
        />

        <div className="lg:px-5 px-2 grid gap-2 py-2 w-full">
          <div className="text-xl  bg-gray-900 h-fit px-2 lg:px-5 grid place-items-center py-1 overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1 rounded-md">
            Product : Robotic Arm
          </div>
          <p className=" text-lg">Board : ESP32</p>
          <p>Connection Type : Wi-fi 2.4 GHz</p>
          <p className=" grid place-content-center rounded-md py-1 w-fit px-2 lg:px-10 bg-gray-500 text-white text-xl">
            Inventory : 2 pc.
          </p>
        </div>
      </div>
      <div
        className={`flex h-fit gap-1 ${
          isLoading
            ? "bg-gray-800  hover:scale-[102%] duration-1000  text-white rounded-lg   "
            : "opacity-0"
        }`}
      >
        <img
          src="/effect/product_pump.jpg"
          width="full"
          height="full"
          alt="pump"
          className="lg:w-1/3  md:w-2/5 sm:w-[250px] w-2/5 rounded-l-lg object-cover "
        />

        <div className="lg:px-5 px-2 grid gap-2 py-2 w-full">
          <div className="text-xl  bg-gray-900 h-fit px-2 lg:px-5 grid place-items-center py-1 overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1 rounded-md">
            Product : Auto Pump
          </div>
          <p className=" text-lg">Board : ESP32</p>
          <p>Connection Type : Wi-fi 2.4 GHz</p>
          <p className=" grid place-content-center rounded-md py-1 w-fit px-2 lg:px-10 bg-gray-500 text-white text-xl">
            Inventory : 1 pc.
          </p>
        </div>
      </div>
    </div>
  );
}
