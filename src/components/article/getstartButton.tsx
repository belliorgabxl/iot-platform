"use client";

import Link from "next/link";
type Props = {
  isLoading: boolean;
};

export default function GetstartButton({ isLoading }: Props) {
  return (
    <Link
      href="/devices"
      className={`mt-4  text-xl lg:text-3xl text-white    py-2 lg:py-3
        rounded-lg shadow-lg  shadow-gray-950 hover:scale-105 duration-500 ${
          isLoading == true
            ? "bg-gradient-to-r px-10 lg:px-32 from-gray-800  to-blue-600 "
            : "opacity-0"
        }`}
    >
      GetStart
    </Link>
  );
}
