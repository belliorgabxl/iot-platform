'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
    href: string;
    label: string;
    isActive: boolean;
  };

export default function NavLink({ href, label }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`hover:bg-blue-600 duration-1000 text-sm px-2  lg:text-xl h-full grid place-items-center  lg:px-5 line-clamp-1 lg:w-auto w-[120px] overflow-hidden ${
        isActive ? ' text-yellow-200 font-semibold' : 'font-normal'
      }`}
    >
      {label}
    </Link>
  );
}