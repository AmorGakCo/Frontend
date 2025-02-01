'use client';
import Image from 'next/image';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pathToTitleMap } from '@/app/constants';
import Cookies from 'js-cookie';
import DropDown from './DropDown';
import useTitleStore from '@/hooks/useTitleStore';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = Cookies.get('accessToken');
  const [isClient, setIsClient] = useState(false);
  const title = useTitleStore((state) => state.title);
  const setTitle = useTitleStore((state) => state.setTitle);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 동작하도록 설정
  }, []);

  useEffect(() => {
    if (pathname !== 'home' && !pathname.includes('/group/detail')) {
      const newTitle = pathToTitleMap[pathname];
      setTitle(newTitle);
    }
  }, [pathname]);
  return (
    <>
    {isClient && (
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
      {pathname !== '/' && pathname !== '/home' && (
        <div className="font-bold text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {title}
        </div>
      )}
      {accessToken && <DropDown />}
      {/* {!accessToken && (
        <Link href="/login" className="mr-2">
          <Button>로그인</Button>
        </Link>
      )} */}
    </div>)}
    </>
  );
}
