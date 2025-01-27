'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
    href: string;
    label: string;
    isActive: boolean;
  };

export default function SideLink({ href, label }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`text-white duration-1000  text-xl h-full grid place-items-center  px-5 line-clamp-1 lg:w-auto w-[120px] overflow-hidden ${
        isActive ? ' text-yellow-200 font-semibold' : 'font-normal'
      }`}
    >
      {label}
    </Link>
  );
}