'use client';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pathToTitleMap } from '@/app/constants';
import Cookies from 'js-cookie';
import { Button } from '../button';
import Link from 'next/link';
import DropDown from './DropDown';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = Cookies.get('accessToken');
  const [title, setTitle] = useState(pathToTitleMap[pathname]);
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true); // 클라이언트에서만 동작하도록 설정
  // }, []);

  useEffect(() => {
    const newTitle = pathToTitleMap[pathname];
    setTitle(newTitle);
  }, [pathname]);
  return (
    <div
      className="flex w-full justify-between px-6 items-center h-headerHeight fixed top-0 z-20 bg-white shadow-md"
      suppressHydrationWarning={true}
    >
      {(pathname === '/home' || pathname === '/') && (
        <Image
          className="cursor-pointer"
          onClick={() => {
            if (accessToken && pathname !== '/') {
              router.replace('/home');
            }
            router.replace('/');
          }}
          width={106}
          height={32}
          src="/logo.svg"
          alt="뒤로가기"
        />
      )}
      {pathname !== '/home' && pathname !== '/' && (
        <Image
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
          width={6}
          height={12}
          src="/back.png"
          alt="뒤로가기"
        />
      )}
      {pathname !== '/home' && (
        <div className="font-bold text-xl absolute top-1/2 left-1/2 -trnaslate-x-1/2 -translate-y-1/2">
          {title}
        </div>
      )}
      {accessToken && <DropDown />}
      {!accessToken && (
        <Link href="/login" className="mr-2">
          <Button>로그인</Button>
        </Link>
      )}
    </div>
  );
}
