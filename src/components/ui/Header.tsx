'use client';


import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pathToTitleMap } from "@/app/constants";
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const [title,setTitle] = useState(pathToTitleMap[pathname]);
  useEffect(() => {
    const newTitle = pathToTitleMap[pathname];
    setTitle(newTitle)
  },[pathname]);
  return (
    <div className="flex w-full justify-between px-6 items-center h-headerHeight fixed top-0 z-20 bg-white shadow-md">
      {(pathname === '/home' || pathname === '/') && (
        <Image className="cursor-pointer" onClick={() => {router.replace('/home')}} width = {106} height = {32} src = '/logo.svg' alt = '뒤로가기'/>)}
      {(pathname !== '/home' && pathname !== '/') && (<Image className="cursor-pointer" onClick={() => {router.back()}} width = {6} height = {12} src = '/back.png' alt = '뒤로가기'/>)}
      {(pathname !== '/home')&&(<div className="font-bold text-xl absolute top-1/2 left-1/2 -trnaslate-x-1/2 -translate-y-1/2">{title}</div>)}
      <Avatar className="w-[32px] h-[32px]">
        <AvatarImage src="/coin.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}


